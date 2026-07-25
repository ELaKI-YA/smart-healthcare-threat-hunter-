const express = require('express');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
const db = require('../database/database');

function run(sql, params=[]) { return new Promise((resolve,reject)=>db.run(sql,params,function(e){e?reject(e):resolve({id:this.lastID,changes:this.changes})})); }
function all(sql, params=[]) { return new Promise((resolve,reject)=>db.all(sql,params,(e,r)=>e?reject(e):resolve(r))); }
function get(sql, params=[]) { return new Promise((resolve,reject)=>db.get(sql,params,(e,r)=>e?reject(e):resolve(r))); }
function audit(user, action, resourceType, resourceId, reason, req, risk='Low', points=0) {
  return run(`INSERT INTO activity_logs (user_id,username,doctor_id,action_type,resource_type,resource_id,department,ip_address,device_info,risk_points,risk_level,reason) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
    [user.id,user.username,user.doctorId||null,action,resourceType,resourceId||null,user.department||null,req.ip,req.headers['user-agent']||'unknown',points,risk,reason||null]);
}

module.exports = function createCommunicationRoutes(io) {
  const router = express.Router();
  router.use(authenticateToken);

  router.get('/messages', async (req,res)=>{
    try {
      const rows = req.user.role === 'admin'
        ? await all(`SELECT * FROM messages ORDER BY id DESC LIMIT 300`)
        : await all(`SELECT * FROM messages WHERE recipient_user_id=? OR recipient_doctor_id=? OR recipient_role='doctor' OR recipient_role='all' ORDER BY id DESC LIMIT 150`, [req.user.id, req.user.doctorId]);
      res.json({success:true,messages:rows});
    } catch(e){ res.status(500).json({success:false,message:e.message}); }
  });

  router.post('/messages', async (req,res)=>{
    try {
      const { recipientUserId, recipientDoctorId, recipientRole, subject, body, category='Security Notice', priority='Normal', incidentId=null } = req.body;
      if(!subject || !body) return res.status(400).json({success:false,message:'subject and body are required'});
      if(req.user.role==='doctor' && recipientRole!=='admin') return res.status(403).json({success:false,message:'Doctors may send requests only to administrators'});
      const result=await run(`INSERT INTO messages (sender_user_id,sender_name,sender_role,recipient_user_id,recipient_doctor_id,recipient_role,subject,body,category,priority,incident_id) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
        [req.user.id,req.user.fullName,req.user.role,recipientUserId||null,recipientDoctorId||null,recipientRole||null,subject,body,category,priority,incidentId]);
      await audit(req.user,'MESSAGE_SENT','message',String(result.id),`${category}: ${subject}`,req);
      const message=await get('SELECT * FROM messages WHERE id=?',[result.id]);
      io.emit('communication:new-message',message);
      res.status(201).json({success:true,message});
    } catch(e){ res.status(500).json({success:false,message:e.message}); }
  });

  router.post('/messages/:id/read', async (req,res)=>{
    try {
      const row=await get('SELECT * FROM messages WHERE id=?',[req.params.id]);
      if(!row) return res.status(404).json({success:false,message:'Message not found'});
      if(req.user.role!=='admin' && !(row.recipient_user_id===req.user.id || row.recipient_doctor_id===req.user.doctorId || ['doctor','all'].includes(row.recipient_role))) return res.status(403).json({success:false,message:'Access denied'});
      await run(`UPDATE messages SET status='Read',read_at=datetime('now') WHERE id=?`,[req.params.id]);
      await audit(req.user,'MESSAGE_READ','message',req.params.id,row.subject,req);
      io.emit('communication:message-read',{id:Number(req.params.id),reader:req.user.fullName});
      res.json({success:true});
    } catch(e){ res.status(500).json({success:false,message:e.message}); }
  });

  router.post('/export-all', async (req,res)=>{
    try {
      if(req.user.role!=='doctor') return res.status(403).json({success:false,message:'Doctor account required'});
      const requestedCount=Number(req.body.requestedCount||12480);
      const reasons=['Bulk export of all patient records','Access volume far above personal baseline','Cross-department data request','Potential data exfiltration'];
      await audit(req.user,'EXPORT_ALL_ATTEMPT','patient_records','ALL',reasons.join('; '),req,'Critical',100);
      const incident=await run(`INSERT INTO security_incidents (user_id,username,total_risk_score,severity,status,summary) VALUES (?,?,?,?,?,?)`,[req.user.id,req.user.username,100,'Critical','open',`Suspected unauthorized bulk data export: ${requestedCount} records requested. Export blocked and security teams notified.`]);
      await run(`INSERT INTO investigation_reports (incident_id,user_id,doctor_id,title,classification,risk_score,summary,evidence) VALUES (?,?,?,?,?,?,?,?)`,[incident.id,req.user.id,req.user.doctorId,'Suspected Unauthorized Bulk Data Export Report','Potential Insider Threat',100,'The doctor attempted to export all patient records. No export file was delivered. The event was logged and both the doctor and administrator were notified immediately.',JSON.stringify({requestedCount,action:'EXPORT_ALL',result:'BLOCKED',reasons,ip:req.ip,device:req.headers['user-agent'],timestamp:new Date().toISOString()})]);
      io.to(`user:${req.user.id}`).emit('security:insider-contained',{incidentId:incident.id,doctorId:req.user.doctorId,doctor:req.user.fullName,action:'Export All',requestedCount,risk:'Critical',response:'Export blocked; security alert delivered',time:new Date().toISOString()});
      io.emit('doctor:security-popup',{incidentId:incident.id,doctorId:req.user.doctorId,doctor:req.user.fullName,title:'Bulk export blocked',message:`Your request to export ${requestedCount} records was blocked and logged. Your account remains active for the demonstration.`,risk:'Critical',time:new Date().toISOString()});
      io.emit('admin:critical-alert',{incidentId:incident.id,doctorId:req.user.doctorId,doctor:req.user.fullName,action:'Export All',requestedCount,risk:'Critical',time:new Date().toISOString()});
      res.status(403).json({success:false,terminated:false,incidentId:incident.id,message:'Export blocked. A live security notification was sent to you and the administrator. Your account remains active.',time:new Date().toISOString()});
    } catch(e){ res.status(500).json({success:false,message:e.message}); }
  });

  return router;
};
