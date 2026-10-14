/* Archie Builder page · act panel v19 (Oct 14 pm): the five-places card covers the whole panel (no product chrome behind it). v18: the published app opens in a fresh page load for Jen, and the write-back moves the board (dates swap in, a progress strip fills, rows re-sort by their new dates). v17: Jen's cursor ticks each line as it lands and clicks Update itself. v16: the Fulcrum nav with labels replaces the icon rail, and the accepted click fans out to five places in Fulcrum.
   Loaded before builder-page.js; supersedes the act-panel section there. CSS: act-nav.css */
document.addEventListener("DOMContentLoaded",function(){
(function(){
  /* Act panel, laid out like the real Builder: the Fulcrum nav on the left, the app preview in the middle,
     the authoring chat on the right. Mike builds and publishes it to the Sales menu; Jen opens it there and uses it.
     One accepted click then lands in five places in Fulcrum. */
  var root=document.getElementById('xf'); if(!root) return;
  root.id='xfAct'; /* builder-page.js v15 looks for #xf at DOMContentLoaded and now leaves this panel alone */
  var MEDIA='https://fulcrumpro.github.io/web-embeds/archie-builder/media/';
  function ico(d){ return '<svg viewBox="0 0 24 24" aria-hidden="true">'+d+'</svg>'; }
  var I={
    archie:'<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/>',
    sales:'<circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/>',
    purchasing:'<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
    production:'<path d="M12 16h.01"/><path d="M16 16h.01"/><path d="M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"/><path d="M8 16h.01"/>',
    scheduling:'<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    quality:'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    warehouse:'<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
    accounting:'<rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>',
    items:'<path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"/><path d="m7 16.5-4.74-2.85"/><path d="m7 16.5 5-3"/><path d="M7 16.5v5.17"/><path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"/><path d="m17 16.5-5-3"/><path d="m17 16.5 4.74-2.85"/><path d="M17 16.5v5.17"/><path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"/><path d="M12 8 7.26 5.15"/><path d="m12 8 4.74-2.85"/><path d="M12 13.5V8"/>',
    reporting:'<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
    live:'<path d="M3 5h.01"/><path d="M3 12h.01"/><path d="M3 19h.01"/><path d="M8 5h13"/><path d="M8 12h13"/><path d="M8 19h13"/>',
    jobs:'<path d="M12 16h.01"/><path d="M16 16h.01"/><path d="M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"/><path d="M8 16h.01"/>',
    note:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h4"/>',
    order:'<rect width="18" height="14" x="3" y="5" rx="2"/><path d="M3 10h18"/><path d="M8 15h4"/>',
    floor:'<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 11l3-3 3 3 4-4"/>'
  };
  var NAV=[
    ['archie','Archie',['Chat','Builder','Agents']],
    ['sales','Sales',['Quotes','Sales orders','Customers']],
    ['purchasing','Purchasing'],['production','Production'],['scheduling','Scheduling'],['quality','Quality'],
    ['warehouse','Warehouse'],['accounting','Accounting'],['items','Items &amp; Inventory'],['reporting','Reporting'],['live','Live']
  ];
  root.className='panel xb';
  root.setAttribute('aria-label','A Builder app, simulated on sample data: Mike describes it to Archie in Builder and publishes it to the Sales menu, then Jen in customer service opens it from that menu, drops in a customer’s spreadsheet of requested dates and accepts five of them. One click updates the jobs, the schedule, the sales order, the job notes and the shop floor.');
  root.innerHTML=
    '<div class="xb-nav" aria-hidden="true">'
    +'<div class="xb-nav-logo"><svg viewBox="0 0 24 24"><path d="M4 20 14 4h3L7 20H4zm7 0L21 4h-3L8 20h3z" fill="#fff"/></svg>fulcrum</div>'
    +'<div class="xb-nav-menu">'
    +NAV.map(function(n){
      var subs=(n[2]||[]).map(function(s){ return '<span'+(s==='Builder'?' class="on" id="xbNavBuilder"':'')+'>'+s+'</span>'; }).join('');
      if(n[0]==='sales') subs+='<span class="xb-nsapp" id="xbFlyApp">Customer date changes</span>';
      return '<div class="xb-ni'+(n[0]==='archie'?' on open':'')+'" id="xbNav-'+n[0]+'"><div class="xb-nl">'+ico(I[n[0]])+'<span>'+n[1]+'</span><i class="xb-chev"></i></div>'+(subs?'<div class="xb-ns">'+subs+'</div>':'')+'</div>';
    }).join('')
    +'</div>'
    +'<div class="xb-nav-user"><span class="xb-rav"><img id="xbNavAv" src="'+MEDIA+'av-mike.jpg" alt="" width="28" height="28"></span><span id="xbNavName">M. Kowalski</span></div>'
    +'</div>'
    +'<span class="xb-cur" id="xbCur" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 2l15 11.5-6.6 1.1 3.9 7.6-2.9 1.4-3.8-7.7L4 20.7z"/></svg></span>'
    +'<div class="xb-main">'
    +  '<div class="xb-reload" id="xbReload" aria-hidden="true"><i id="xbReloadBar"></i><span><b></b>Opening Customer date changes…</span></div>'
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
    +        '<div class="xb-strip" id="xbStrip" aria-hidden="true"><span>Writing due dates to Fulcrum</span><span class="xb-bar"><i id="xbStripBar"></i></span><span><b id="xbStripN">0</b> of 5 written</span></div>'
    +        '<div class="xf-table" id="xbTable"></div>'
    +        '<div class="xf-actions"><span class="xf-status" id="xbStatus"></span><div><button class="xf-reject" id="xbReject" type="button">Clear</button><button class="xf-accept" id="xbAccept" type="button" disabled>Update due dates</button></div></div>'
    +        '</div>'
    +      '</div>'
    +    '</div>'
    +    '<div class="xb-tag">Simulated on sample data</div>'
    +    '</div>'
    +    '<div class="xb-chat" id="xbChat">'
    +      '<div class="xb-tabs"><span class="on">Chat</span><span>Versions</span></div>'
    +      '<div class="xb-msgs" id="xbMsgs"></div>'
    +      '<div class="xb-compose"><div class="xb-input" id="xbInput"></div><div class="xb-cbar">'+ico('<path d="M21 11.5l-8.6 8.6a5 5 0 0 1-7.1-7.1l8.6-8.6a3.3 3.3 0 0 1 4.7 4.7l-8.6 8.6a1.7 1.7 0 0 1-2.4-2.4l7.9-7.9"/>')+'<span class="xb-send" id="xbSend">Send</span></div></div>'
    +    '</div>'
    +  '</div>'
    +'</div>'
    /* the five-places card is NOT a product screen: it covers the whole panel, nav and header included */
    +'<div class="xb-five" id="xbFive" aria-hidden="true">'
    +  '<div class="xb-five-h"><b>One click. Five places.</b><span>Jen accepted five dates. Fulcrum did the rest.</span></div>'
    +  '<div class="xb-five-g">'
    +    '<div class="xb-fp" data-nav="production"><i>'+ico(I.jobs)+'</i><b>Jobs</b><span>5 due dates changed</span></div>'
    +    '<div class="xb-fp" data-nav="scheduling"><i>'+ico(I.scheduling)+'</i><b>Schedule</b><span>Rebuilt around the new dates</span></div>'
    +    '<div class="xb-fp" data-nav="sales"><i>'+ico(I.order)+'</i><b>Sales order 48812</b><span>5 lines updated</span></div>'
    +    '<div class="xb-fp" data-nav="production"><i>'+ico(I.note)+'</i><b>Job notes</b><span>5 added · J. Okafor</span></div>'
    +    '<div class="xb-fp" data-nav="live"><i>'+ico(I.floor)+'</i><b>Shop floor</b><span>Travelers show the new dates</span></div>'
    +  '</div>'
    +  '<div class="xb-five-f">Nothing re-keyed. Nothing exported.</div>'
    +'</div>'
    ;

  var ROWS=[["Mounting bracket","120","4856","In progress","Oct 24","Oct 15","ok","Scheduled finish Oct 14"],["Hinge plate","80","4857","In progress","Oct 24","Oct 15","ok","Scheduled finish Oct 14"],["Valve body","40","4861","Material due Oct 9","Oct 28","Oct 17","ok","Scheduled finish Oct 16"],["Pump housing","25","4870","Outside: anodize","Nov 4","Oct 22","no","Back from anodize Oct 27","Oct 29"],["Pump cover","25","4871","Outside: anodize","Nov 4","Oct 22","no","Back from anodize Oct 27","Oct 29"],["Drive shaft","60","4880","Not started","Oct 31","Nov 14","ok","Later than current due"],["Bearing cap","150","4902","Complete, awaiting ship","Oct 21","Oct 14","ok","Can ship now"]];
  var PROMPT='Make a page where we drop in a customer’s file of requested dates, match each line to its job, show the job’s status, and update the due dates on the lines we accept.';
  var q=function(id){return document.getElementById(id);};
  var cur=q('xbCur'), canvasEl=root.querySelector('.xb-canvas'), navArchie=q('xbNav-archie'), navSales=q('xbNav-sales'), navBuilder=q('xbNavBuilder'), flyApp=q('xbFlyApp'), navAv=q('xbNavAv'), navName=q('xbNavName');
  var crumb=q('xbCrumb'), title=q('xbTitle'), badge=q('xbBadge'), publish=q('xbPublish'), undo=q('xbUndo'), pop=q('xbPop'), popNav=q('xbPopNav'), popRoles=q('xbPopRoles'), opts=q('xbOpts'), popGo=q('xbPopGo'), popLive=q('xbPopLive');
  var empty=q('xbEmpty'), skel=q('xbSkel'), app=q('xbApp'), headMeta=q('xbHeadMeta'), count=q('xbCount'), zone=q('xbZone'), file=q('xbFile'), table=q('xbTable'), intake=q('xbIntake'), result=q('xbResult'), chipMeta=q('xbChipMeta');
  var status=q('xbStatus'), accept=q('xbAccept'), reject=q('xbReject'), five=q('xbFive'), fps=[].slice.call(five.querySelectorAll('.xb-fp'));
  var who=q('xbWho'), whoAv=q('xbWhoAv'), whoName=q('xbWhoName'), whoRole=q('xbWhoRole'), step=q('xbStep');
  var chat=q('xbChat'), msgs=q('xbMsgs'), input=q('xbInput'), send=q('xbSend');
  var reload=q('xbReload'), reloadBar=q('xbReloadBar'), strip=q('xbStrip'), stripBar=q('xbStripBar'), stripN=q('xbStripN');
  function sleep(ms){return new Promise(function(r){setTimeout(r,ms);});}
  function typeChars(el,text,ms){return new Promise(function(res){var k=0;el.textContent='';(function t(){if(k<text.length){k++;el.textContent=text.slice(0,k);setTimeout(t,ms);}else res();})();});}
  function fadeIn(el,text){el.textContent=text;el.style.opacity='0';el.style.transition='opacity .25s';requestAnimationFrame(function(){el.style.opacity='1';});return sleep(120);}
  function msg(cls,html){var m=document.createElement('div');m.className='xb-msg '+cls;m.innerHTML=html;msgs.appendChild(m);msgs.scrollTop=msgs.scrollHeight;return m;}
  function toolLine(txt){var m=msg('xb-tool busy','<i></i><span>'+txt+'</span>');return m;}
  function clickOrWait(el,ms){return new Promise(function(res){var done=false;function go(){if(done)return;done=true;el.removeEventListener('click',go);res();}el.addEventListener('click',go);setTimeout(go,ms);});}
  function ping(key){ var n=q('xbNav-'+key); if(!n) return; n.classList.add('ping'); setTimeout(function(){ n.classList.remove('ping'); },1100); }

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
  function cursorTo(el,fx,fy,instant,ms){
    ms=ms||750;
    var r=el.getBoundingClientRect(), o=root.getBoundingClientRect();
    cur.style.transition=instant?'none':'transform '+ms+'ms cubic-bezier(.45,.05,.25,1)';
    cur.style.transform='translate('+(r.left-o.left+r.width*fx)+'px,'+(r.top-o.top+r.height*fy)+'px)';
    return sleep(instant?0:ms+50);
  }
  async function click(){ cur.classList.add('click'); await sleep(170); cur.classList.remove('click'); }
  function persona(p){
    var build=p==='build';
    root.classList.toggle('use',!build);
    var av=MEDIA+(build?'av-mike.jpg':'av-jen.jpg');
    navAv.src=av; whoAv.src=av; navName.textContent=build?'M. Kowalski':'J. Okafor';
    whoName.textContent=build?'Mike Kowalski':'Jen Okafor';
    whoRole.textContent=build?'Operations manager · building it in Builder':'Customer service · using the published app';
    step.textContent=build?'1 of 2':'2 of 2';
    who.classList.toggle('use',!build);
    navArchie.classList.toggle('on',build); navArchie.classList.toggle('open',build); navBuilder.classList.toggle('on',build);
    navSales.classList.toggle('on',!build); navSales.classList.toggle('open',!build);
    if(!build) flyApp.className='xb-nsapp on';
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
    var live=function(){return id===cycleId;};
    var trows=[].slice.call(table.querySelectorAll('.xf-t:not(.hdr)'));
    accept.classList.remove('pulse'); accept.disabled=true; accept.textContent='Updating…'; status.textContent='Writing due dates to Fulcrum…';
    var todo=trows.filter(function(t){ return !t.classList.contains('skip'); });
    strip.classList.add('on'); stripN.textContent='0'; stripBar.style.width='4%'; await sleep(350); if(!live()) return;
    /* each accepted line is written: the requested date slides into the due-date column, the row turns green, the strip fills */
    var applied=0;
    for(var i=0;i<todo.length;i++){ if(!live()) return; var t=todo[i], r=ROWS[trows.indexOf(t)];
      var curEl=t.querySelector('.cur'), newEl=t.querySelector('.new'), arrow=t.querySelector('.arrow');
      t.classList.add('writing'); await sleep(120);
      curEl.classList.add('swap-out'); await sleep(170);
      curEl.textContent=r[5]; curEl.classList.remove('old','swap-out'); curEl.classList.add('swap-in');
      arrow.textContent=''; newEl.innerHTML='<span class="xb-written">✓ Written</span>';
      t.classList.remove('writing'); t.classList.add('applied'); applied++;
      stripN.textContent=String(applied); stripBar.style.width=(applied/todo.length*100)+'%';
      await sleep(260); }
    /* the board re-sorts by the new due dates: rows glide to where they now belong */
    await sleep(320); if(!live()) return;
    await resort(trows); if(!live()) return;
    count.textContent=applied+' updated · 2 held';
    accept.textContent=applied+' due date'+(applied===1?'':'s')+' updated'; accept.classList.add('done');
    status.textContent='Done. 5 due dates updated. 2 unchanged, with suggested dates to send Acme.'; status.classList.add('ok');
    /* one click, five places: the write-back fans out across Fulcrum, and the nav shows where it went */
    await sleep(1200); if(!live()) return;
    five.classList.add('on'); await sleep(350);
    for(var k=0;k<fps.length;k++){ if(!live()) return; fps[k].classList.add('in'); await sleep(200); }
    await sleep(350);
    for(var m=0;m<fps.length;m++){ if(!live()) return; fps[m].classList.add('on'); ping(fps[m].getAttribute('data-nav')); await sleep(420); }
  }
  function dateKey(s){ var m=/^(\w{3}) (\d+)/.exec(s||''); if(!m) return 9999; return ({Oct:10,Nov:11,Dec:12}[m[1]]||13)*100+parseInt(m[2],10); }
  async function resort(trows){
    var first=trows.map(function(t){ return t.getBoundingClientRect().top; });
    var order=trows.map(function(t,i){ return {t:t,i:i,k:dateKey(t.querySelector('.cur').textContent)}; }).sort(function(a,b){ return a.k-b.k||a.i-b.i; });
    order.forEach(function(o){ table.appendChild(o.t); });
    order.forEach(function(o){ var d=first[o.i]-o.t.getBoundingClientRect().top; if(d&&o.t.animate) o.t.animate([{transform:'translateY('+d+'px)'},{transform:'none'}],{duration:560,easing:'cubic-bezier(.2,.8,.2,1)'}); });
    await sleep(620);
  }
  function reset(){
    accepted=false; persona('build');
    reload.classList.remove('on'); reloadBar.style.transition='none'; reloadBar.style.width='0'; reloadBar.offsetWidth; reloadBar.style.transition='';
    strip.classList.remove('on'); stripBar.style.width='0'; stripN.textContent='0';
    title.textContent='Untitled page'; badge.hidden=true; badge.className='xb-badge';
    publish.hidden=true; undo.hidden=true; publish.classList.remove('pulse','done','open');
    navSales.classList.remove('on','open','peek'); flyApp.className='xb-nsapp';
    pop.classList.remove('on'); cur.classList.remove('on','click'); popNav.textContent='Don’t show'; popNav.classList.remove('set','focus'); popRoles.innerHTML='All roles'; popRoles.classList.remove('set','focus'); popGo.classList.remove('pulse'); popLive.textContent='None'; opts.className='xb-opts'; opts.innerHTML='';
    empty.classList.remove('off'); skel.classList.remove('on'); app.classList.remove('on');
    five.classList.remove('on'); fps.forEach(function(f){ f.classList.remove('in','on'); });
    msgs.innerHTML='<div class="xb-ph"><b>Describe what you want and I’ll build it.</b><span>e.g. “Show me open jobs grouped by status with a due-date filter.”</span></div>';
    input.textContent=''; send.classList.remove('pulse');
    file.classList.remove('in'); zone.classList.remove('hot'); intake.classList.remove('off'); result.classList.remove('on');
    headMeta.textContent='Bring in a customer’s requested dates and update the jobs you agree to'; count.hidden=true; chipMeta.textContent='Reading…';
    status.textContent='Nothing changes until you accept.'; status.classList.remove('ok');
    accept.disabled=true; accept.classList.remove('pulse','done'); accept.textContent='Update due dates';
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
    /* the app shows up in the Sales menu, where the whole team will find it */
    navSales.classList.add('open'); flyApp.className='xb-nsapp new';
    msg('xb-agent','<p>Published v1 to the <b>Sales</b> menu. Visible to <b>Sales</b> and <b>Customer Service</b>.</p>');
    await sleep(1400); if(!live()) return;
    /* 2 · Jen opens it from the Sales menu and uses it */
    cur.classList.add('on'); cursorTo(canvasEl,.55,.45,true); await sleep(500); if(!live()) return;
    await cursorTo(navSales.querySelector('.xb-nl'),.45,.5); navSales.classList.add('peek'); await sleep(450); if(!live()) return;
    await cursorTo(flyApp,.45,.5); flyApp.className='xb-nsapp shown pick'; await sleep(350); if(!live()) return;
    cur.classList.add('click'); await sleep(250); cur.classList.remove('click');
    navSales.classList.remove('peek');
    /* the page reloads: Jen's browser opens the published app fresh, nothing of Mike's build session carries over */
    reload.classList.add('on'); reloadBar.style.width='30%'; await sleep(450); if(!live()) return;
    persona('use'); publish.hidden=true; undo.hidden=true; title.textContent='Customer date changes';
    badge.hidden=false; badge.textContent='v1 · Live'; badge.className='xb-badge live';
    reloadBar.style.width='78%'; await sleep(420); if(!live()) return;
    reloadBar.style.width='100%'; await sleep(240); if(!live()) return;
    reload.classList.remove('on'); await sleep(380); if(!live()) return;
    await cursorTo(zone,.62,.7); if(!live()) return; await sleep(500); if(!live()) return;
    file.classList.add('in'); await sleep(700); if(!live()) return;
    zone.classList.add('hot'); await sleep(700); if(!live()) return;
    intake.classList.add('off'); result.classList.add('on'); headMeta.textContent='Reading acme-requested-dates.xlsx…'; await sleep(900); if(!live()) return;
    chipMeta.textContent='7 rows · matched to sales order 48812 · Acme'; headMeta.textContent='Sales order 48812 · Acme'; count.hidden=false; count.textContent='0 of 7 read';
    var trows=table.querySelectorAll('.xf-t:not(.hdr)'), picks=0;
    for(var i=0;i<trows.length;i++){ if(!live()) return; var r=ROWS[i];
      trows[i].classList.add('in'); await sleep(140); trows[i].querySelector('.cur').classList.add('old'); trows[i].querySelector('.arrow').textContent='→';
      await fadeIn(trows[i].querySelector('.new'),r[5]);
      var rec=trows[i].querySelector('.rec'); rec.className='rec '+r[6]; rec.innerHTML=(r[6]==='ok'?'On track':'Suggest '+r[8])+'<small>· '+r[7]+'</small>';
      count.textContent=(i+1)+' of 7 read';
      /* Jen reviews each line as it lands: a tick for the ones she accepts, a pass on the two that can't make the date */
      await cursorTo(trows[i].querySelector('.st'),.5,.5,false,320); if(!live()) return;
      if(r[6]==='no'){ trows[i].classList.add('skip'); await sleep(260); }
      else { await click(); trows[i].classList.add('pick'); picks++; status.textContent=picks+' of 7 selected. Nothing changes until you accept.'; await sleep(120); } }
    status.textContent='5 of 7 selected. 2 items can’t make the requested date, so it suggests the earliest date that works.'; accept.disabled=false; accept.classList.add('pulse'); accept.textContent='Update 5 due dates';
    await sleep(500); if(!live()) return;
    await cursorTo(accept,.5,.55,false,650); if(!live()) return;
    if(!accepted){ await click(); if(!live()) return; applyChanges(id); }
    await sleep(500); cur.classList.remove('on');
    while(!five.classList.contains('on') && live()) await sleep(100);
    await sleep(6500); if(!live()) return;
    cycle();
  }
  accept.addEventListener('click',function(){ if(!accept.disabled) applyChanges(cycleId); });
  reject.addEventListener('click',function(){ if(accepted||accept.disabled) return; cycleId++; accepted=true; status.textContent='Cleared. Nothing was written to Fulcrum.'; accept.disabled=true; accept.classList.remove('pulse'); setTimeout(cycle,2600); });
  reset();
  if('IntersectionObserver' in window){ var io=new IntersectionObserver(function(es){ if(es.some(function(e){ return e.isIntersecting; })){ io.disconnect(); cycle(); } },{threshold:.25}); io.observe(root); } else cycle();
})();

});
