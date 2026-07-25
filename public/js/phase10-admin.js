(()=>{
  const token=sessionStorage.getItem('htd_token');
  if(!token)return;
  const headers={'Content-Type':'application/json',Authorization:`Bearer ${token}`};
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmt=t=>t?new Date(/Z$|[+-]\d\d:\d\d$/.test(t)?t:t.replace(' ','T')+'Z').toLocaleString('en-IN',{timeZone:'Asia/Kolkata',dateStyle:'medium',timeStyle:'short'}):'--';
  const page=document.getElementById('page-soc');
  const nav=document.querySelector('[data-page="soc"]');
  let doctors=[];

  async function api(url,opt={}){const r=await fetch(url,{...opt,headers:{...headers,...(opt.headers||{})}});const d=await r.json();if(!r.ok)throw Error(d.message||'Request failed');return d}
  function badge(r){return `<span class="risk-text ${String(r||'low').toLowerCase()}">${esc(r||'Low')}</span>`}
  function renderTimeline(items){return items.map(x=>`<div class="soc-event"><div class="soc-dot ${String(x.risk_level||'low').toLowerCase()}"></div><div><strong>${esc(x.action_type)}</strong><p>${esc(x.full_name||x.username||x.doctor_id||'System')} · ${esc(x.reason||x.resource_type||'Security event')}</p><small>${fmt(x.created_at)}</small></div>${badge(x.risk_level)}</div>`).join('')||'<p>No security events yet.</p>'}

  async function load(){
    page.innerHTML='<div class="empty-module"><h2>Loading Security Center…</h2></div>';
    try{
      const [summary,base,preds,reports]=await Promise.all([
        api('/api/ml/soc-summary'),api('/api/ml/baselines'),api('/api/ml/predictions'),api('/api/admin/investigation-reports')
      ]);
      doctors=base.baselines||[];
      const s=summary.summary;
      page.innerHTML=`
      <div class="intro-row"><div><h2>Security Center</h2></div><div class="actions"><button class="button secondary" id="refreshSoc">Refresh</button><button class="button" id="presentationDemo">Start Insider Demo</button></div></div>
      <article class="panel insider-indicators"><div class="panel-heading"><div><h3>Insider Threat Indicators</h3></div></div>
<div class="indicator-grid">
<div><span class="green-tick">✓</span> Login at Unusual Time</div>
<div><span class="green-tick">✓</span> Concurrent Login Detection</div>
<div><span class="green-tick">✓</span> Unknown Device Login</div>
<div><span class="green-tick">✓</span> Excessive Patient Record Access</div>
<div><span class="green-tick">✓</span> Large Scan Report Download</div>
<div><span class="green-tick">✓</span> Bulk Export Attempt</div>
<div><span class="green-tick">✓</span> Possible External Device Transfer</div>
<div><span class="green-tick">✓</span> Cross-Department Access Monitoring</div>
</div></article>
      <div class="metric-grid"><article class="metric-card"><div class="metric-label">Doctors monitored</div><div class="metric-value">${s.doctors}</div><div class="metric-note">Individual behavior baselines</div></article><article class="metric-card"><div class="metric-label">Audit events</div><div class="metric-value">${Number(s.auditEvents).toLocaleString('en-IN')}</div><div class="metric-note">Evidence preserved</div></article><article class="metric-card"><div class="metric-label">High-risk predictions</div><div class="metric-value">${s.highRisk}</div><div class="metric-note">ML escalations</div></article><article class="metric-card"><div class="metric-label">Open incidents</div><div class="metric-value">${s.openIncidents}</div><div class="metric-note">Administrator review required</div></article><article class="metric-card"><div class="metric-label">Restricted accounts</div><div class="metric-value">${s.restricted}</div><div class="metric-note">Critical containment</div></article></div>
      <div class="dashboard-grid"><article class="panel span-2"><div class="panel-heading"><div><h3>Live threat timeline</h3><p>Latest audit and containment events in India Standard Time.</p></div></div><div class="soc-feed">${renderTimeline(s.events)}</div></article><article class="panel"><div class="panel-heading"><div><h3>Attack simulation</h3><p>Select a doctor and run a judge-ready scenario.</p></div></div><label class="field"><span>Doctor</span><select id="simDoctor" class="select">${doctors.map(d=>`<option value="${esc(d.doctor_id)}">${esc(d.doctor_name)} · ${esc(d.department)}</option>`).join('')}</select></label><div class="sim-grid"><button class="button secondary sim" data-scenario="normal">Normal activity</button><button class="button secondary sim" data-scenario="midnight">Midnight login</button><button class="button secondary sim" data-scenario="unknown-device">Unknown device</button><button class="button secondary sim" data-scenario="bulk-download">Bulk download</button><button class="button secondary sim" data-scenario="cross-department">Cross-department</button><button class="button sim" data-scenario="export-all">Export All</button></div><div id="simResult" class="sim-result"><p>Run a scenario to see the ML prediction, response, and generated report.</p></div></article></div>
      <article class="panel"><div class="panel-heading"><div><h3>Recent AI predictions</h3><p>Explainable Isolation Forest classifications.</p></div></div><div class="table-wrap"><table><thead><tr><th>Time</th><th>Doctor</th><th>Anomaly score</th><th>Confidence</th><th>Risk</th><th>Prediction</th><th>Reasons</th></tr></thead><tbody>${(preds.predictions||[]).slice(0,12).map(x=>`<tr><td>${fmt(x.created_at)}</td><td>${esc(x.doctor_id)}</td><td>${Number(x.anomaly_score||0).toFixed(3)}</td><td>${esc(x.confidence)}%</td><td>${badge(x.risk_level)}</td><td>${esc(x.prediction)}</td><td>${esc((()=>{try{return JSON.parse(x.reasons).join('; ')}catch{return x.reasons}})())}</td></tr>`).join('')||'<tr><td colspan="7">Train the model and run a simulation.</td></tr>'}</tbody></table></div></article>
      <article class="panel"><div class="panel-heading"><div><h3>Investigation reports</h3><p>Reports are automatically generated when a doctor appears suspicious.</p></div><button class="button secondary" data-page-jump="audit">Open full audit logs</button></div><div class="table-wrap"><table><thead><tr><th>Report</th><th>Doctor</th><th>Classification</th><th>Risk</th><th>Created</th><th>Action</th></tr></thead><tbody>${(reports.reports||[]).slice(0,12).map(r=>`<tr><td>RPT-${String(r.id).padStart(5,'0')}</td><td>${esc(r.full_name||r.doctor_id)}</td><td>${esc(r.classification)}</td><td>${esc(r.risk_score)}</td><td>${fmt(r.created_at)}</td><td><button class="text-button report-open" data-id="${r.id}">View report</button></td></tr>`).join('')||'<tr><td colspan="6">No investigation reports yet.</td></tr>'}</tbody></table></div></article>`;
      bind();
    }catch(e){page.innerHTML=`<div class="empty-module"><h2>Unable to load SOC</h2><p>${esc(e.message)}</p><button class="button" id="retrySoc">Retry</button></div>`;document.getElementById('retrySoc').onclick=load}
  }

  function bind(){
    document.getElementById('refreshSoc').onclick=load;
    document.getElementById('presentationDemo').onclick=()=>simulate('export-all');
    document.querySelectorAll('.sim').forEach(b=>b.onclick=()=>simulate(b.dataset.scenario));
    document.querySelector('[data-page-jump="audit"]')?.addEventListener('click',()=>document.querySelector('[data-page="audit"]')?.click());
    document.querySelectorAll('.report-open').forEach(b=>b.onclick=()=>openReport(b.dataset.id));
  }
  async function simulate(scenario){
    const doctorId=document.getElementById('simDoctor')?.value||doctors[0]?.doctor_id;
    const host=document.getElementById('simResult');host.innerHTML='<p>Running Isolation Forest prediction and response…</p>';
    try{const d=await api('/api/ml/simulate',{method:'POST',body:JSON.stringify({doctorId,scenario})});const r=d.result;host.innerHTML=`<h3>${esc(r.doctorName)}</h3><p>${badge(r.risk)} <strong>Anomaly ${Number(r.anomalyScore).toFixed(3)}</strong> · ${r.confidence}% confidence</p><ul>${r.reasons.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><p><strong>Response:</strong> ${esc(r.response.join(', '))}</p>${r.incidentId?`<p><strong>Incident:</strong> INC-${String(r.incidentId).padStart(5,'0')} · investigation report generated</p>`:''}`;setTimeout(load,2200)}catch(e){host.innerHTML=`<p>${esc(e.message)}</p>`}
  }
  async function openReport(id){
    try{const d=await api('/api/ml/investigation-report/'+id);const r=d.report;const evidence=(()=>{try{return JSON.parse(r.evidence||'{}')}catch{return {raw:r.evidence}}})();const w=window.open('','_blank');w.document.write(`<!doctype html><html><head><title>WeCare Investigation Report</title><style>body{font-family:Arial;margin:40px;color:#14213d}header{border-bottom:3px solid #174ea6;padding-bottom:18px}h1{margin:4px 0}.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:20px 0}.card{border:1px solid #ccd5e1;padding:14px;border-radius:8px}pre{white-space:pre-wrap;background:#f5f7fb;padding:16px}.critical{color:#b42318;font-weight:bold}@media print{button{display:none}}</style></head><body><header><small>WECARE MEDICAL CENTER · SECURITY OPERATIONS</small><h1>${esc(r.title)}</h1><p>Potential insider-threat investigation evidence</p></header><div class="grid"><div class="card"><strong>Incident</strong><br>INC-${String(r.incident_id).padStart(5,'0')}</div><div class="card"><strong>Doctor</strong><br>${esc(r.full_name||r.doctor_id)}</div><div class="card"><strong>Classification</strong><br>${esc(r.classification)}</div><div class="card"><strong>Risk score</strong><br><span class="critical">${esc(r.risk_score)}</span></div><div class="card"><strong>Generated</strong><br>${fmt(r.created_at)}</div><div class="card"><strong>Status</strong><br>Administrator investigation required</div></div><h2>Summary</h2><p>${esc(r.summary)}</p><h2>Preserved evidence</h2><pre>${esc(JSON.stringify(evidence,null,2))}</pre><p><em>This report identifies suspicious behavior; it does not determine criminal guilt. Final decisions belong to authorized security, HR, and legal personnel.</em></p><button onclick="print()">Print / Save PDF</button></body></html>`);w.document.close()}catch(e){alert(e.message)}
  }
  nav?.addEventListener('click',()=>setTimeout(load,30));
  try{const socket=io();socket.on('ml:prediction',()=>nav?.classList.add('has-alert'));socket.on('security:insider-contained',()=>{nav?.classList.add('has-alert');if(page.classList.contains('active'))load()})}catch(_){ }
})();
