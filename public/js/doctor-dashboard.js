(function(){
  const token=sessionStorage.getItem('htd_token');
  if(!token){window.location.href='/doctor-login.html';return;}

  const reportAssets={
    ultrasound:'/assets/reports/ultrasound-report.png',
    ct:'/assets/reports/ct-abdomen-report.webp',
    mri:'/assets/reports/mri-report.webp',
    xray:'/assets/reports/xray-report.webp',
    lab:'/assets/reports/lab-report.webp'
  };
  const schemas={
    schedule:{title:'My Schedule',subtitle:"Today's appointments and consultations",fields:['time','patient','patientId','visitType','room','bloodGroup','status','notes'],columns:['Time','Patient','Patient ID','Visit Type','Room','Blood Group','Status','Notes']},
    tasks:{title:'Clinical Tasks',subtitle:'Pending tasks and follow-ups',fields:['task','patient','patientId','priority','dueDate','status','notes'],columns:['Task','Patient','Patient ID','Priority','Due Date','Status','Notes']},
    reports:{title:'Patient Reports',subtitle:'View, manage and upload patient reports',fields:['reportName','patient','patientId','bloodGroup','reportType','date','status','notes','document'],columns:['Report Name','Patient','Patient ID','Blood Group','Report Type','Date','Status','Notes']},
    labs:{title:'Laboratory Reports',subtitle:'Lab test results and documents',fields:['testName','patient','patientId','bloodGroup','sampleId','result','referenceRange','resultDate','status','document'],columns:['Test Name','Patient','Patient ID','Blood Group','Sample ID','Result','Reference Range','Result Date','Status']},
    appointments:{title:'Appointments',subtitle:'Upcoming and past appointments',fields:['dateTime','patient','patientId','bloodGroup','department','doctor','reason','status'],columns:['Date & Time','Patient','Patient ID','Blood Group','Department','Doctor','Reason','Status']},
    scans:{title:'Scan Reports',subtitle:'Imaging and scan reports',fields:['scanType','patient','patientId','bloodGroup','scanDate','bodyPart','radiologist','findings','impression','status','document'],columns:['Scan Type','Patient','Patient ID','Blood Group','Scan Date','Body Part','Radiologist','Status']},
    records:{title:'Medical Records',subtitle:'Diagnoses, history, allergies and treatment plans',fields:['patient','patientId','bloodGroup','diagnosis','allergies','medicalHistory','medications','lastUpdated','status'],columns:['Patient','Patient ID','Blood Group','Diagnosis','Allergies','Medical History','Last Updated','Status']},
    prescriptions:{title:'Prescriptions',subtitle:'Create and manage prescriptions',fields:['patient','patientId','bloodGroup','medicine','dosage','frequency','duration','instructions','date','status'],columns:['Patient','Patient ID','Blood Group','Medicine','Dosage','Frequency','Duration','Date','Status']},
    notes:{title:'Clinical Notes',subtitle:'Consultation notes and observations',fields:['patient','patientId','bloodGroup','visitDate','chiefComplaint','assessment','plan','status'],columns:['Patient','Patient ID','Blood Group','Visit Date','Chief Complaint','Assessment','Plan','Status']},
    referrals:{title:'Referrals',subtitle:'Specialist referrals and follow-up',fields:['patient','patientId','bloodGroup','referredTo','department','reason','date','priority','status'],columns:['Patient','Patient ID','Blood Group','Referred To','Department','Reason','Date','Priority','Status']}
  };
  const seed={
    schedule:[
      {time:'10:30 AM',patient:'Arun Kumar',patientId:'PT-10023',visitType:'Consultation',room:'G101',bloodGroup:'B- (Rare)',status:'Confirmed',notes:'Follow up on blood pressure'},
      {time:'11:15 AM',patient:'Priya Lakshmi',patientId:'PT-10024',visitType:'Follow-up',room:'G102',bloodGroup:'O+',status:'Waiting',notes:'Review thyroid profile'},
      {time:'12:00 PM',patient:'Saravanan',patientId:'PT-10025',visitType:'Diabetes Review',room:'G101',bloodGroup:'AB- (Rare)',status:'Confirmed',notes:'HbA1c review'}],
    tasks:[{task:'Review lab reports',patient:'Priya Lakshmi',patientId:'PT-10024',priority:'High',dueDate:'14 Jul 2026',status:'Pending',notes:'Review thyroid and lipid reports'}],
    reports:[{reportName:'Blood Test Report',patient:'Arun Kumar',patientId:'PT-10023',bloodGroup:'B- (Rare)',reportType:'Blood Test',date:'13 Jul 2026',status:'Ready',notes:'Mild anaemia; repeat CBC after four weeks.',document:reportAssets.lab}],
    labs:[{testName:'CBC',patient:'Arun Kumar',patientId:'PT-10023',bloodGroup:'B- (Rare)',sampleId:'SPL-2026-0001',result:'Hb 11.2 g/dL',referenceRange:'13–17 g/dL',resultDate:'13 Jul 2026',status:'Completed',document:reportAssets.lab}],
    appointments:[{dateTime:'14 Jul 2026, 10:30 AM',patient:'Arun Kumar',patientId:'PT-10023',bloodGroup:'B- (Rare)',department:'Internal Medicine',doctor:'Dr. Arjuna',reason:'Blood pressure follow-up',status:'Confirmed'}],
    scans:[
      {scanType:'CT Abdomen',patient:'Arun Kumar',patientId:'PT-10023',bloodGroup:'B- (Rare)',scanDate:'13 Jul 2026',bodyPart:'Abdomen',radiologist:'Dr. Payal Shah',findings:'No significant abnormality detected.',impression:'Normal CT abdomen.',status:'Completed',document:reportAssets.ct},
      {scanType:'Obstetric Ultrasound',patient:'Nivetha',patientId:'PT-10026',bloodGroup:'O-',scanDate:'12 Jul 2026',bodyPart:'Pelvis',radiologist:'Dr. Vimal Shah',findings:'Single live intrauterine fetus visualized.',impression:'Fetal growth corresponds with gestational age.',status:'Reviewed',document:reportAssets.ultrasound}],
    records:[{patient:'Arun Kumar',patientId:'PT-10023',bloodGroup:'B- (Rare)',diagnosis:'Hypertension',allergies:'Penicillin',medicalHistory:'Type 2 diabetes; hypertension',medications:'Metformin, Amlodipine',lastUpdated:'14 Jul 2026',status:'Active'}],
    prescriptions:[{patient:'Arun Kumar',patientId:'PT-10023',bloodGroup:'B- (Rare)',medicine:'Amlodipine',dosage:'5 mg',frequency:'Once daily',duration:'30 days',instructions:'Take after breakfast',date:'14 Jul 2026',status:'Active'}],
    notes:[{patient:'Arun Kumar',patientId:'PT-10023',bloodGroup:'B- (Rare)',visitDate:'14 Jul 2026',chiefComplaint:'Headache and elevated BP',assessment:'Stage 1 hypertension',plan:'Continue medication and reduce salt intake',status:'Signed'}],
    referrals:[{patient:'Saravanan',patientId:'PT-10025',bloodGroup:'AB- (Rare)',referredTo:'Dr. Priya Nair',department:'Endocrinology',reason:'Poor glycaemic control',date:'14 Jul 2026',priority:'High',status:'Pending'}]
  };
  const stored=localStorage.getItem('wecareClinicalDataV4');
  const state=stored?JSON.parse(stored):JSON.parse(JSON.stringify(seed));
  let activeSection='schedule',activeRecord=null,activeReport=null;
  const host=document.getElementById('sectionHost'),modal=document.getElementById('recordModal'),form=document.getElementById('recordForm'),fields=document.getElementById('modalFields'),toast=document.getElementById('toast');
  const reportViewer=document.getElementById('reportViewer'),reportImage=document.getElementById('reportImage');
  const esc=v=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const label=f=>f.replace(/([A-Z])/g,' $1').replace(/^./,c=>c.toUpperCase());
  const save=()=>localStorage.setItem('wecareClinicalDataV4',JSON.stringify(state));
  const showToast=m=>{toast.textContent=m;toast.classList.add('show');clearTimeout(showToast.t);showToast.t=setTimeout(()=>toast.classList.remove('show'),1800)};
  const statusClass=v=>'status status-'+String(v).toLowerCase().replace(/[^a-z]+/g,'-');
  function displayValue(field,value){if(field==='bloodGroup'&&/rare/i.test(value))return `<span class="rare">${esc(value)}</span>`;if(field==='status')return `<span class="${statusClass(value)}">${esc(value)}</span>`;return esc(value)}
  function render(section){
    activeSection=section;const s=schemas[section];
    document.getElementById('pageTitle').textContent=section==='schedule'?'Dashboard':s.title;
    document.getElementById('pageSubtitle').textContent=section==='schedule'?'Your schedule is shown by default. Select another section to open its records.':s.subtitle;
    document.querySelectorAll('.nav-link').forEach((b,i)=>b.classList.toggle('active',b.dataset.view===section&&(i!==0||section==='schedule')));
    const visibleFields=s.fields.filter(f=>f!=='document'&&!['findings','impression','instructions'].includes(f)).slice(0,s.columns.length);
    host.innerHTML=`<article class="panel"><div class="panel-heading"><div><p class="eyebrow">Clinical module</p><h3>${esc(s.title)}</h3><p>${esc(s.subtitle)}</p></div><div class="heading-actions"><button class="primary-action" data-add="${section}">+ Add</button><button class="secondary-action" data-export="${section}">Export</button></div></div><div class="table-wrap"><table><thead><tr>${s.columns.map(c=>`<th>${esc(c)}</th>`).join('')}<th>Actions</th></tr></thead><tbody>${state[section].map((row,i)=>`<tr>${visibleFields.map(f=>`<td>${displayValue(f,row[f])}</td>`).join('')}<td><div class="row-actions"><button class="row-action" data-open="${section}" data-index="${i}">View</button><button class="row-action" data-edit="${section}" data-index="${i}">Edit</button>${['reports','labs','scans','records','notes'].includes(section)?`<button class="row-action" data-upload="${section}" data-index="${i}">Upload</button>`:''}<button class="row-action danger" data-delete="${section}" data-index="${i}">Delete</button></div></td></tr>`).join('')||`<tr><td colspan="${s.columns.length+1}" class="empty-state">No records yet. Use Add to create one.</td></tr>`}</tbody></table></div></article>`;
  }
  function openForm(section,index,mode){
    const schema=schemas[section],row=index==null?Object.fromEntries(schema.fields.map(f=>[f,''])):state[section][index];activeRecord={section,index,mode};
    document.getElementById('modalTitle').textContent=(mode==='add'?'Add ':mode==='edit'?'Edit ':'View ')+schema.title.replace(/s$/,'');
    document.getElementById('modalEyebrow').textContent=mode==='view'?'Complete patient and clinical details':'Update clinical record';
    fields.innerHTML=schema.fields.filter(f=>f!=='document').map(f=>{const long=['notes','findings','impression','medicalHistory','medications','instructions','assessment','plan','reason'].includes(f);return `<div class="field ${long?'full':''}"><label>${label(f)}</label>${long?`<textarea name="${f}" ${mode==='view'?'disabled':''}>${esc(row[f])}</textarea>`:`<input name="${f}" value="${esc(row[f])}" ${mode==='view'?'disabled':''}>`}</div>`}).join('');
    document.getElementById('saveRecord').style.display=mode==='view'?'none':'inline-block';modal.classList.add('open');modal.setAttribute('aria-hidden','false');
  }
  function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}
  function viewReport(section,index){
    const row=state[section][index];activeReport={section,index};
    document.getElementById('reportViewerTitle').textContent=row.reportName||row.testName||row.scanType||'Medical Document';
    document.getElementById('reportMeta').innerHTML=[['Patient',row.patient],['Patient ID',row.patientId],['Blood Group',row.bloodGroup],['Status',row.status]].map(([k,v])=>`<div><strong>${k}</strong>${displayValue(k==='Blood Group'?'bloodGroup':'',v)}</div>`).join('');
    reportImage.src=row.document||reportAssets.lab;reportViewer.classList.add('open');reportViewer.setAttribute('aria-hidden','false');
  }
  function exportCsv(section){const s=schemas[section],rows=[s.fields.filter(f=>f!=='document').map(label),...state[section].map(r=>s.fields.filter(f=>f!=='document').map(f=>r[f]))];const csv=rows.map(r=>r.map(v=>'"'+String(v??'').replace(/"/g,'""')+'"').join(',')).join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download=`wecare-${section}.csv`;a.click();URL.revokeObjectURL(a.href);showToast('Export created')}
  document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.classList.contains('nav-link')&&b.dataset.view)render(b.dataset.view);if(b.dataset.add)openForm(b.dataset.add,null,'add');if(b.dataset.edit)openForm(b.dataset.edit,+b.dataset.index,'edit');if(b.dataset.open){const s=b.dataset.open,i=+b.dataset.index;if(['reports','labs','scans'].includes(s))viewReport(s,i);else openForm(s,i,'view')}if(b.dataset.upload){activeReport={section:b.dataset.upload,index:+b.dataset.index};document.getElementById('reportUpload').click()}if(b.dataset.export)exportCsv(b.dataset.export);if(b.dataset.delete&&confirm('Delete this record?')){state[b.dataset.delete].splice(+b.dataset.index,1);save();render(activeSection);showToast('Record deleted')}});
  form.addEventListener('submit',e=>{e.preventDefault();const s=schemas[activeRecord.section],data=Object.fromEntries(new FormData(form).entries());if(activeRecord.index==null)state[activeRecord.section].push({...data,document:''});else state[activeRecord.section][activeRecord.index]={...state[activeRecord.section][activeRecord.index],...data};save();closeModal();render(activeSection);showToast('Record saved')});
  document.getElementById('reportUpload').addEventListener('change',e=>{const file=e.target.files[0];if(!file||!activeReport)return;const reader=new FileReader();reader.onload=()=>{state[activeReport.section][activeReport.index].document=reader.result;save();reportImage.src=reader.result;showToast('Document uploaded')};reader.readAsDataURL(file)});
  document.getElementById('downloadReport').onclick=()=>{const a=document.createElement('a');a.href=reportImage.src;a.download='wecare-medical-report';a.click()};
  document.getElementById('printReport').onclick=()=>window.print();document.getElementById('printRecord').onclick=()=>window.print();
  document.getElementById('closeModal').onclick=closeModal;document.getElementById('cancelModal').onclick=closeModal;document.getElementById('closeReportViewer').onclick=()=>reportViewer.classList.remove('open');
  modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});reportViewer.addEventListener('click',e=>{if(e.target===reportViewer)reportViewer.classList.remove('open')});
  document.getElementById('logoutButton').onclick=()=>{sessionStorage.clear();window.location.href='/doctor-login.html'};
  document.getElementById('notificationButton').onclick=()=>showToast('3 clinical notifications');
  function clock(){const d=new Date();document.getElementById('currentDate').textContent=d.toLocaleDateString('en-IN',{weekday:'long',day:'2-digit',month:'long',year:'numeric'});document.getElementById('currentTime').textContent=d.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}clock();setInterval(clock,30000);
  fetch('/api/auth/me',{headers:{Authorization:'Bearer '+token}}).then(r=>r.ok?r.json():Promise.reject()).then(d=>{if(!d.success||d.user.role!=='doctor')throw Error();const n=(d.user.fullName||'Arjuna').replace(/^Dr\.\s*/i,'');document.getElementById('doctorGreeting').textContent='Hello, Dr. '+n;document.getElementById('doctorPosition').textContent=d.user.position||d.user.designation||'Senior Consultant Physician';document.getElementById('doctorDepartment').textContent=d.user.department||'Internal Medicine'}).catch(()=>{sessionStorage.clear();window.location.href='/doctor-login.html'});
  render('schedule');

  function formatIST(value){
    const d=value?new Date(value):new Date();
    return d.toLocaleString('en-IN',{timeZone:'Asia/Kolkata',day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit'});
  }
  function showSecurityPopup(event){
    const modal=document.getElementById('securityNoticeModal');
    if(!modal)return showToast(event.message||'New security notification');
    document.getElementById('securityNoticeKicker').textContent=event.risk?`${event.risk} security alert`:'Hospital notification';
    document.getElementById('securityNoticeTitle').textContent=event.title||'Security Notice';
    document.getElementById('securityNoticeMessage').textContent=event.message||event.response||'A new security event was received.';
    document.getElementById('securityNoticeMeta').textContent=`Received: ${formatIST(event.time)}${event.incidentId?` · Incident INC-${String(event.incidentId).padStart(5,'0')}`:''}`;
    modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
  }
  document.getElementById('securityNoticeClose')?.addEventListener('click',()=>{const m=document.getElementById('securityNoticeModal');m.classList.remove('open');m.setAttribute('aria-hidden','true')});
  document.getElementById('securityNoticePrimary')?.addEventListener('click',()=>{const m=document.getElementById('securityNoticeModal');m.classList.remove('open');m.setAttribute('aria-hidden','true')});
  try{
    const currentUser=JSON.parse(sessionStorage.getItem('htd_user')||'{}');
    const socket=io({auth:{userId:currentUser.id}});
    socket.on('communication:new-message',msg=>{
      const forDoctor=msg.recipient_role==='doctor'||msg.recipient_role==='all'||Number(msg.recipient_user_id)===Number(currentUser.id)||Number(msg.recipient_doctor_id)===Number(currentUser.doctorId);
      if(forDoctor)showSecurityPopup({title:msg.subject,message:msg.body,risk:msg.priority,time:msg.created_at||new Date().toISOString(),incidentId:msg.incident_id});
    });
    socket.on('doctor:security-popup',showSecurityPopup);
    socket.on('security:insider-contained',event=>showSecurityPopup({title:'Security action',message:event.response,risk:event.risk,time:event.time,incidentId:event.incidentId}));
  }catch(_e){}
})();
