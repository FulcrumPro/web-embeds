/* Archie Builder page: hero guided build + customer-email date-change build. Generated from the prototype. */
document.addEventListener("DOMContentLoaded",function(){
(function(){
  // line, job, status, prior due, new due, recommendation, note
  var ROWS=[
    ['10','4856','In process','Oct 24','Oct 15','ok','Op 30 of 50 done, finish by Oct 14'],
    ['20','4857','In process','Oct 24','Oct 15','ok','Runs with line 10'],
    ['30','4861','Material due Oct 9','Oct 28','Oct 17','ok','Material lands in time'],
    ['40','4862','Not started','Oct 28','Oct 17','ok','Mill capacity open Oct 10 to 14'],
    ['50','4870','Outside: anodize','Nov 4','Oct 22','no','Vendor returns Oct 27 at best'],
    ['60','4871','Outside: anodize','Nov 4','Oct 22','no','Same anodize lot as line 50'],
    ['70','4880','Not started','Oct 31','Nov 14','ok','Pushes out, frees Mill 2'],
    ['80','4890','Not started','Nov 7','Nov 21','ok','Pushes out'],
    ['90','4902','Complete, awaiting ship','Oct 21','Oct 14','ok','Can ship tomorrow']];
  var MAIL=[
    'Hi team, our customer moved their line, so we need to pull in most of PO 48812 and push two lines out. Can you confirm?',
    '<b>Lines 10 and 20</b> (A-4471): Oct 24 to <b>Oct 15</b>',
    '<b>Lines 30 and 40</b> (B-1180): Oct 28 to <b>Oct 17</b>',
    '<b>Lines 50 and 60</b> (C-2209): Nov 4 to <b>Oct 22</b>',
    '<b>Line 70</b> (D-3310): Oct 31 to <b>Nov 14</b>, <b>line 80</b> (E-5002): Nov 7 to <b>Nov 21</b>',
    '<b>Line 90</b> (F-6601): Oct 21 to <b>Oct 14</b> if at all possible.',
    'Thanks, Dana'];
  var MAP=[1,1,2,2,3,3,4,4,5]; // row index -> mail line index
  var q=function(id){return document.getElementById(id);};
  var file=q('xfFile'), zone=q('xfZone'), sheet=q('xfSheet'), rows=q('xfRows'), prompt=q('xfPrompt'), log=q('xfLog'), count=q('xfCount'), status=q('xfStatus'), accept=q('xfAccept'), reject=q('xfReject'), table=q('xfTable'), platform=q('xfPlatform');
  if(!file) return;
  rows.innerHTML=MAIL.map(function(m){return '<span class="ml">'+m+'</span>';}).join('');
  var rowEls=[].slice.call(rows.children);
  function sleep(ms){return new Promise(function(r){setTimeout(r,ms);});}
  function rand(n){return Math.floor(Math.random()*n);}
  function typeInto(el,text){return new Promise(function(res){var k=0;el.textContent='';(function t(){if(k<text.length){k++;el.textContent=text.slice(0,k);setTimeout(t,14+rand(10));}else res();})();});}
  function line(txt,live){var ln=document.createElement('div');ln.className='ln '+(live?'live':'done');ln.innerHTML='<i></i><span>'+txt+'</span>';log.appendChild(ln);return ln;}
  var accepted=false, cycleId=0;
  function selectable(){return table.querySelectorAll('.xf-t:not(.hdr):not(.skip)').length;}
  function renderTable(){
    table.innerHTML='<div class="xf-t hdr"><span>Line · job</span><span>Prior due</span><span></span><span>New due</span><span>Recommendation</span><span></span></div>';
    return ROWS.map(function(r){
      var t=document.createElement('div'); t.className='xf-t'+(r[5]==='no'?' skip':'');
      t.innerHTML='<span>Line '+r[0]+' · Job '+r[1]+'<span class="ls">'+r[2]+'</span></span><span class="old">'+r[3]+'</span><span class="arrow">→</span><span class="new">'+r[4]+'</span><span class="rec '+r[5]+'">'+(r[5]==='ok'?'Possible':'Not possible')+'<small>· '+r[6]+'</small></span><span class="st"></span>';
      t.title='Click to include or exclude this line';
      t.addEventListener('click',function(){ if(accepted||accept.disabled) return; t.classList.toggle('skip'); var n=selectable(); accept.textContent='Accept '+n+' change'+(n===1?'':'s'); status.textContent=n+' of 9 selected. Accept to update the jobs.'; });
      table.appendChild(t); return t; });
  }
  async function applyChanges(trows, id){
    if(accepted||id!==cycleId) return; accepted=true;
    accept.classList.remove('pulse'); accept.disabled=true; accept.textContent='Updating…'; status.textContent='Writing due dates to Fulcrum…';
    var n=selectable(); var l=line('Updating '+n+' due dates across Fulcrum',true);
    var applied=0; for(var i=0;i<trows.length;i++){ if(trows[i].classList.contains('skip')) continue; trows[i].classList.add('applied'); applied++; await sleep(170); }
    l.className='ln done';
    platform.classList.add('live');
    var plats=[].slice.call(platform.querySelectorAll('.xf-plat'));
    for(var k=0;k<plats.length;k++){ if(plats[k].dataset.k==='alert') plats[k].classList.add('warn'); plats[k].classList.add('on'); await sleep(260); }
    accept.textContent=applied+' change'+(applied===1?'':'s')+' applied'; accept.classList.add('done'); status.textContent='Done. '+applied+' jobs updated, logged in each job\'s history.'; status.classList.add('ok');
    line(applied+' jobs updated and the schedule re-sequenced. Reply to Dana drafted: lines 50 and 60 can land Oct 27, not Oct 22.',false);
  }
  async function cycle(){
    var id=++cycleId; accepted=false;
    file.classList.remove('in'); sheet.classList.remove('in'); zone.classList.remove('hot'); zone.textContent='Drop an email'; prompt.textContent=''; log.innerHTML='';
    count.textContent='0 of 9 checked'; status.textContent='Nothing changes until you accept.'; status.classList.remove('ok');
    accept.disabled=true; accept.classList.remove('pulse','done'); accept.textContent='Accept 7 changes';
    platform.classList.remove('live'); [].forEach.call(platform.querySelectorAll('.xf-plat'),function(p){p.classList.remove('on','warn');});
    rowEls.forEach(function(r){r.className='ml';});
    var trows=renderTable();
    await sleep(900); if(id!==cycleId) return;
    zone.classList.add('hot'); zone.textContent='Release to add'; await sleep(500);
    file.classList.add('in'); zone.classList.remove('hot'); await sleep(700);
    sheet.classList.add('in'); await sleep(500);
    await typeInto(prompt,'Acme emailed new dates for PO 48812. Find each line on the sales order, tell me which changes we can actually make, and update the due dates on the ones I accept.');
    await sleep(450); if(id!==cycleId) return;
    var l1=line('Reading the email: 9 line changes requested on sales order 48812',true); await sleep(800); l1.className='ln done';
    var l2=line('Checking each line against job status, material and the schedule',true);
    for(var i=0;i<trows.length;i++){ if(id!==cycleId) return; rowEls.forEach(function(e){e.classList.remove('read');}); var vis=rowEls[MAP[i]]; vis.classList.add('read'); trows[i].classList.add('in'); count.textContent=(i+1)+' of 9 checked'; await sleep(280); vis.classList.remove('read'); vis.classList.add('done'); }
    l2.className='ln done';
    line('7 changes are possible. Lines 50 and 60 are at anodize until Oct 27, so Oct 22 is not. Review and accept.',false);
    status.textContent='7 of 9 selected. Accept to update the jobs.'; accept.disabled=false; accept.classList.add('pulse');
    var t=0; while(t<4200 && !accepted && id===cycleId){ await sleep(100); t+=100; }
    if(id!==cycleId) return;
    if(!accepted) await applyChanges(trows,id);
    await sleep(5600); if(id!==cycleId) return;
    cycle();
  }
  accept.addEventListener('click',function(){ if(!accept.disabled){ var tr=[].slice.call(table.querySelectorAll('.xf-t:not(.hdr)')); applyChanges(tr,cycleId); } });
  reject.addEventListener('click',function(){ if(accepted) return; status.textContent='Rejected. No jobs were changed.'; accept.disabled=true; accept.classList.remove('pulse'); line('Rejected. Nothing was written to Fulcrum.',false); accepted=true; setTimeout(cycle,2600); });
  cycle();
})();
(function(){
  var STATES=[
    {w:'sales', page:'Quote hit rate', prompt:'Build a quote hit-rate board by customer for the last 12 months, with a drill-in to the quotes we lost.',
     log:['Reading quotes and sales orders from your Fulcrum','Grouping 1,284 quotes by customer and outcome','Laying out the board with a drill-in per customer'],
     app:{title:'Quote hit rate by customer', sub:'Last 12 months · live', mini:[['Quoted','1,284'],['Won','612'],['Hit rate','48%'],['Lost value','$2.1M']], rows:[['Crestline Aero','68%',68],['Harbor Dynamics','54%',54],['Summit Fabrication','47%',47],['Northfield Machine','41%',41]], chip:'won / quoted', foot:'Open lost quotes'}},
    {w:'engineering', page:'Setup sheets', prompt:'Give me a setup-sheet library: pick a job, show the routing, and attach the fixture photo and offsets for each op.',
     log:['Reading routings, operations and attachments','Matching fixtures and offsets to each op','Building the job picker and sheet view'],
     app:{title:'Setup sheets', sub:'Job 4912 · 12345678-BRKT', mini:[['Ops','5'],['Fixtures','3'],['Photos','7'],['Last edit','today']], rows:[['Op 10  Saw cut, 1.25 bar','photo + offsets',0],['Op 20  Mill, fixture F-114','photo + offsets',0],['Op 30  Deburr','notes',0],['Op 40  Anodize (outside)','vendor spec',0]], chip:'attachment', foot:'Print traveler'}},
    {w:'purchasing', page:'Open POs', prompt:'Show open purchase orders by vendor, flag anything past its promise date, and let me email the vendor from the row.',
     log:['Reading open purchase orders and promise dates','Flagging 6 lines past promise','Adding an email action to each row'],
     app:{title:'Open POs, late by vendor', sub:'22 open · 6 late', mini:[['Open POs','22'],['Late','6'],['Due this week','9'],['Open $','$184K']], rows:[['Midwest Steel Supply  PO 7781','4 days late',0],['Allied Fasteners  PO 7790','2 days late',0],['Lakeshore Metals  PO 7765','1 day late',0],['Prairie Tool Supply  PO 7802','due Fri',0]], chip:'email vendor', act:true, foot:'Email all late'}},
    {w:'quality', page:'Job inspection plan', prompt:'Build us a job inspection plan our QC team fills out. Type in a job number, pull the part details, draft the inspection plan, and export a PDF.',
     log:['Reading the job, part and drawing details','Drafting characteristics from the routing and specs','Adding measure fields and a PDF export'],
     app:{title:'Job inspection plan', sub:'Job 4856 · 12345678-BRKT', mini:[['Characteristics','5'],['Measured','0 / 5'],['Inspector','—'],['Status','Draft']], rows:[['Dimension 1.250 ±.005','measure',0],['Thread 1/4-20 UNC','measure',0],['Surface finish 63','measure',0],['Hole Ø.375 ±.002','measure',0]], chip:'measure', foot:'Export PDF'}},
    {w:'production', page:'Behind schedule', prompt:"Show me every job behind schedule, grouped by department, with the operation it is sitting on, and a reason for why it's late. Suggest an action to take to fix it.",
     log:['Reading jobs, operations and due dates','Found 14 jobs behind, across 3 departments','Adding a move-to-next-op button on each row'],
     app:{title:'Behind schedule by department', sub:'14 jobs · 3 departments', mini:[['Behind','14'],['Mill','7'],['Weld','5'],['Finish','2']], rows:[['Mill  Job 4820  Op 20','3 days · waiting on material',0],['Mill  Job 4833  Op 30','2 days · machine down',0],['Weld  Job 4790  Op 10','2 days · no operator',0],['Finish  Job 4802  Op 40','1 day · outside service',0]], chip:'move to next op', act:true, foot:'Set new due dates'}},
    {w:'everyone', page:'Shop scoreboard', prompt:'Make a shop scoreboard for the TV on the floor: jobs shipped today, on-time this week, and who is clocked in where.',
     log:['Reading shipments, time clock and job status','Calculating on-time for the week','Laying out big numbers for a TV'],
     app:{title:'Shop scoreboard', sub:'Live · refreshes every minute', mini:[['Shipped today','11'],['On time','94%'],['Open jobs','128'],['Clocked in','23']], rows:[['Mill 3  Job 4820  Op 20','T. Alvarez',0],['Laser 1  Job 4871  Op 10','R. Chen',0],['Weld A  Job 4790  Op 30','M. Dubois',0],['Finish  Job 4802  Op 40','J. Okafor',0]], chip:'live', foot:'Full screen'}}
  ];
  var TYPE_MS=65, DELETE_MS=38, JITTER=45, GAP_MS=350;
  var out=document.getElementById('cycle'), caret=document.getElementById('caret');
  if(!out||!document.getElementById('guided')) return;
  var st=document.getElementById('appStatic'); if(st) st.parentNode.removeChild(st);
  document.getElementById('chips').innerHTML=''; document.getElementById('stepsLog').innerHTML=''; document.getElementById('stepsLog').hidden=true; document.getElementById('chatHint').hidden=false; document.getElementById('emptyState').classList.remove('hide'); document.getElementById('promptBox').value='';
  var noop={classList:{add:function(){},remove:function(){}},addEventListener:function(){},hidden:false};
  var promptBox=document.getElementById('promptBox'), sendBtn=document.getElementById('sendBtn')||noop, nudge=document.getElementById('nudge')||noop;
  var pageName=document.getElementById('pageName'), canvas=document.getElementById('canvas'), emptyState=document.getElementById('emptyState'), working=document.getElementById('working'), workingPill=document.getElementById('workingPill');
  var stepsLog=document.getElementById('stepsLog'), chatHint=document.getElementById('chatHint'), chips=document.getElementById('chips'), demoNote=document.getElementById('demoNote');
  var pause=document.getElementById('pause')||{checked:false};
  var manual=false, busy=false, showing=-1, wi=4;
  function rand(n){return Math.floor(Math.random()*n);}
  STATES.forEach(function(s,i){
    var d=document.createElement('div'); d.className='app'; d.id='app'+i;
    var mini=s.app.mini.map(function(m){return '<div><small>'+m[0]+'</small><b>'+m[1]+'</b></div>';}).join('');
    var rows=s.app.rows.map(function(r){
      var right = r[2] ? '<div class="bar" aria-hidden="true"><i style="width:'+r[2]+'%"></i></div>' : '<span class="chip'+(s.app.act?' act':'')+'">'+(s.app.chip)+'</span>';
      var val = r[2] ? '<span class="num">'+r[1]+'</span>' : '<span class="num" style="font-weight:500;color:var(--grey-500)">'+r[1]+'</span>';
      return '<div class="row"><div>'+r[0]+' &nbsp;'+val+'</div>'+right+'</div>';
    }).join('');
    d.innerHTML='<div class="app-bar">'+s.app.title+'<small>'+s.app.sub+'</small></div><div class="mini">'+mini+'</div>'+rows+'<div class="app-foot"><span class="btn">'+s.app.foot+'</span></div>';
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
  async function runFor(i, fromUser){
    if(busy) return; markChip(i); wi=i;
    if(!fromUser){ await setWord(i); } else { out.textContent=STATES[i].w; caret.classList.add('blink'); }
    await typeInto(promptBox, STATES[i].prompt);
    sendBtn.classList.add('pulse'); nudge.classList.add('show');
    if(fromUser){ promptBox.focus(); return; }
    await sleep(1400); if(manual) return;
    await build(i);
  }
  function userSend(){ if(busy) return; manual=true; demoNote.textContent='Scripted demo. Pick a team to watch Builder make its app; the real Builder runs inside Fulcrum.'; build(wi); }
  sendBtn.addEventListener('click', userSend);
  promptBox.addEventListener('keydown', function(e){ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); userSend(); } });
  
  (async function loop(){
    out.textContent=STATES[wi].w; markChip(wi);
    while(true){
      if(pause.checked || manual){ await sleep(400); continue; }
      await runFor(wi,false);
      var t=0; while(t<3800 && !manual){ await sleep(100); t+=100; }
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
