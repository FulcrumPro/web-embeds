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
  /* Hero scripted demo: six builds, six different interfaces. Sample data only. */
  function esc(s){ return String(s); }
  var STATES=[
    {w:'sales', page:'Quote hit rate', prompt:'Build a quote hit-rate board by customer for the last 12 months, with a drill-in to the quotes we lost.',
     log:['Reading quotes and sales orders from your Fulcrum','Grouping 1,284 quotes by customer and outcome','Laying out the board with a drill-in per customer'],
     done:'Lost quotes open', sum:'18 lost quotes listed for Northfield Machine. Top reason: lead time.', logDone:'Opened the 18 lost quotes with the reason logged on each one.',
     render:function(){
       var rows=[['Crestline Aero',68,'214'],['Harbor Dynamics',54,'180'],['Summit Fabrication',47,'162'],['Lakeshore Controls',44,'97'],['Northfield Machine',41,'143']];
       return '<div class="sa"><div class="sa-head"><div><b>Quote hit rate by customer</b><small>Last 12 months · 1,284 quotes</small></div><div class="sa-kpis"><div><b>48%</b><small>won</small></div><div><b>$2.1M</b><small>lost value</small></div></div></div>'
       +'<div class="sa-body"><div class="sa-bars">'+rows.map(function(r,i){ return '<div class="sa-row" data-i="'+i+'"><span class="sa-name">'+r[0]+'</span><div class="sa-track"><i style="width:'+r[1]+'%"></i></div><b>'+r[1]+'%</b><small>'+r[2]+' quotes</small></div>'; }).join('')+'</div>'
       +'<div class="sa-drill"><div class="sa-drill-h"><b>Lost quotes · Northfield Machine</b><small>18 · $412K</small></div><div class="sa-q"><b>Q-2291</b><span>$142K</span><em>lead time</em></div><div class="sa-q"><b>Q-2318</b><span>$88K</span><em>price</em></div><div class="sa-q"><b>Q-2340</b><span>$61K</span><em>lead time</em></div><div class="sa-q"><b>Q-2377</b><span>$47K</span><em>no response</em></div></div></div>'
       +'<div class="app-foot"><span class="btn" role="button" tabindex="0">Open lost quotes</span></div></div>';
     },
     act:async function(app,sleep){
       var row=app.querySelector('.sa-row[data-i="4"]'); row.classList.add('on'); await sleep(400);
       app.querySelector('.sa').classList.add('drill'); await sleep(350);
       var qs=app.querySelectorAll('.sa-q'); for(var i=0;i<qs.length;i++){ qs[i].classList.add('in'); await sleep(220); }
     }},
    {w:'engineering', page:'Setup sheets', prompt:'Give me a setup-sheet library: pick a job, show the routing, and the setup notes and offsets for each op.',
     log:['Reading routings, operations and attachments','Matching setup notes and offsets to each op','Building the job picker and sheet view'],
     done:'Ready to print', sum:'Traveler for job 4912 is ready to print: 4 pages, photos included.', logDone:'Traveler for job 4912 is ready to print: 4 pages with the setup photos.',
     render:function(){
       return '<div class="en"><div class="en-list"><div class="en-search">Find a job…</div><div class="en-job on"><b>4912</b><span>12345678-BRKT · Rev C</span></div><div class="en-job"><b>4907</b><span>22110-HSG · Rev A</span></div><div class="en-job"><b>4899</b><span>30441-PLT · Rev B</span></div><div class="en-job"><b>4880</b><span>18870-TRAY · Rev D</span></div></div>'
       +'<div class="en-sheet"><div class="en-title"><b>Setup sheet · Job 4912</b><small>12345678-BRKT · Rev C · 5 ops · 3 fixtures</small></div>'
       +'<div class="en-op"><div class="en-op-h"><b>Op 10</b> Saw cut, 1.25 bar</div><div class="en-op-b"><div class="en-photo"></div><div class="en-notes"><span>Stop at 14.50, deburr both ends.</span><table><tr><td>Length</td><td>14.500</td></tr><tr><td>Qty per bar</td><td>8</td></tr></table></div></div></div>'
       +'<div class="en-op"><div class="en-op-h"><b>Op 20</b> Mill, fixture F-114</div><div class="en-op-b"><div class="en-photo p2"></div><div class="en-notes"><span>Locate on dowels, clamp from the back.</span><table><tr><td>G54 X / Y</td><td>−2.1250 / 0.7500</td></tr><tr><td>Z</td><td>−0.0625</td></tr></table></div></div></div>'
       +'<div class="en-op"><div class="en-op-h"><b>Op 30</b> Deburr</div><div class="en-op-b"><div class="en-photo p3"></div><div class="en-notes"><span>Break all edges .010 max. Check the slot.</span></div></div></div>'
       +'<div class="en-pages"><div class="en-page"></div><div class="en-page"></div><div class="en-page"></div><div class="en-page"></div><span>4 pages</span></div>'
       +'</div><div class="app-foot"><span class="btn" role="button" tabindex="0">Print traveler</span></div></div>';
     },
     act:async function(app,sleep){
       app.querySelector('.en').classList.add('print'); var pg=app.querySelectorAll('.en-page'); for(var i=0;i<pg.length;i++){ pg[i].classList.add('in'); await sleep(260); }
       await sleep(300); app.querySelector('.en-pages').classList.add('ready');
     }},
    {w:'purchasing', page:'Open POs', prompt:'Show open purchase orders by vendor, flag anything past its promise date, and let me flag it for the buyer from the row.',
     log:['Reading open purchase orders and promise dates','Flagging 6 lines past promise','Adding a flag-and-note action to each row'],
     done:'Late POs flagged', sum:'3 late POs flagged, with a note on each for the buyer.', logDone:'Flagged the 3 late purchase orders in Fulcrum and added a note to each for the buyer.',
     render:function(){
       var rows=[['Midwest Steel Supply','PO 7781',10,62,true,'4 days late'],['Allied Fasteners','PO 7790',22,58,true,'2 days late'],['Lakeshore Metals','PO 7765',30,55,true,'1 day late'],['Prairie Tool Supply','PO 7802',34,76,false,'due Fri'],['Northfield Castings','PO 7810',40,88,false,'due next week']];
       return '<div class="po"><div class="po-head"><div><b>Open POs, late by vendor</b><small>22 open · <em class="po-late-n">6</em> past promise</small></div><div class="po-legend"><span><i class="ok"></i>on time</span><span><i class="no"></i>late</span><span class="today">today</span></div></div>'
       +'<div class="po-rows">'+rows.map(function(r){ return '<div class="po-row'+(r[4]?' late':'')+'"><div class="po-v"><b>'+r[0]+'</b><small>'+r[1]+'</small></div><div class="po-tl"><i class="po-bar" style="left:'+r[2]+'%;width:'+(r[3]-r[2])+'%"></i><span class="po-lbl">'+r[5]+'</span></div><span class="po-flag">'+(r[4]?'Flag for buyer':'')+'</span></div>'; }).join('')+'</div>'
       +'<div class="app-foot"><span class="btn" role="button" tabindex="0">Flag late POs</span></div></div>';
     },
     act:async function(app,sleep){
       var rows=app.querySelectorAll('.po-row.late'); for(var i=0;i<rows.length;i++){ rows[i].classList.add('flagged'); rows[i].querySelector('.po-flag').textContent='Flagged · note added'; await sleep(380); }
       app.querySelector('.po-late-n').textContent='3';
     }},
    {w:'quality', page:'Job inspection plan', prompt:'Build us a job inspection plan our QC team fills out. Type in a job number, pull the part details, draft the inspection plan, and print it.',
     log:['Reading the job, part and drawing details','Drafting characteristics from the routing and specs','Adding measure fields and a print layout'],
     done:'NCR opened, ready to print', sum:'NCR opened for hole Ø.375. Plan attached to job 4856.', logDone:'Opened an NCR for the hole size, attached the plan to job 4856, and laid out the print view.',
     render:function(){
       var ch=[['Dimension','1.250','± .005'],['Thread','1/4-20 UNC','go / no-go'],['Surface finish','63 Ra','max'],['Hole Ø','.375','± .002']];
       return '<div class="qc"><div class="qc-form"><div class="qc-f"><small>Job</small><b>4856</b></div><div class="qc-f"><small>Part</small><b>12345678-BRKT</b></div><div class="qc-f"><small>Inspector</small><b class="qc-insp">—</b></div><div class="qc-f"><small>Status</small><b class="qc-status">Draft</b></div></div>'
       +'<div class="qc-rows"><div class="qc-row h"><span>Characteristic</span><span>Nominal</span><span>Tolerance</span><span>Measured</span><span>Result</span></div>'
       +ch.map(function(c){ return '<div class="qc-row"><span>'+c[0]+'</span><span>'+c[1]+'</span><span>'+c[2]+'</span><span class="qc-in"><i></i></span><span class="qc-res"></span></div>'; }).join('')+'</div>'
       +'<div class="qc-ncr"><b>NCR-0142 opened</b><span>Hole Ø .375 measured .3774, out of tolerance. Attached to job 4856.</span></div>'
       +'<div class="app-foot"><span class="btn" role="button" tabindex="0">Print / PDF</span></div></div>';
     },
     act:async function(app,sleep){
       var vals=[['1.2512','ok'],['pass','ok'],['58 Ra','ok'],['.3774','no']]; var ins=app.querySelectorAll('.qc-in i'), res=app.querySelectorAll('.qc-res');
       app.querySelector('.qc-insp').textContent='R. Chen'; app.querySelector('.qc-status').textContent='In progress';
       for(var i=0;i<vals.length;i++){ var t=vals[i][0]; for(var k=1;k<=t.length;k++){ ins[i].textContent=t.slice(0,k); await sleep(55); } res[i].className='qc-res '+vals[i][1]; res[i].textContent=vals[i][1]==='ok'?'Pass':'Out of spec'; await sleep(260); }
       await sleep(300); app.querySelector('.qc-ncr').classList.add('in'); app.querySelector('.qc-status').textContent='1 flagged';
     }},
    {w:'production', page:'Behind schedule', prompt:"Show me every job behind schedule, grouped by department, with the operation it is sitting on, and a reason for why it’s late. Suggest an action to take to fix it.",
     log:['Reading jobs, operations and due dates','Found 14 jobs behind, across 3 departments','Adding a move-to-next-op button on each row'],
     done:'Due dates set', sum:'4 due dates written to Fulcrum and each job moved to its next operation. 3 customers flagged for a call.', logDone:'Wrote 4 new due dates to Fulcrum and moved each job to its next operation. The 3 affected customers are flagged for a call.',
     render:function(){
       var cols=[['Mill',7,[['4820','Op 20','3 d late','waiting on material','Expedite PO 2231','Oct 17'],['4833','Op 30','2 d late','machine down','Move to Haas 2','Oct 17']]],['Weld',5,[['4790','Op 10','2 d late','waiting on inspection','Call inspection','Oct 16']]],['Finish',2,[['4802','Op 40','1 d late','outside service','Chase Lakeshore Coatings','Oct 15']]]];
       return '<div class="pr"><div class="pr-head"><div><b>Behind schedule by department</b><small><em class="pr-n">14</em> jobs behind · 3 departments</small></div></div><div class="pr-cols">'
       +cols.map(function(c){ return '<div class="pr-col"><div class="pr-col-h"><b>'+c[0]+'</b><span class="pr-cnt">'+c[1]+'</span></div>'+c[2].map(function(j){ return '<div class="pr-card" data-new="'+j[5]+'"><div class="pr-card-t"><b>Job '+j[0]+'</b><span>'+j[1]+'</span></div><div class="pr-why"><em>'+j[2]+'</em> · '+j[3]+'</div><div class="pr-act">'+j[4]+'</div><div class="pr-due">Due <s></s><b></b></div></div>'; }).join('')+'</div>'; }).join('')
       +'</div><div class="app-foot"><span class="btn" role="button" tabindex="0">Set new due dates</span></div></div>';
     },
     act:async function(app,sleep){
       var cards=app.querySelectorAll('.pr-card'); var olds=['Oct 14','Oct 15','Oct 15','Oct 13'];
       for(var i=0;i<cards.length;i++){ var c=cards[i]; c.querySelector('.pr-due s').textContent=olds[i]; c.querySelector('.pr-due b').textContent=c.getAttribute('data-new'); c.classList.add('set'); await sleep(420); }
       var n=app.querySelector('.pr-n'); n.textContent='10'; var cnts=app.querySelectorAll('.pr-cnt'); cnts[0].textContent='5'; cnts[1].textContent='4'; cnts[2].textContent='1';
     }},
    {w:'everyone', page:'Shop scoreboard', prompt:'Make a shop scoreboard for the TV on the floor: jobs shipped today, on-time this week, and who is clocked in where.',
     log:['Reading shipments, time clock and job status','Calculating on-time for the week','Laying out big numbers for a TV'],
     done:'Full screen', sum:'Live on the floor TV.', logDone:'Live on the floor TV, on live Fulcrum data.',
     render:function(){
       var m=[['Mill 3','Job 4820 · Op 20','T. Alvarez'],['Laser 1','Job 4871 · Op 10','R. Chen'],['Weld A','Job 4790 · Op 30','M. Dubois'],['Finish','Job 4802 · Op 40','J. Okafor'],['Brake 2','Job 4866 · Op 20','L. Park']];
       return '<div class="tv"><div class="tv-top"><b>Shop scoreboard</b><span class="tv-clock"><i></i>Live · 10:41</span></div><div class="tv-big"><div><small>Shipped today</small><b class="tv-ship">11</b></div><div><small>On time this week</small><b>94<em>%</em></b></div><div><small>Open jobs</small><b>128</b></div><div><small>Clocked in</small><b class="tv-in">23</b></div></div>'
       +'<div class="tv-now"><small>Now running</small><div class="tv-m">'+m.map(function(x){ return '<div class="tv-mc"><i></i><b>'+x[0]+'</b><span>'+x[1]+'</span><em>'+x[2]+'</em></div>'; }).join('')+'</div></div>'
       +'<div class="app-foot"><span class="btn" role="button" tabindex="0">Full screen</span></div></div>';
     },
     act:async function(app,sleep){
       app.querySelector('.tv').classList.add('full'); await sleep(500);
       app.querySelector('.tv-clock').innerHTML='<i></i>Live · 10:42'; await sleep(500);
       app.querySelector('.tv-ship').textContent='12'; app.querySelector('.tv-ship').classList.add('tick'); await sleep(600);
       var mc=app.querySelectorAll('.tv-mc'); mc[1].querySelector('span').textContent='Job 4874 · Op 10'; mc[1].classList.add('swap'); await sleep(500);
       app.querySelector('.tv-in').textContent='24'; app.querySelector('.tv-in').classList.add('tick');
     }}
  ];
  var TYPE_MS=65, DELETE_MS=38, JITTER=45, GAP_MS=350;
  var out=document.getElementById('cycle'), caret=document.getElementById('caret');
  if(!out||!document.getElementById('guided')) return;
  var st=document.getElementById('appStatic'); if(st) st.parentNode.removeChild(st);
  var noop={classList:{add:function(){},remove:function(){}},addEventListener:function(){},hidden:false};
  var promptBox=document.getElementById('promptBox'), sendBtn=document.getElementById('sendBtn')||noop, nudge=document.getElementById('nudge')||noop;
  var pageName=document.getElementById('pageName'), canvas=document.getElementById('canvas'), emptyState=document.getElementById('emptyState'), working=document.getElementById('working'), workingPill=document.getElementById('workingPill');
  var stepsLog=document.getElementById('stepsLog'), chatHint=document.getElementById('chatHint'), chips=document.getElementById('chips')||document.createElement('div'), demoNote=document.getElementById('demoNote')||{};
  var pause=document.getElementById('pause')||{checked:false};
  var manual=false, busy=false, showing=-1, wi=4;
  function rand(n){return Math.floor(Math.random()*n);}
  STATES.forEach(function(s,i){
    var d=document.createElement('div'); d.className='app app-'+s.w; d.id='app'+i; d.innerHTML=s.render()+'<div class="done-bar" hidden><i></i><span></span></div>';
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
    var s=STATES[i], app=document.getElementById('app'+i); if(!app) return;
    var btn=app.querySelector('.app-foot .btn'), bar=app.querySelector('.done-bar');
    await sleep(1100); if(showing!==i) return;
    btn.classList.add('pulse'); await clickOrWait(btn,1700); if(showing!==i) return;
    btn.classList.remove('pulse'); btn.textContent='Working…';
    try{ await s.act(app,sleep); }catch(e){}
    if(showing!==i) return;
    if(bar){ bar.querySelector('span').textContent=s.sum; bar.hidden=false; void bar.offsetWidth; bar.classList.add('on'); await sleep(500); if(showing!==i) return; }
    btn.textContent=s.done; btn.classList.add('done');
    var ln=document.createElement('div'); ln.className='ln done'; ln.innerHTML='<i></i><span>'+s.logDone+'</span>'; stepsLog.appendChild(ln);
  }
  function resetApp(i){ var app=document.getElementById('app'+i); if(!app) return; app.innerHTML=STATES[i].render()+'<div class="done-bar" hidden><i></i><span></span></div>'; }
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
})();
});
