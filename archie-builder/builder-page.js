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
  function line(txt,live){var ln=document.createElement('div');ln.className='ln '+(live?'live':'done');ln.innerHTML='<i></i><span>'+txt+'</span>';if(log) log.appendChild(ln);return ln;}
  function typeChars(el,text,ms){return new Promise(function(res){var k=0;el.textContent='';(function t(){if(k<text.length){k++;el.textContent=text.slice(0,k);setTimeout(t,ms||14);}else res();})();});}
  var pub=q('xfPub'), skel=q('xfSkel'), publish=q('xfPublish'), promptText=q('xfPromptText');
  var who=q('xfWho'), whoAv=q('xfAv'), whoName=q('xfWhoName'), whoRole=q('xfWhoRole'), railAv=document.querySelector('#xf .fu-rail .fu-av'), phase=q('xfPhase');
  function persona(p){ if(!who) return; who.classList.remove('build','use'); who.classList.add(p);
    if(p==='build'){ whoAv.textContent='MK'; whoName.textContent='Mike Kowalski'; whoRole.textContent='Operations manager · building the app'; if(railAv) railAv.textContent='MK'; if(phase){ phase.textContent='1 · Mike builds it'; phase.className='xf-phase build'; } }
    else { whoAv.textContent='JO'; whoName.textContent='Jen Okafor'; whoRole.textContent='Customer service · using the app'; if(railAv) railAv.textContent='JO'; if(phase){ phase.textContent='2 · Jen uses it'; phase.className='xf-phase use'; } } }
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
    if(log) log.innerHTML=''; count.textContent='0 of 7 read'; status.textContent='Drop the customer’s file to start. Nothing changes until you accept.'; status.classList.remove('ok');
    /* quick build: the request types, the app takes shape, it gets published to the Sales menu */
    persona('build');
    if(pub){ pub.textContent='Draft'; pub.classList.remove('live'); }
    if(publish){ publish.hidden=false; publish.classList.remove('pulse','done'); publish.textContent='Publish app'; }
    if(skel) skel.classList.remove('off');
    if(promptText){ promptText.textContent=''; }
    if(file){ file.classList.remove('in','read'); } if(zone){ zone.classList.remove('hot'); zone.textContent='Drop the customer’s spreadsheet here'; }
    if(headMeta) headMeta.textContent='Sales order 48812 · 7 lines';
    accept.disabled=true; accept.classList.remove('pulse','done'); accept.textContent='Update due dates';
    platform.classList.remove('live'); [].forEach.call(platform.querySelectorAll('.xf-plat'),function(p){p.classList.remove('on');});
    var trows=renderTable();
    if(promptText){ await typeChars(promptText,'Make a page where we drop in a customer’s spreadsheet of requested dates, match each line to its job, see the job’s status, and update the due dates on the lines we accept.',12); if(id!==cycleId) return; }
    await sleep(1500); if(id!==cycleId) return;
    if(skel) skel.classList.add('off');
    await sleep(500); if(id!==cycleId) return;
    if(publish){ publish.classList.add('pulse'); await new Promise(function(res){ var done=false; function go(){ if(done) return; done=true; publish.removeEventListener('click',go); res(); } publish.addEventListener('click',go); setTimeout(go,1600); }); if(id!==cycleId) return; publish.classList.remove('pulse'); publish.classList.add('done'); publish.textContent='Published'; }
    if(pub){ pub.textContent='Published · Sales'; pub.classList.add('live'); }
    status.textContent='Published to the Sales menu.';
    await sleep(1400); if(id!==cycleId) return;
    if(publish) publish.hidden=true;
    persona('use'); status.textContent='Jen opens it from the Sales menu and drops in the customer’s file.';
    await sleep(1200); if(id!==cycleId) return;
    /* use the app */
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
       var rows=[['Crestline Aero',68],['Harbor Dynamics',54],['Summit Fabrication',47],['Northfield Machine',41]];
       var C=2*Math.PI*54;
       return '<div class="sa"><div class="sa-ring"><svg viewBox="0 0 128 128" width="150" height="150"><circle cx="64" cy="64" r="54" fill="none" stroke="#e8effd" stroke-width="14"/><circle class="sa-arc" cx="64" cy="64" r="54" fill="none" stroke="#1d63ed" stroke-width="14" stroke-linecap="round" stroke-dasharray="'+C+'" stroke-dashoffset="'+(C*(1-.48))+'" transform="rotate(-90 64 64)"/></svg><div class="sa-ring-t"><b>48<em>%</em></b><small>quotes won</small></div><div class="sa-ring-k"><span><b>612</b> won</span><span><b>$2.1M</b> lost</span></div></div>'
       +'<div class="sa-bars">'+rows.map(function(r,i){ return '<div class="sa-row" data-i="'+i+'"><div class="sa-l"><span>'+r[0]+'</span><b>'+r[1]+'%</b></div><div class="sa-track"><i style="width:'+r[1]+'%"></i></div></div>'; }).join('')
       +'<div class="sa-drill"><div class="sa-drill-h"><b>Northfield Machine</b><span>18 lost · $412K</span></div><div class="sa-tiles"><div><b>11</b><small>lead time</small></div><div><b>5</b><small>price</small></div><div><b>2</b><small>no reply</small></div></div></div></div>'
       +'<div class="app-foot"><span class="btn" role="button" tabindex="0">Open lost quotes</span></div></div>';
     },
     act:async function(app,sleep){
       var row=app.querySelector('.sa-row[data-i="3"]'); row.classList.add('on'); await sleep(450);
       app.querySelector('.sa').classList.add('drill'); await sleep(300);
       var t=app.querySelectorAll('.sa-tiles div'); for(var i=0;i<t.length;i++){ t[i].classList.add('in'); await sleep(220); }
     }},
    {w:'engineering', page:'Setup sheets', prompt:'Give me a setup-sheet library: pick a job, show the routing, and the setup notes and offsets for each op.',
     log:['Reading routings, operations and attachments','Matching setup notes and offsets to each op','Building the job picker and sheet view'],
     done:'Ready to print', sum:'Traveler for job 4912 is ready to print: 4 pages, photos included.', logDone:'Traveler for job 4912 is ready to print: 4 pages with the setup photos.',
     render:function(){
       return '<div class="en"><div class="en-photo"><svg viewBox="0 0 200 140" aria-hidden="true"><path d="M30 20h100l40 30v70H30z" fill="#c9cfdb" stroke="#8a93a8" stroke-width="2"/><circle cx="60" cy="50" r="9" fill="#eef1f7" stroke="#8a93a8" stroke-width="2"/><circle cx="140" cy="95" r="9" fill="#eef1f7" stroke="#8a93a8" stroke-width="2"/><rect x="75" y="80" width="50" height="14" rx="7" fill="#eef1f7" stroke="#8a93a8" stroke-width="2"/></svg><div class="en-tag"><b>Job 4912</b><span>12345678-BRKT · Rev C</span></div><div class="en-thumbs"><i></i><i></i><i></i><i></i><b>7 photos</b></div></div>'
       +'<div class="en-ops"><div class="en-op"><b>10</b><div><strong>Saw cut</strong><span>1.25 bar · stop at 14.500</span></div></div><div class="en-op"><b>20</b><div><strong>Mill · fixture F-114</strong><span>G54 X −2.1250 · Y 0.7500 · Z −0.0625</span></div></div><div class="en-op"><b>30</b><div><strong>Deburr</strong><span>Break edges .010 max</span></div></div><div class="en-op"><b>40</b><div><strong>Anodize</strong><span>Outside · Lakeshore Coatings</span></div></div>'
       +'<div class="en-pages"><div class="en-page"></div><div class="en-page"></div><div class="en-page"></div><div class="en-page"></div><span>4 pages</span></div></div>'
       +'<div class="app-foot"><span class="btn" role="button" tabindex="0">Print traveler</span></div></div>';
     },
     act:async function(app,sleep){
       app.querySelector('.en').classList.add('print'); var pg=app.querySelectorAll('.en-page'); for(var i=0;i<pg.length;i++){ pg[i].classList.add('in'); await sleep(260); }
       await sleep(300); app.querySelector('.en-pages').classList.add('ready');
     }},
    {w:'purchasing', page:'Open POs', prompt:'Show open purchase orders by vendor, flag anything past its promise date, and let me flag it for the buyer from the row.',
     log:['Reading open purchase orders and promise dates','Flagging 6 lines past promise','Adding a flag-and-note action to each row'],
     done:'Late POs flagged', sum:'3 late POs flagged, with a note on each for the buyer.', logDone:'Flagged the 3 late purchase orders in Fulcrum and added a note to each for the buyer.',
     render:function(){
       var days=['Mon','Tue','Wed','Thu','Fri','Mon','Tue','Wed','Thu','Fri'];
       var rows=[['Midwest Steel','PO 7781',0,46,true,'4 d late'],['Allied Fasteners','PO 7790',10,41,true,'2 d late'],['Lakeshore Metals','PO 7765',18,38,true,'1 d late'],['Prairie Tool','PO 7802',22,62,false,'Fri'],['Northfield Castings','PO 7810',30,90,false,'next Thu']];
       return '<div class="po"><div class="po-cal"><span class="po-cal-v"></span>'+days.map(function(d,i){ return '<span class="'+(i===3?'today':'')+'">'+d+'</span>'; }).join('')+'</div>'
       +'<div class="po-rows">'+rows.map(function(r){ return '<div class="po-row'+(r[4]?' late':'')+'"><div class="po-v"><b>'+r[0]+'</b><small>'+r[1]+'</small></div><div class="po-tl"><i class="po-bar" style="left:'+r[2]+'%;width:'+(r[3]-r[2])+'%"><span>'+r[5]+'</span></i></div></div>'; }).join('')+'</div>'
       +'<div class="po-foot"><span class="po-n"><b>3</b> late</span><span class="po-ok"><b>2</b> on time</span></div>'
       +'<div class="app-foot"><span class="btn" role="button" tabindex="0">Flag late POs</span></div></div>';
     },
     act:async function(app,sleep){
       var rows=app.querySelectorAll('.po-row.late'); for(var i=0;i<rows.length;i++){ rows[i].classList.add('flagged'); rows[i].querySelector('.po-bar span').textContent='Flagged'; await sleep(420); }
       app.querySelector('.po-n').innerHTML='<b>0</b> late'; app.querySelector('.po-foot').classList.add('ok');
     }},
    {w:'quality', page:'Job inspection plan', prompt:'Build us a job inspection plan our QC team fills out. Type in a job number, pull the part details, draft the inspection plan, and print it.',
     log:['Reading the job, part and drawing details','Drafting characteristics from the routing and specs','Adding measure fields and a print layout'],
     done:'NCR opened, ready to print', sum:'NCR opened for hole Ø.375. Plan attached to job 4856.', logDone:'Opened an NCR for the hole size, attached the plan to job 4856, and laid out the print view.',
     render:function(){
       var ch=[['1','1.250','± .005'],['2','1/4-20','thread'],['3','63 Ra','finish'],['4','Ø .375','± .002']];
       return '<div class="qc"><div class="qc-draw"><svg viewBox="0 0 220 160" aria-hidden="true"><rect x="30" y="30" width="160" height="100" rx="6" fill="none" stroke="#292932" stroke-width="2"/><circle cx="70" cy="80" r="12" fill="none" stroke="#292932" stroke-width="2"/><circle cx="150" cy="80" r="12" fill="none" stroke="#292932" stroke-width="2"/><rect x="95" y="60" width="30" height="40" rx="4" fill="none" stroke="#292932" stroke-width="2"/><line x1="30" y1="18" x2="190" y2="18" stroke="#8a93a8" stroke-width="1.5"/><line x1="30" y1="12" x2="30" y2="24" stroke="#8a93a8" stroke-width="1.5"/><line x1="190" y1="12" x2="190" y2="24" stroke="#8a93a8" stroke-width="1.5"/><text x="110" y="12" font-size="9" text-anchor="middle" fill="#3d414a" font-family="Inter,sans-serif">1.250</text>'
       +'<g class="qc-b"><circle cx="18" cy="60" r="10" fill="#1d63ed"/><text x="18" y="64" font-size="10" text-anchor="middle" fill="#fff" font-weight="700" font-family="Inter,sans-serif">1</text></g><g class="qc-b"><circle cx="110" cy="146" r="10" fill="#1d63ed"/><text x="110" y="150" font-size="10" text-anchor="middle" fill="#fff" font-weight="700" font-family="Inter,sans-serif">2</text></g><g class="qc-b"><circle cx="204" cy="60" r="10" fill="#1d63ed"/><text x="204" y="64" font-size="10" text-anchor="middle" fill="#fff" font-weight="700" font-family="Inter,sans-serif">3</text></g><g class="qc-b" id="qcB4"><circle cx="150" cy="40" r="10" fill="#1d63ed"/><text x="150" y="44" font-size="10" text-anchor="middle" fill="#fff" font-weight="700" font-family="Inter,sans-serif">4</text></g></svg><div class="qc-tag"><b>Job 4856</b><span>12345678-BRKT</span></div></div>'
       +'<div class="qc-tiles">'+ch.map(function(c){ return '<div class="qc-t"><i>'+c[0]+'</i><small>'+c[1]+' <em>'+c[2]+'</em></small><b class="qc-val">—</b><span class="qc-res"></span></div>'; }).join('')
       +'<div class="qc-ncr"><b>NCR-0142 opened</b><span>Hole Ø .375 measured .3774. Attached to job 4856.</span></div></div>'
       +'<div class="app-foot"><span class="btn" role="button" tabindex="0">Print / PDF</span></div></div>';
     },
     act:async function(app,sleep){
       var vals=[['1.2512','ok'],['pass','ok'],['58 Ra','ok'],['.3774','no']]; var tiles=app.querySelectorAll('.qc-t');
       for(var i=0;i<vals.length;i++){ var t=vals[i][0], v=tiles[i].querySelector('.qc-val'); for(var k=1;k<=t.length;k++){ v.textContent=t.slice(0,k); await sleep(55); } tiles[i].classList.add(vals[i][1]); tiles[i].querySelector('.qc-res').textContent=vals[i][1]==='ok'?'Pass':'Out of spec'; await sleep(260); }
       var b4=app.querySelector('#qcB4 circle'); if(b4) b4.setAttribute('fill','#ff3d00');
       await sleep(300); app.querySelector('.qc-ncr').classList.add('in');
     }},
    {w:'production', page:'Behind schedule', prompt:"Show me every job behind schedule, grouped by department, with the operation it is sitting on, and a reason for why it’s late. Suggest an action to take to fix it.",
     log:['Reading jobs, operations and due dates','Found 14 jobs behind, across 3 departments','Adding a move-to-next-op button on each row'],
     done:'Due dates set', sum:'4 due dates written to Fulcrum and each job moved to its next operation. 3 customers flagged for a call.', logDone:'Wrote 4 new due dates to Fulcrum and moved each job to its next operation. The 3 affected customers are flagged for a call.',
     render:function(){
       var cols=[['Mill','mill',7,[['4820','3d','waiting on material','Oct 17'],['4833','2d','machine down','Oct 17']]],['Weld','weld',5,[['4790','2d','waiting on inspection','Oct 16']]],['Finish','fin',2,[['4802','1d','outside service','Oct 15']]]];
       return '<div class="pr"><div class="pr-top"><b><em class="pr-n">14</em> jobs behind</b><span>3 departments</span></div><div class="pr-cols">'
       +cols.map(function(c){ return '<div class="pr-col '+c[1]+'"><div class="pr-col-h"><b>'+c[0]+'</b><span class="pr-cnt">'+c[2]+'</span></div>'+c[3].map(function(j){ return '<div class="pr-card" data-new="'+j[3]+'"><i class="pr-late">'+j[1]+'</i><div><b>Job '+j[0]+'</b><span>'+j[2]+'</span></div><em class="pr-new"></em></div>'; }).join('')+'</div>'; }).join('')
       +'</div><div class="app-foot"><span class="btn" role="button" tabindex="0">Set new due dates</span></div></div>';
     },
     act:async function(app,sleep){
       var cards=app.querySelectorAll('.pr-card');
       for(var i=0;i<cards.length;i++){ var c=cards[i]; c.querySelector('.pr-new').textContent='Due '+c.getAttribute('data-new'); c.classList.add('set'); await sleep(450); }
       app.querySelector('.pr-n').textContent='10'; var cnts=app.querySelectorAll('.pr-cnt'); cnts[0].textContent='5'; cnts[1].textContent='4'; cnts[2].textContent='1';
     }},
    {w:'everyone', page:'Shop scoreboard', prompt:'Make a shop scoreboard for the TV on the floor: jobs shipped today, on-time this week, and who is clocked in where.',
     log:['Reading shipments, time clock and job status','Calculating on-time for the week','Laying out big numbers for a TV'],
     done:'Full screen', sum:'Live on the floor TV.', logDone:'Live on the floor TV, on live Fulcrum data.',
     render:function(){
       var m=[['Mill 3','T. Alvarez'],['Laser 1','R. Chen'],['Weld A','M. Dubois'],['Finish','J. Okafor'],['Brake 2','L. Park'],['Turret 1','—']];
       var spark=[70,82,88,91,96,94];
       return '<div class="tv"><div class="tv-top"><b>Shop scoreboard</b><span class="tv-clock"><i></i>Live · 10:41</span></div><div class="tv-big"><div class="hi"><small>Shipped today</small><b class="tv-ship">11</b></div><div><small>On time this week</small><b>94<em>%</em></b><div class="tv-spark">'+spark.map(function(v){ return '<i style="height:'+v+'%"></i>'; }).join('')+'</div></div><div><small>Open jobs</small><b>128</b></div><div><small>Clocked in</small><b class="tv-in">23</b></div></div>'
       +'<div class="tv-m">'+m.map(function(x,i){ return '<div class="tv-mc'+(i===5?' idle':'')+'"><i></i><b>'+x[0]+'</b><em>'+x[1]+'</em></div>'; }).join('')+'</div>'
       +'<div class="app-foot"><span class="btn" role="button" tabindex="0">Full screen</span></div></div>';
     },
     act:async function(app,sleep){
       await sleep(400); app.querySelector('.tv-clock').innerHTML='<i></i>Live · 10:42'; await sleep(500);
       var sh=app.querySelector('.tv-ship'); sh.textContent='12'; sh.classList.add('tick'); await sleep(600);
       var mc=app.querySelectorAll('.tv-mc'); mc[5].classList.remove('idle'); mc[5].querySelector('em').textContent='S. Patel'; await sleep(500);
       var ci=app.querySelector('.tv-in'); ci.textContent='24'; ci.classList.add('tick');
     }}
  ];
  var TYPE_MS=65, DELETE_MS=38, JITTER=45, GAP_MS=350;
  var out=document.getElementById('cycle'), caret=document.getElementById('caret');
  if(!out||!document.getElementById('guided')) return;
  var st=document.getElementById('appStatic'); if(st) st.parentNode.removeChild(st);
  /* hero without a canvas (video/iframe module): only the typed team line cycles */
  if(!document.getElementById('canvas')){
    var WORDS=['production','sales','engineering','purchasing','quality','everyone'], wix=0;
    function cyc(){ return new Promise(function(res){ var cur=out.textContent, target=WORDS[wix];
      function del(){ if(cur.length){ cur=cur.slice(0,-1); out.textContent=cur; setTimeout(del,38+Math.floor(Math.random()*18)); } else { caret.classList.add('blink'); setTimeout(function(){ caret.classList.remove('blink'); typ(); },350); } }
      function typ(){ if(cur.length<target.length){ cur=target.slice(0,cur.length+1); out.textContent=cur; setTimeout(typ,65+Math.floor(Math.random()*45)); } else { caret.classList.add('blink'); res(); } }
      if(cur===target) res(); else del(); }); }
    (async function(){ while(true){ await cyc(); await new Promise(function(r){ setTimeout(r,3400); }); wix=(wix+1)%WORDS.length; } })();
    return;
  }
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
