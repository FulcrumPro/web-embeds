/* Archie Builder page: hero scripted build + customer date-change app. */
document.addEventListener("DOMContentLoaded",function(){
(function(){
  var ROWS=[["10", "4856", "In process", "Oct 24", "Oct 15", "ok", "Scheduled finish Oct 14"], ["20", "4857", "In process", "Oct 24", "Oct 15", "ok", "Scheduled finish Oct 14"], ["30", "4861", "Material due Oct 9", "Oct 28", "Oct 17", "ok", "Scheduled finish Oct 16"], ["50", "4870", "Outside: anodize", "Nov 4", "Oct 22", "no", "Back from anodize Oct 27"], ["60", "4871", "Outside: anodize", "Nov 4", "Oct 22", "no", "Back from anodize Oct 27"], ["70", "4880", "Not started", "Oct 31", "Nov 14", "ok", "Later than current due"], ["90", "4902", "Complete, awaiting ship", "Oct 21", "Oct 14", "ok", "Can ship now"]];
  var q=function(id){return document.getElementById(id);};
  var count=q('xfCount'), status=q('xfStatus'), accept=q('xfAccept'), reject=q('xfReject'), table=q('xfTable'), platform=q('xfPlatform'), log=q('xfLog');
  var zone=q('xfZone'), file=q('xfFile'), headMeta=q('xfHeadMeta');
  if(!table) return;
  function sleep(ms){return new Promise(function(r){setTimeout(r,ms);});}
  function rand(n){return Math.floor(Math.random()*n);}
  /* rows come from the file, so they land whole rather than being typed */
  function typeText(el,text){return new Promise(function(res){el.textContent=text;el.style.opacity='0';el.style.transition='opacity .25s';requestAnimationFrame(function(){el.style.opacity='1';});setTimeout(res,120);});}
  function line(txt,live){var ln=document.createElement('div');ln.className='ln '+(live?'live':'done');ln.innerHTML='<i></i><span>'+txt+'</span>';log.appendChild(ln);return ln;}
  var accepted=false, cycleId=0;
  function selectable(){return table.querySelectorAll('.xf-t:not(.hdr):not(.skip)').length;}
  function renderTable(){
    table.innerHTML='<div class="xf-t hdr"><span>Line · job</span><span>Current due</span><span></span><span>Requested</span><span>Job status</span><span></span></div>';
    return ROWS.map(function(r){
      var t=document.createElement('div'); t.className='xf-t in';
      t.innerHTML='<span>Line '+r[0]+' · Job '+r[1]+'<span class="ls">'+r[2]+'</span></span><span class="old">'+r[3]+'</span><span class="arrow">→</span><span class="new"></span><span class="rec"></span><span class="st"></span>';
      t.title='Click to include or exclude this line';
      t.addEventListener('click',function(){ if(accepted||accept.disabled) return; t.classList.toggle('skip'); var n=selectable(); accept.textContent='Update '+n+' due date'+(n===1?'':'s'); status.textContent=n+' of 7 selected. Accept to update the jobs.'; });
      table.appendChild(t); return t; });
  }
  async function applyChanges(trows, id){
    if(accepted||id!==cycleId) return; accepted=true;
    accept.classList.remove('pulse'); accept.disabled=true; accept.textContent='Updating…'; status.textContent='Writing due dates to Fulcrum…';
    var n=selectable(); var l=line('Updating '+n+' job due dates and adding a note to each',true);
    var applied=0; for(var i=0;i<trows.length;i++){ if(trows[i].classList.contains('skip')) continue; trows[i].classList.add('applied'); applied++; await sleep(170); }
    l.className='ln done';
    platform.classList.add('live');
    var plats=[].slice.call(platform.querySelectorAll('.xf-plat'));
    for(var k=0;k<plats.length;k++){ plats[k].classList.add('on'); await sleep(260); }
    accept.textContent=applied+' due date'+(applied===1?'':'s')+' updated'; accept.classList.add('done'); status.textContent='Done. '+applied+' jobs updated, with a note on each.'; status.classList.add('ok');
    line(applied+' jobs updated. Lines 50 and 60 left as they were, for a call with Acme.',false);
  }
  async function cycle(){
    var id=++cycleId; accepted=false;
    log.innerHTML=''; count.textContent='0 of 7 read'; status.textContent='Drop the customer’s file to start. Nothing changes until you accept.'; status.classList.remove('ok');
    if(headMeta) headMeta.textContent='Sales order 48812 · 7 lines';
    accept.disabled=true; accept.classList.remove('pulse','done'); accept.textContent='Update due dates';
    platform.classList.remove('live'); [].forEach.call(platform.querySelectorAll('.xf-plat'),function(p){p.classList.remove('on');});
    if(file){ file.classList.remove('in','read'); } if(zone){ zone.classList.remove('hot'); zone.textContent='Drop the customer’s spreadsheet here'; }
    var trows=renderTable();
    /* the CSR drags the customer's spreadsheet onto the page */
    await sleep(1000); if(id!==cycleId) return;
    if(zone) zone.classList.add('hot'); await sleep(650); if(id!==cycleId) return;
    if(file) file.classList.add('in'); await sleep(450); if(id!==cycleId) return;
    if(zone) zone.classList.remove('hot');
    var l0=line('Reading acme-requested-dates.xlsx: 7 rows, requested dates in column C',true); await sleep(1000); l0.className='ln done'; if(file) file.classList.add('read');
    if(id!==cycleId) return;
    var l1=line('Matching each row to sales order 48812 and its jobs',true); if(headMeta) headMeta.textContent='Sales order 48812 · 7 lines · from acme-requested-dates.xlsx'; await sleep(800); l1.className='ln done';
    var l2=line('Comparing each requested date with the job’s scheduled finish',true);
    for(var i=0;i<trows.length;i++){ if(id!==cycleId) return; var r=ROWS[i]; await typeText(trows[i].querySelector('.new'), r[4]); var rec=trows[i].querySelector('.rec'); rec.className='rec '+r[5]; rec.innerHTML=(r[5]==='ok'?'On track':'Needs a call')+'<small>· '+r[6]+'</small>'; if(r[5]==='no') trows[i].classList.add('skip'); count.textContent=(i+1)+' of 7 read'; await sleep(220); }
    l2.className='ln done';
    line('5 lines are on track. Lines 50 and 60 are at anodize until Oct 27, so they stay unchecked.',false);
    status.textContent='5 of 7 selected. Accept to update the jobs.'; accept.disabled=false; accept.classList.add('pulse'); accept.textContent='Update 5 due dates';
    var t=0; while(t<4200 && !accepted && id===cycleId){ await sleep(100); t+=100; }
    if(id!==cycleId) return;
    if(!accepted) await applyChanges(trows,id);
    await sleep(5600); if(id!==cycleId) return;
    cycle();
  }
  accept.addEventListener('click',function(){ if(!accept.disabled){ var tr=[].slice.call(table.querySelectorAll('.xf-t:not(.hdr)')); applyChanges(tr,cycleId); } });
  reject.addEventListener('click',function(){ if(accepted) return; cycleId++; accepted=true; status.textContent='Cleared. No jobs were changed.'; accept.disabled=true; accept.classList.remove('pulse'); line('Cleared. Nothing was written to Fulcrum.',false); setTimeout(cycle,2600); });
  (function(){ var el=document.getElementById('xf'); if(el&&'IntersectionObserver' in window){ var io=new IntersectionObserver(function(es){ if(es.some(function(e){ return e.isIntersecting; })){ io.disconnect(); cycle(); } },{threshold:.25}); io.observe(el); } else cycle(); })();
})();
(function(){
  var STATES=[
    {w:'sales', page:'Quote hit rate', prompt:'Build a quote hit-rate board by customer for the last 12 months, with a drill-in to the quotes we lost.',
     log:['Reading quotes and sales orders from your Fulcrum','Grouping 1,284 quotes by customer and outcome','Laying out the board with a drill-in per customer'],
     app:{title:'Quote hit rate by customer', sub:'Last 12 months · live', mini:[['Quoted','1,284'],['Won','612'],['Hit rate','48%'],['Lost value','$2.1M']], rows:[['Crestline Aero','68%',68],['Harbor Dynamics','54%',54],['Summit Fabrication','47%',47],['Northfield Machine','41%',41]], chip:'won / quoted', foot:'Open lost quotes'}},
    {w:'engineering', page:'Setup sheets', prompt:'Give me a setup-sheet library: pick a job, show the routing, and the setup notes and offsets for each op.',
     log:['Reading routings, operations and attachments','Matching setup notes and offsets to each op','Building the job picker and sheet view'],
     app:{title:'Setup sheets', sub:'Job 4912 · 12345678-BRKT', mini:[['Ops','5'],['Fixtures','3'],['Photos','7'],['Last edit','today']], rows:[['Op 10  Saw cut, 1.25 bar','2 photos · notes',0],['Op 20  Mill, fixture F-114','3 photos · offsets',0],['Op 30  Deburr','notes',0],['Op 40  Anodize (outside)','vendor spec',0]], vk:'text', foot:'Print traveler'}},
    {w:'purchasing', page:'Open POs', prompt:'Show open purchase orders by vendor, flag anything past its promise date, and let me flag it for the buyer from the row.',
     log:['Reading open purchase orders and promise dates','Flagging 6 lines past promise','Adding a flag-and-note action to each row'],
     app:{title:'Open POs, late by vendor', sub:'22 open · 6 late', mini:[['Open POs','22'],['Late','6'],['Due this week','9'],['Open $','$184K']], rows:[['Midwest Steel Supply  PO 7781','Promised Oct 9 · 4 days late',0],['Allied Fasteners  PO 7790','Promised Oct 7 · 2 days late',0],['Lakeshore Metals  PO 7765','Promised Oct 8 · 1 day late',0],['Prairie Tool Supply  PO 7802','Due Fri',0]], vk:'late', foot:'Flag late POs'}},
    {w:'quality', page:'Job inspection plan', prompt:'Build us a job inspection plan our QC team fills out. Type in a job number, pull the part details, draft the inspection plan, and print it.',
     log:['Reading the job, part and drawing details','Drafting characteristics from the routing and specs','Adding measure fields and a print layout'],
     app:{title:'Job inspection plan', sub:'Job 4856 · 12345678-BRKT', mini:[['Characteristics','5'],['Measured','0 / 5'],['Inspector','—'],['Status','Draft']], rows:[['Dimension 1.250 ±.005','—',0],['Thread 1/4-20 UNC','—',0],['Surface finish 63','—',0],['Hole Ø.375 ±.002','—',0]], vk:'field', foot:'Print / PDF'}},
    {w:'production', page:'Behind schedule', prompt:"Show me every job behind schedule, grouped by department, with the operation it is sitting on, and a reason for why it’s late. Suggest an action to take to fix it.",
     log:['Reading jobs, operations and due dates','Found 14 jobs behind, across 3 departments','Adding a move-to-next-op button on each row'],
     app:{title:'Behind schedule by department', sub:'14 jobs · 3 departments', mini:[['Behind','14'],['Mill','7'],['Weld','5'],['Finish','2']], rows:[['Mill  Job 4820  Op 20 · waiting on material','Due Oct 14 · 3 days late',0],['Mill  Job 4833  Op 30 · machine down','Due Oct 15 · 2 days late',0],['Weld  Job 4790  Op 10 · waiting on inspection','Due Oct 15 · 2 days late',0],['Finish  Job 4802  Op 40 · outside service','Due Oct 13 · 1 day late',0]], vk:'late', foot:'Set new due dates'}},
    {w:'everyone', page:'Shop scoreboard', prompt:'Make a shop scoreboard for the TV on the floor: jobs shipped today, on-time this week, and who is clocked in where.',
     log:['Reading shipments, time clock and job status','Calculating on-time for the week','Laying out big numbers for a TV'],
     app:{title:'Shop scoreboard', sub:'Live · on live Fulcrum data', mini:[['Shipped today','11'],['On time','94%'],['Open jobs','128'],['Clocked in','23']], rows:[['Mill 3  Job 4820  Op 20','T. Alvarez',0],['Laser 1  Job 4871  Op 10','R. Chen',0],['Weld A  Job 4790  Op 30','M. Dubois',0],['Finish  Job 4802  Op 40','J. Okafor',0]], vk:'live', foot:'Full screen'}}
  ];
  /* What happens after the app is built and its button is pressed: rows update, tiles change, and the places the result lands. */
  var AFTER=[
    {rows:[[0,'3 lost · price'],[1,'5 lost · lead time'],[2,'4 lost · no response'],[3,'6 lost · lead time']], sum:'18 lost quotes listed. Top reason: lead time.', done:'Lost quotes open', log:'Opened the 18 lost quotes with the reason logged on each one.'},
    {rows:[[0,'page 1'],[1,'page 2'],[2,'page 3'],[3,'vendor spec attached']], sum:'Traveler ready to print: 4 pages, photos included.', done:'Ready to print', log:'Traveler for job 4912 is ready to print: 4 pages with the setup photos.'},
    {rows:[[0,'Flagged · note added'],[1,'Flagged · note added'],[2,'Flagged · note added']], sum:'3 late POs flagged, with a note on each for the buyer.', done:'Late POs flagged', log:'Flagged the 3 late purchase orders in Fulcrum and added a note to each for the buyer.'},
    {rows:[[0,'1.2512'],[1,'pass'],[2,'58 Ra'],[3,'.3774','warn']], mini:[[1,'5 / 5'],[2,'R. Chen'],[3,'1 flagged']], sum:'NCR opened for hole Ø.375. Plan attached to job 4856.', done:'NCR opened, ready to print', log:'Opened an NCR for the hole size, attached the plan to job 4856, and laid out the print view.'},
    {rows:[[0,'Oct 14 → Oct 17'],[1,'Oct 15 → Oct 17'],[2,'Oct 15 → Oct 16'],[3,'Oct 13 → Oct 15']], mini:[[0,'10'],[1,'5'],[2,'4'],[3,'1']], sum:'4 due dates written to Fulcrum and each job moved to its next operation. 3 customers flagged for a call.', done:'Due dates set', log:'Wrote 4 new due dates to Fulcrum and moved each job to its next operation. The 3 affected customers are flagged for a call.'},
    {mini:[[0,'12'],[3,'24']], rows:[[1,'R. Chen · Op 10 done'],[0,'T. Alvarez']], sum:'Live on the floor TV.', done:'Full screen', log:'Live on the floor TV, on live Fulcrum data.'}
  ];
  function rightFor(s,r){ if(r[2]) return '<div class="bar" aria-hidden="true"><i style="width:'+r[2]+'%"></i></div>'; var k=s.app.vk||'text'; if(k==='late'&&!/late/.test(r[1])) k='text'; return '<span class="val k-'+k+'">'+r[1]+'</span>'; }
  var TYPE_MS=65, DELETE_MS=38, JITTER=45, GAP_MS=350;
  var out=document.getElementById('cycle'), caret=document.getElementById('caret');
  if(!out||!document.getElementById('guided')) return;
  var st=document.getElementById('appStatic'); if(st) st.parentNode.removeChild(st);
  document.getElementById('chips').innerHTML=''; document.getElementById('stepsLog').innerHTML=''; document.getElementById('stepsLog').hidden=true; document.getElementById('chatHint').hidden=false; document.getElementById('emptyState').classList.remove('hide'); document.getElementById('promptBox').value='';
  var noop={classList:{add:function(){},remove:function(){}},addEventListener:function(){},hidden:false};
  var promptBox=document.getElementById('promptBox'), sendBtn=document.getElementById('sendBtn')||noop, nudge=document.getElementById('nudge')||noop;
  var pageName=document.getElementById('pageName'), canvas=document.getElementById('canvas'), emptyState=document.getElementById('emptyState'), working=document.getElementById('working'), workingPill=document.getElementById('workingPill');
  var stepsLog=document.getElementById('stepsLog'), chatHint=document.getElementById('chatHint'), chips=document.getElementById('chips')||document.createElement('div'), demoNote=document.getElementById('demoNote')||{};
  var pause=document.getElementById('pause')||{checked:false};
  var manual=false, busy=false, showing=-1, wi=4;
  function rand(n){return Math.floor(Math.random()*n);}
  STATES.forEach(function(s,i){
    var d=document.createElement('div'); d.className='app'; d.id='app'+i;
    var mini=s.app.mini.map(function(m){return '<div><small>'+m[0]+'</small><b>'+m[1]+'</b></div>';}).join('');
    var rows=s.app.rows.map(function(r){
      var left = r[2] ? r[0]+' &nbsp;<span class="num">'+r[1]+'</span>' : r[0];
      return '<div class="row"><div>'+left+'</div>'+rightFor(s,r)+'</div>';
    }).join('');
    d.innerHTML='<div class="app-bar">'+s.app.title+'<small>'+s.app.sub+'</small></div><div class="mini">'+mini+'</div>'+rows+'<div class="done-bar" hidden><i></i><span></span></div><div class="app-foot"><span class="btn" role="button" tabindex="0">'+s.app.foot+'</span></div>';
    canvas.appendChild(d);
    var c=document.createElement('button'); c.className='chip-btn'; c.type='button'; c.textContent=s.w;
    c.addEventListener('click',function(){ manual=true; demoNote.textContent='Scripted demo.'; runFor(i,true); });
    chips.appendChild(c);
  });
  function markChip(i){ [].forEach.call(chips.children,function(c,k){ c.classList.toggle('on',k===i); }); }
  function showApp(i){ var prev=document.getElementById('app'+showing); if(prev) prev.classList.remove('show'); var cur=document.getElementById('app'+i); if(cur) cur.classList.add('show'); showing=i; pageName.textContent=STATES[i].page; }
  function hideApp(){ var prev=document.getElementById('app'+showing); if(prev) prev.classList.remove('show'); showing=-1; }
  function setWord(i){ return new Promise(function(res){ var cur=out.textContent, target=STATES[i].w;
    function del(){ if(cur.length){ cur=cur.slice(0,-1); out.textContent=cur; setTimeout(del, DELETE_MS+rand(18)); } else { caret.classList.add('blink'); setTimeout(function(){ caret.classList.remove('blink'); typ(); }, GAP_MS); } }
    function typ(){ if(cur.length<target.length){ cur=target.slice(0,cur.length+1); out.textContent=cur; setTimeout(typ, TYPE_MS+rand(JITTER)); } else { caret.classList.add('blink'); res(); } }
    if(cur===target){ caret.classList.add('blink'); res(); } else del(); }); }
  function typeInto(el,text){ return new Promise(function(res){ var k=0; el.value=''; (function t(){ if(k<text.length){ k++; el.value=text.slice(0,k); el.scrollTop=el.scrollHeight; setTimeout(t, 6+rand(10)); } else res(); })(); }); }
  function sleep(ms){ return new Promise(function(r){ setTimeout(r,ms); }); }
  function logLines(lines){ stepsLog.innerHTML=''; stepsLog.hidden=false; chatHint.hidden=true;
    return lines.reduce(function(p,txt){ return p.then(function(){ var ln=document.createElement('div'); ln.className='ln live'; ln.innerHTML='<i></i><span>'+txt+'</span>'; stepsLog.appendChild(ln); return sleep(650+rand(350)).then(function(){ ln.classList.remove('live'); ln.classList.add('done'); }); }); }, Promise.resolve()); }
  async function build(i){
    busy=true; sendBtn.classList.remove('pulse'); nudge.classList.remove('show');
    hideApp(); emptyState.classList.add('hide'); working.hidden=false; workingPill.textContent='Working…'; pageName.textContent='Pending commit…';
    await logLines(STATES[i].log);
    working.hidden=true; showApp(i); busy=false;
    var done=document.createElement('div'); done.className='ln done'; done.innerHTML='<i></i><span>Done. Saved as <b>'+STATES[i].page+'</b>. Ask for a change, or publish it to your menu.</span>'; stepsLog.appendChild(done);
  }
  function clickOrWait(el,ms){ return new Promise(function(res){ var done=false; function go(){ if(done) return; done=true; el.removeEventListener('click',go); res(); } el.addEventListener('click',go); setTimeout(go,ms); }); }
  async function act(i){
    var A=AFTER[i], app=document.getElementById('app'+i); if(!A||!app) return;
    var btn=app.querySelector('.app-foot .btn'), rows=app.querySelectorAll('.row'), minis=app.querySelectorAll('.mini b'), bar=app.querySelector('.done-bar');
    await sleep(1100); if(showing!==i) return;
    btn.classList.add('pulse'); await clickOrWait(btn,1700); if(showing!==i) return;
    btn.classList.remove('pulse'); btn.textContent='Working…';
    for(var k=0;k<A.rows.length;k++){ var r=rows[A.rows[k][0]]; if(!r) continue; var v=r.querySelector('.val'); if(!v){ v=document.createElement('span'); v.className='val'; r.lastElementChild.replaceWith(v); } v.textContent=A.rows[k][1]; v.className='val '+(A.rows[k][2]||'ok'); await sleep(380); if(showing!==i) return; }
    if(A.mini){ A.mini.forEach(function(m){ var b=minis[m[0]]; if(b){ b.textContent=m[1]; b.classList.add('flash'); } }); }
    if(A.sum&&bar){ bar.querySelector('span').textContent=A.sum; bar.hidden=false; void bar.offsetWidth; bar.classList.add('on'); await sleep(500); if(showing!==i) return; }
    btn.textContent=A.done; btn.classList.add('done');
    var ln=document.createElement('div'); ln.className='ln done'; ln.innerHTML='<i></i><span>'+A.log+'</span>'; stepsLog.appendChild(ln);
  }
  function resetApp(i){ var app=document.getElementById('app'+i); if(!app) return; var s=STATES[i];
    var btn=app.querySelector('.app-foot .btn'); btn.className='btn'; btn.textContent=s.app.foot;
    var bar=app.querySelector('.done-bar'); bar.hidden=true; bar.classList.remove('on');
    app.querySelectorAll('.mini b').forEach(function(b,k){ b.textContent=s.app.mini[k][1]; b.classList.remove('flash'); });
    app.querySelectorAll('.row').forEach(function(r,k){ var row=s.app.rows[k]; var t=document.createElement('template'); t.innerHTML=rightFor(s,row); r.lastElementChild.replaceWith(t.content.firstChild); });
  }
  async function runFor(i, fromUser){
    resetApp(i);
    if(busy) return; markChip(i); wi=i;
    if(!fromUser){ await setWord(i); } else { out.textContent=STATES[i].w; caret.classList.add('blink'); }
    await typeInto(promptBox, STATES[i].prompt);
    sendBtn.classList.add('pulse'); nudge.classList.add('show');
    if(fromUser){ promptBox.focus(); return; }
    await sleep(1400); if(manual) return;
    await build(i);
  }
  function userSend(){ if(busy) return; manual=true; demoNote.textContent='Scripted demo. Builder cycles through one build per team; the real Builder runs inside Fulcrum.'; build(wi).then(function(){ return act(wi); }).then(function(){ return sleep(3000); }).then(function(){ manual=false; }); }
  sendBtn.addEventListener('click', userSend);
  promptBox.addEventListener('keydown', function(e){ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); userSend(); } });
  
  function inView(el){ return new Promise(function(res){ if(!el||!('IntersectionObserver' in window)){ res(); return; } var io=new IntersectionObserver(function(es){ if(es.some(function(e){ return e.isIntersecting; })){ io.disconnect(); res(); } },{threshold:.25}); io.observe(el); }); }
  (async function loop(){
    out.textContent=STATES[wi].w; markChip(wi);
    await inView(document.getElementById('guided'));
    while(true){
      if(pause.checked || manual){ await sleep(400); continue; }
      await runFor(wi,false);
      if(!manual) await act(wi);
      var t=0; while(t<3200 && !manual){ await sleep(100); t+=100; }
      if(manual) continue;
      wi=(wi+1)%STATES.length;
    }
  })();
  var items=[].slice.call(document.querySelectorAll('#stepper li')), si=0, smanual=false;
  function setStep(i){ items.forEach(function(li,k){ li.classList.toggle('active',k===i); }); si=i; }
  items.forEach(function(li,i){ li.addEventListener('click',function(){ smanual=true; setStep(i); }); });
  setInterval(function(){ if(!smanual && !pause.checked) setStep((si+1)%items.length); },4000);
})();
});
