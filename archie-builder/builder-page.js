/* Archie Builder page: hero scripted build + customer date-change app. */
document.addEventListener("DOMContentLoaded",function(){
(function(){
  /* Act panel, laid out like the real Builder: Fulcrum icon rail on the left, the app preview in the middle,
     the authoring chat on the right. Mike builds and publishes it; Jen opens it from the Sales menu and uses it. */
  var root=document.getElementById('xf'); if(!root) return;
  var MEDIA='https://fulcrumpro.github.io/web-embeds/archie-builder/media/';
  function ico(d){ return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+d+'"/></svg>'; }
  var RAIL=[
    ['archie','M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z'],
    ['sales','M4 4h16v16H4zM4 10h16M4 15h16M10 4v16'],
    ['purchasing','M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L20 7H6M9 19.5h.01M17 19.5h.01'],
    ['production','M7 4h10v6H7zM3 14h18v5H3zM7 19v2M17 19v2M12 10v4'],
    ['scheduling','M4 6h16v14H4zM4 10h16M9 3v5M15 3v5M8 14h2M14 14h2M8 17h2'],
    ['warehouse','M4 9h15l-3-3M20 15H5l3 3'],
    ['accounting','M6 3h12v18H6zM9 7h6M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01'],
    ['items','M4 13h7v7H4zM13 13h7v7h-7zM8.5 5h7v7h-7z'],
    ['reporting','M4 20h16M7 16v-5M11 16V8M15 16v-3M19 16V6'],
    ['live','M9 6h11M9 12h11M9 18h11M5 6h.01M5 12h.01M5 18h.01'],
    ['settings','M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1']
  ];
  root.className='panel xb';
  root.setAttribute('aria-label','A Builder app, simulated on sample data: Mike describes it to Archie in Builder and publishes it to the Sales menu, then Jen in customer service opens it and accepts a customer’s requested dates');
  root.innerHTML=
    '<div class="xb-rail" aria-hidden="true">'
    +'<span class="xb-logo"><svg viewBox="0 0 24 24"><path d="M4 20 14 4h3L7 20H4zm7 0L21 4h-3L8 20h3z" fill="#fff"/></svg></span>'
    +RAIL.map(function(r){ return '<i class="xb-ri" id="xbRail-'+r[0]+'">'+ico(r[1])+'</i>'; }).join('')
    +'<span class="xb-rail-gap"></span>'
    +'<i class="xb-ri">'+ico('M9 4h6l-1 6 3 3H7l3-3zM12 13v7')+'</i>'
    +'<span class="xb-rav"><img id="xbNavAv" src="'+MEDIA+'av-mike.jpg" alt="" width="28" height="28"></span>'
    +'</div>'
    +'<span class="xb-cur" id="xbCur" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 2l15 11.5-6.6 1.1 3.9 7.6-2.9 1.4-3.8-7.7L4 20.7z"/></svg></span>'
    +'<div class="xb-fly" id="xbFly" aria-hidden="true"><b>Sales</b><span>Quotes</span><span>Sales orders</span><span>Customers</span><span class="xb-flyapp" id="xbFlyApp">Customer date changes</span></div>'
    +'<div class="xb-main">'
    +  '<div class="xb-head">'
    +    '<span class="xb-crumb" id="xbCrumb">Builder</span><span class="xb-sep">›</span><b class="xb-title" id="xbTitle">Untitled page</b>'
    +    '<span class="xb-badge" id="xbBadge" hidden></span>'
    +    '<div class="xb-head-r"><div class="xb-who" id="xbWho"><i><img id="xbWhoAv" src="'+MEDIA+'av-mike.jpg" alt="" width="28" height="28"></i><div><b id="xbWhoName">Mike Kowalski</b><small id="xbWhoRole">Operations manager · building it in Builder</small></div><span class="xb-step" id="xbStep">1 of 2</span></div><span class="xb-undo" id="xbUndo" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4"/></svg></span><button class="xb-publish" id="xbPublish" type="button" hidden>Publish <i>⌄</i></button><div class="xb-pop" id="xbPop" aria-hidden="true"><div class="xb-pop-kv"><b>Live version:</b> <span id="xbPopLive">None</span></div><div class="xb-pop-kv"><b>Latest draft:</b> <span>v1 · edited just now</span></div><label>Navigation position</label><div class="xb-field" id="xbPopNav">Don’t show</div><label>Visible to</label><div class="xb-field xb-sel" id="xbPopRoles">All roles</div><div class="xb-opts" id="xbOpts"></div><div class="xb-pop-f"><span class="xb-pop-go" id="xbPopGo">Publish v1</span></div></div><span class="xb-kebab">⋮</span></div>'
    +  '</div>'
    +  '<div class="xb-body">'
    +    '<div class="xb-preview"><div class="xb-canvas">'
    +      '<div class="xb-empty" id="xbEmpty"><b>Describe what you want in the chat.</b><span>For example, “Show me open jobs grouped by status.”</span></div>'
    +      '<div class="xb-skel" id="xbSkel"><div></div><div></div><div></div><div></div><div></div><span class="xb-working">Building…</span></div>'
    +      '<div class="xb-app" id="xbApp">'
    +        '<div class="xf-form-head"><div><b>Customer date changes</b><small id="xbHeadMeta">Bring in a customer’s requested dates and update the jobs you agree to</small></div><span class="xf-count" id="xbCount" hidden></span></div>'
    +        '<div class="xb-intake" id="xbIntake">'
    +          '<div class="xb-zone" id="xbZone">'
    +            '<span class="xb-zico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M12 18v-6M9 15l3-3 3 3"/></svg></span>'
    +            '<b>Drop the customer’s file</b>'
    +            '<span>Each row is matched to its sales order line and job</span>'
    +            '<span class="xb-zfmt"><em>.xlsx</em><em>.xls</em><em>.csv</em></span>'
    +            '<span class="xb-zbtn">Browse files</span>'
    +            '<div class="xf-file xb-fly-file" id="xbFile"><span class="xf-ico xls">XLS</span><div><b>acme-requested-dates.xlsx</b><small>7 rows · item, qty, requested date</small></div></div>'
    +          '</div>'
    +          '<div class="xb-how"><div><i>1</i><b>Drop the file</b><span>Any layout with a line or job and a date</span></div><div><i>2</i><b>Review each line</b><span>See the job’s status next to the date asked for</span></div><div><i>3</i><b>Update due dates</b><span>Only on the lines you accept</span></div></div>'
    +        '</div>'
    +        '<div class="xb-result" id="xbResult">'
    +        '<div class="xb-chip" id="xbChip"><span class="xf-ico xls">XLS</span><div><b>acme-requested-dates.xlsx</b><small id="xbChipMeta">Reading…</small></div></div>'
    +        '<div class="xf-table" id="xbTable"></div>'
    +        '<div class="xf-actions"><span class="xf-status" id="xbStatus"></span><div><button class="xf-reject" id="xbReject" type="button">Clear</button><button class="xf-accept" id="xbAccept" type="button" disabled>Update due dates</button></div></div>'
    +        '<div class="xf-platform" id="xbPlatform"><div class="xf-plat-title">Written to Fulcrum</div><div class="xf-plat-grid">'
    +          '<div class="xf-plat"><i></i><b>Jobs</b><span>5 due dates</span></div>'
    +          '<div class="xf-plat"><i></i><b>Job notes</b><span>5 added · J. Okafor</span></div>'
    +          '<div class="xf-plat"><i></i><b>Schedule</b><span>Rebuilt around the new dates</span></div>'
    +        '</div></div>'
    +        '</div>'
    +      '</div>'
    +    '</div>'
    +    '<div class="xb-tag">Simulated on sample data</div>'
    +    '</div>'
    +    '<div class="xb-chat" id="xbChat">'
    +      '<div class="xb-tabs"><span class="on">Chat</span><span>Versions</span></div>'
    +      '<div class="xb-msgs" id="xbMsgs"></div>'
    +      '<div class="xb-compose"><div class="xb-input" id="xbInput"></div><div class="xb-cbar">'+ico('M21 11.5l-8.6 8.6a5 5 0 0 1-7.1-7.1l8.6-8.6a3.3 3.3 0 0 1 4.7 4.7l-8.6 8.6a1.7 1.7 0 0 1-2.4-2.4l7.9-7.9')+'<span class="xb-send" id="xbSend">Send</span></div></div>'
    +    '</div>'
    +  '</div>'
    +'</div>';

  var ROWS=[["Mounting bracket","120","4856","In progress","Oct 24","Oct 15","ok","Scheduled finish Oct 14"],["Hinge plate","80","4857","In progress","Oct 24","Oct 15","ok","Scheduled finish Oct 14"],["Valve body","40","4861","Material due Oct 9","Oct 28","Oct 17","ok","Scheduled finish Oct 16"],["Pump housing","25","4870","Outside: anodize","Nov 4","Oct 22","no","Back from anodize Oct 27","Oct 29"],["Pump cover","25","4871","Outside: anodize","Nov 4","Oct 22","no","Back from anodize Oct 27","Oct 29"],["Drive shaft","60","4880","Not started","Oct 31","Nov 14","ok","Later than current due"],["Bearing cap","150","4902","Complete, awaiting ship","Oct 21","Oct 14","ok","Can ship now"]];
  var PROMPT='Make a page where we drop in a customer’s file of requested dates, match each line to its job, show the job’s status, and update the due dates on the lines we accept.';
  var q=function(id){return document.getElementById(id);};
  var cur=q('xbCur'), canvasEl=root.querySelector('.xb-canvas'), railArchie=q('xbRail-archie'), railSales=q('xbRail-sales'), fly=q('xbFly'), flyApp=q('xbFlyApp'), navAv=q('xbNavAv');
  var crumb=q('xbCrumb'), title=q('xbTitle'), badge=q('xbBadge'), publish=q('xbPublish'), undo=q('xbUndo'), pop=q('xbPop'), popNav=q('xbPopNav'), popRoles=q('xbPopRoles'), opts=q('xbOpts'), popGo=q('xbPopGo'), popLive=q('xbPopLive');
  var empty=q('xbEmpty'), skel=q('xbSkel'), app=q('xbApp'), headMeta=q('xbHeadMeta'), count=q('xbCount'), zone=q('xbZone'), file=q('xbFile'), table=q('xbTable'), intake=q('xbIntake'), result=q('xbResult'), chipMeta=q('xbChipMeta');
  var status=q('xbStatus'), accept=q('xbAccept'), reject=q('xbReject'), platform=q('xbPlatform');
  var who=q('xbWho'), whoAv=q('xbWhoAv'), whoName=q('xbWhoName'), whoRole=q('xbWhoRole'), step=q('xbStep');
  var chat=q('xbChat'), msgs=q('xbMsgs'), input=q('xbInput'), send=q('xbSend');
  function sleep(ms){return new Promise(function(r){setTimeout(r,ms);});}
  function typeChars(el,text,ms){return new Promise(function(res){var k=0;el.textContent='';(function t(){if(k<text.length){k++;el.textContent=text.slice(0,k);setTimeout(t,ms);}else res();})();});}
  function fadeIn(el,text){el.textContent=text;el.style.opacity='0';el.style.transition='opacity .25s';requestAnimationFrame(function(){el.style.opacity='1';});return sleep(120);}
  function msg(cls,html){var m=document.createElement('div');m.className='xb-msg '+cls;m.innerHTML=html;msgs.appendChild(m);msgs.scrollTop=msgs.scrollHeight;return m;}
  function toolLine(txt){var m=msg('xb-tool busy','<i></i><span>'+txt+'</span>');return m;}
  function clickOrWait(el,ms){return new Promise(function(res){var done=false;function go(){if(done)return;done=true;el.removeEventListener('click',go);res();}el.addEventListener('click',go);setTimeout(go,ms);});}
  function flyout(show,mode){ fly.classList.toggle('on',show); flyApp.className='xb-flyapp'+(mode?' '+mode:''); }

  async function choose(field,list,pick){
    field.classList.add('focus'); opts.innerHTML=list.map(function(x){ return '<span'+(x===pick?' data-pick':'')+'>'+x+'</span>'; }).join('');
    opts.style.top=(field.offsetTop+field.offsetHeight+4)+'px'; opts.className='xb-opts on'; await sleep(380);
    var el=opts.querySelector('[data-pick]'); el.classList.add('hover'); await sleep(260);
    field.textContent=pick; field.classList.add('set'); opts.className='xb-opts'; field.classList.remove('focus'); await sleep(220);
  }
  async function chooseMany(field,list,picks){
    field.classList.add('focus'); opts.innerHTML=list.map(function(x){ return '<span class="xb-chk" data-v="'+x+'"><i></i>'+x+'</span>'; }).join('');
    opts.style.top=(field.offsetTop+field.offsetHeight+4)+'px'; opts.className='xb-opts on'; await sleep(350);
    var chosen=[];
    for(var i=0;i<picks.length;i++){ var el=opts.querySelector('[data-v="'+picks[i]+'"]'); el.classList.add('hover'); await sleep(220); el.classList.add('on'); el.classList.remove('hover'); chosen.push(picks[i]);
      field.innerHTML=chosen.map(function(c){ return '<em class="xb-tagchip">'+c+'</em>'; }).join(''); field.classList.add('set'); await sleep(220); }
    await sleep(150); opts.className='xb-opts'; field.classList.remove('focus'); await sleep(200);
  }
  function cursorTo(el,fx,fy,instant){
    var r=el.getBoundingClientRect(), o=root.getBoundingClientRect();
    cur.style.transition=instant?'none':'transform .75s cubic-bezier(.45,.05,.25,1)';
    cur.style.transform='translate('+(r.left-o.left+r.width*fx)+'px,'+(r.top-o.top+r.height*fy)+'px)';
    return sleep(instant?0:800);
  }
  function persona(p){
    var build=p==='build';
    root.classList.toggle('use',!build);
    var av=MEDIA+(build?'av-mike.jpg':'av-jen.jpg');
    navAv.src=av; whoAv.src=av;
    whoName.textContent=build?'Mike Kowalski':'Jen Okafor';
    whoRole.textContent=build?'Operations manager · building it in Builder':'Customer service · using the published app';
    step.textContent=build?'1 of 2':'2 of 2';
    who.classList.toggle('use',!build);
    railArchie.classList.toggle('on',build); railSales.classList.toggle('on',!build);
    crumb.textContent=build?'Builder':'Sales';
  }
  var accepted=false, cycleId=0;
  function selectable(){return table.querySelectorAll('.xf-t:not(.hdr):not(.skip)').length;}
  function renderTable(){
    table.innerHTML='<div class="xf-t hdr"><span>Item · qty</span><span>Current due</span><span></span><span>Requested</span><span>Job status</span><span></span></div>';
    return ROWS.map(function(r){
      var t=document.createElement('div'); t.className='xf-t';
      t.innerHTML='<span>'+r[0]+' · '+r[1]+' pcs<span class="ls">Job '+r[2]+' · '+r[3]+'</span></span><span class="cur">'+r[4]+'</span><span class="arrow"></span><span class="new"></span><span class="rec"></span><span class="st"></span>';
      t.addEventListener('click',function(){ if(accepted||accept.disabled) return; t.classList.toggle('skip'); var n=selectable(); accept.textContent='Update '+n+' due date'+(n===1?'':'s'); status.textContent=n+' of 7 selected. Nothing changes until you accept.'; });
      table.appendChild(t); return t; });
  }
  async function applyChanges(id){
    if(accepted||id!==cycleId) return; accepted=true;
    var trows=[].slice.call(table.querySelectorAll('.xf-t:not(.hdr)'));
    accept.classList.remove('pulse'); accept.disabled=true; accept.textContent='Updating…'; status.textContent='Writing due dates to Fulcrum…';
    var applied=0; for(var i=0;i<trows.length;i++){ if(trows[i].classList.contains('skip')) continue; trows[i].classList.add('applied'); applied++; await sleep(170); }
    platform.classList.add('live');
    var plats=platform.querySelectorAll('.xf-plat'); for(var k=0;k<plats.length;k++){ plats[k].classList.add('on'); await sleep(260); }
    accept.textContent=applied+' due date'+(applied===1?'':'s')+' updated'; accept.classList.add('done');
    status.textContent='Done. 5 due dates updated. 2 unchanged, with suggested dates to send Acme.'; status.classList.add('ok');
  }
  function reset(){
    accepted=false; persona('build');
    title.textContent='Untitled page'; badge.hidden=true; badge.className='xb-badge';
    publish.hidden=true; undo.hidden=true; publish.classList.remove('pulse','done','open'); flyout(false);
    pop.classList.remove('on'); cur.classList.remove('on','click'); popNav.textContent='Don’t show'; popNav.classList.remove('set','focus'); popRoles.innerHTML='All roles'; popRoles.classList.remove('set','focus'); popGo.classList.remove('pulse'); popLive.textContent='None'; opts.className='xb-opts'; opts.innerHTML='';
    empty.classList.remove('off'); skel.classList.remove('on'); app.classList.remove('on');
    msgs.innerHTML='<div class="xb-ph"><b>Describe what you want and I’ll build it.</b><span>e.g. “Show me open jobs grouped by status with a due-date filter.”</span></div>';
    input.textContent=''; send.classList.remove('pulse');
    file.classList.remove('in'); zone.classList.remove('hot'); intake.classList.remove('off'); result.classList.remove('on');
    headMeta.textContent='Bring in a customer’s requested dates and update the jobs you agree to'; count.hidden=true; chipMeta.textContent='Reading…';
    status.textContent='Nothing changes until you accept.'; status.classList.remove('ok');
    accept.disabled=true; accept.classList.remove('pulse','done'); accept.textContent='Update due dates';
    platform.classList.remove('live'); [].forEach.call(platform.querySelectorAll('.xf-plat'),function(p){p.classList.remove('on');});
    renderTable();
  }
  async function cycle(){
    var id=++cycleId; var live=function(){return id===cycleId;};
    reset();
    /* 1 · Mike describes the app to Archie in Builder */
    await sleep(700); if(!live()) return;
    await typeChars(input,PROMPT,11); if(!live()) return;
    send.classList.add('pulse'); await sleep(500); if(!live()) return;
    send.classList.remove('pulse'); input.textContent='';
    msgs.innerHTML=''; msg('xb-user','<span class="xb-bubble">'+PROMPT+'</span><i class="xb-mav"><img src="'+MEDIA+'av-mike.jpg" alt="" width="22" height="22"></i>');
    await sleep(500); if(!live()) return;
    empty.classList.add('off'); skel.classList.add('on'); badge.hidden=false; badge.textContent='Building…';
    var steps=['Reading sales orders, lines and jobs','Matching each line to its job and scheduled finish','Adding a file drop zone and an Update due dates action'];
    for(var s=0;s<steps.length;s++){ var l=toolLine(steps[s]); await sleep(900); if(!live()) return; l.className='xb-msg xb-tool done'; }
    skel.classList.remove('on'); app.classList.add('on');
    title.textContent='Customer date changes'; badge.textContent='Unpublished'; badge.className='xb-badge draft';
    msg('xb-agent','<span class="xb-saved">✓ Saved v1</span><span class="xb-tx">▸ Tool transcript (9)</span><p>Done. It matches each row in the file to its sales order line and job, and only updates the lines you accept. Publish it when you’re ready.</p>');
    publish.hidden=false; undo.hidden=false;
    await sleep(1300); if(!live()) return;
    publish.classList.add('pulse'); await clickOrWait(publish,1800); if(!live()) return;
    publish.classList.remove('pulse'); publish.classList.add('open'); pop.classList.add('on'); await sleep(450); if(!live()) return;
    await choose(popNav,['Don’t show','Sales','Purchasing','Production','Scheduling'],'Sales'); if(!live()) return;
    await chooseMany(popRoles,['Customer Service','Sales','Production','Purchasing','Accounting'],['Sales','Customer Service']); if(!live()) return;
    popGo.classList.add('pulse'); await clickOrWait(popGo,900); if(!live()) return;
    popGo.classList.remove('pulse'); popLive.textContent='v1'; await sleep(350); pop.classList.remove('on'); publish.classList.remove('open');
    badge.textContent='Published'; badge.className='xb-badge live';
    msg('xb-agent','<p>Published v1 to the <b>Sales</b> menu. Visible to <b>Sales</b> and <b>Customer Service</b>.</p>');
    await sleep(1000); if(!live()) return;
    /* 2 · the app is opened from the Sales menu and used */
    cur.classList.add('on'); cursorTo(canvasEl,.55,.45,true); await sleep(500); if(!live()) return;
    await cursorTo(railSales,.5,.5); railSales.classList.add('peek'); flyout(true,'shown'); await sleep(500); if(!live()) return;
    await cursorTo(flyApp,.35,.5); flyApp.classList.add('pick'); await sleep(350); if(!live()) return;
    cur.classList.add('click'); await sleep(250); cur.classList.remove('click');
    flyout(false); railSales.classList.remove('peek');
    persona('use'); badge.hidden=true; publish.hidden=true; undo.hidden=true; title.textContent='Customer date changes';
    await cursorTo(zone,.62,.7); if(!live()) return; await sleep(500); if(!live()) return;
    cur.classList.remove('on');
    file.classList.add('in'); await sleep(700); if(!live()) return;
    zone.classList.add('hot'); await sleep(700); if(!live()) return;
    intake.classList.add('off'); result.classList.add('on'); headMeta.textContent='Reading acme-requested-dates.xlsx…'; await sleep(900); if(!live()) return;
    chipMeta.textContent='7 rows · matched to sales order 48812 · Acme'; headMeta.textContent='Sales order 48812 · Acme'; count.hidden=false; count.textContent='0 of 7 read';
    var trows=table.querySelectorAll('.xf-t:not(.hdr)');
    for(var i=0;i<trows.length;i++){ if(!live()) return; var r=ROWS[i];
      trows[i].classList.add('in'); await sleep(140); trows[i].querySelector('.cur').classList.add('old'); trows[i].querySelector('.arrow').textContent='→';
      await fadeIn(trows[i].querySelector('.new'),r[5]);
      var rec=trows[i].querySelector('.rec'); rec.className='rec '+r[6]; rec.innerHTML=(r[6]==='ok'?'On track':'Suggest '+r[8])+'<small>· '+r[7]+'</small>';
      if(r[6]==='no') trows[i].classList.add('skip'); count.textContent=(i+1)+' of 7 read'; await sleep(220); }
    status.textContent='5 of 7 selected. 2 items can’t make the requested date, so it suggests the earliest date that works.'; accept.disabled=false; accept.classList.add('pulse'); accept.textContent='Update 5 due dates';
    var t=0; while(t<4200 && !accepted && live()){ await sleep(100); t+=100; }
    if(!live()) return;
    if(!accepted) await applyChanges(id);
    await sleep(5600); if(!live()) return;
    cycle();
  }
  accept.addEventListener('click',function(){ if(!accept.disabled) applyChanges(cycleId); });
  reject.addEventListener('click',function(){ if(accepted||accept.disabled) return; cycleId++; accepted=true; status.textContent='Cleared. Nothing was written to Fulcrum.'; accept.disabled=true; accept.classList.remove('pulse'); setTimeout(cycle,2600); });
  reset();
  if('IntersectionObserver' in window){ var io=new IntersectionObserver(function(es){ if(es.some(function(e){ return e.isIntersecting; })){ io.disconnect(); cycle(); } },{threshold:.25}); io.observe(root); } else cycle();
})();
(function(){
  /* Hero scripted demo: six builds, six different interfaces. Sample data only. */
  function esc(s){ return String(s); }
  var STATES=[
    {w:'sales', page:'Quote hit rate', prompt:'Build a quote hit-rate board by customer for the last 12 months, with a drill-in to the quotes we lost.',
     log:['Reading quotes and sales orders from your Fulcrum','Grouping 1,284 quotes by customer and outcome','Laying out the board with a drill-in per customer'],
     done:'Lost quotes open', sum:'18 lost quotes listed for Copperline Machine. Top reason: lead time.', logDone:'Opened the 18 lost quotes with the reason logged on each one.',
     render:function(){
       var rows=[['Crestline Aero',68],['Harbor Dynamics',54],['Summit Fabrication',47],['Copperline Machine',41]];
       var C=2*Math.PI*54;
       return '<div class="sa"><div class="sa-ring"><svg viewBox="0 0 128 128" width="150" height="150"><circle cx="64" cy="64" r="54" fill="none" stroke="#e8effd" stroke-width="14"/><circle class="sa-arc" cx="64" cy="64" r="54" fill="none" stroke="#1d63ed" stroke-width="14" stroke-linecap="round" stroke-dasharray="'+C+'" stroke-dashoffset="'+(C*(1-.48))+'" transform="rotate(-90 64 64)"/></svg><div class="sa-ring-t"><b>48<em>%</em></b><small>quotes won</small></div><div class="sa-ring-k"><span><b>612</b> won</span><span><b>$2.1M</b> lost</span></div></div>'
       +'<div class="sa-bars">'+rows.map(function(r,i){ return '<div class="sa-row" data-i="'+i+'"><div class="sa-l"><span>'+r[0]+'</span><b>'+r[1]+'%</b></div><div class="sa-track"><i style="width:'+r[1]+'%"></i></div></div>'; }).join('')
       +'<div class="sa-drill"><div class="sa-drill-h"><b>Copperline Machine</b><span>18 lost · $412K</span></div><div class="sa-tiles"><div><b>11</b><small>lead time</small></div><div><b>5</b><small>price</small></div><div><b>2</b><small>no reply</small></div></div></div></div>'
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
       var rows=[['Midwest Steel','PO 7781',0,46,true,'4 d late'],['Allied Fasteners','PO 7790',10,41,true,'2 d late'],['Lakeshore Metals','PO 7765',18,38,true,'1 d late'],['Tallgrass Tool','PO 7802',22,62,false,'Fri'],['Northfield Castings','PO 7810',30,90,false,'next Thu']];
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
