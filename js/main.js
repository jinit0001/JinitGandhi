(function(){
  var D=document, root=D.documentElement;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var native='onpageswap' in window;
  var touch=matchMedia('(hover: none)').matches;
  if(native) root.classList.add('vt-native');
  var $=function(s,c){return (c||D).querySelector(s)}, $$=function(s,c){return [].slice.call((c||D).querySelectorAll(s))};

  /* ---- intro loader (first visit per tab) ---- */
  var loader=$('#loader');
  function ready(){ root.classList.add('ready'); }
  var seen=false; try{ seen=sessionStorage.getItem('seen')==='1'; }catch(e){}
  if(loader && !seen && !reduce){
    setTimeout(function(){ loader.classList.add('out'); setTimeout(ready,350); },1500);
    setTimeout(function(){ loader.style.display='none'; },2600);
    try{ sessionStorage.setItem('seen','1'); }catch(e){}
  } else { if(loader) loader.style.display='none'; ready(); }

  /* ---- scroll progress + header ---- */
  var bar=$('#progress'), hdr=$('header.site');
  function onScroll(){
    var h=D.body.scrollHeight-innerHeight, p=h>0?scrollY/h:0;
    if(bar) bar.style.transform='scaleX('+p+')';
    if(hdr) hdr.classList.toggle('scrolled',scrollY>8);
    $$('[data-speed]').forEach(function(el){ el.style.transform='translate3d(0,'+(scrollY*parseFloat(el.dataset.speed))+'px,0)'; });
  }
  onScroll(); addEventListener('scroll',onScroll,{passive:true});

  /* ---- mobile menu ---- */
  var burger=$('.burger'), links=$('.links');
  if(burger) burger.addEventListener('click',function(){ var o=links.classList.toggle('open'); burger.setAttribute('aria-expanded',o); });

  /* ---- split words for headings ---- */
  $$('.split').forEach(function(el){
    var i=0;
    (function walk(node){
      [].slice.call(node.childNodes).forEach(function(n){
        if(n.nodeType===3){
          var frag=D.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function(t){
            if(!t) return;
            if(/^\s+$/.test(t)){ frag.appendChild(D.createTextNode(' ')); return; }
            var w=D.createElement('span'); w.className='w';
            var s=D.createElement('span'); s.textContent=t; s.style.setProperty('--i',i++); w.appendChild(s); frag.appendChild(w);
          });
          node.replaceChild(frag,n);
        } else if(n.nodeType===1 && !n.classList.contains('w')) walk(n);
      });
    })(el);
  });

  /* ---- reveal on scroll ---- */
  var io=('IntersectionObserver' in window && !reduce)?new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:.12,rootMargin:'0px 0px -40px 0px'}):null;
  $$('.reveal,.timeline,.article h2').forEach(function(el,i){
    if(io){ if(el.classList.contains('reveal')) el.style.transitionDelay=((i%3)*90)+'ms'; io.observe(el); } else el.classList.add('in');
  });

  /* ---- counters ---- */
  var cio=('IntersectionObserver' in window && !reduce)?new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting) return; cio.unobserve(e.target);
      var el=e.target, to=+el.dataset.count, t0=performance.now(), dur=1400;
      (function tick(t){ var k=Math.min((t-t0)/dur,1), v=Math.round(to*(1-Math.pow(1-k,3))); el.textContent=v; if(k<1) requestAnimationFrame(tick); })(t0);
    });
  },{threshold:.5}):null;
  $$('[data-count]').forEach(function(el){ if(cio){ el.textContent='0'; cio.observe(el);} else el.textContent=el.dataset.count; });

  /* ---- rotating word ---- */
  var rot=$('#rotator');
  if(rot && !reduce){ var ws=rot.dataset.words.split('|'), wi=0; setInterval(function(){ wi=(wi+1)%ws.length; rot.innerHTML='<span>'+ws[wi]+'</span>'; },2200); }

  /* ---- cursor ---- */
  if(!touch && !reduce){
    var dot=D.createElement('div'), ring=D.createElement('div'); dot.className='cur-dot'; ring.className='cur-ring'; D.body.append(dot,ring);
    var mx=0,my=0,rx=0,ry=0;
    addEventListener('pointermove',function(e){ mx=e.clientX; my=e.clientY; root.classList.add('cur-on'); dot.style.transform='translate('+mx+'px,'+my+'px)';
      var g=$('.glow'); if(g){ g.style.left=mx+'px'; g.style.top=my+'px'; } },{passive:true});
    (function loop(){ rx+=(mx-rx)*.16; ry+=(my-ry)*.16; ring.style.transform='translate('+rx+'px,'+ry+'px)'; requestAnimationFrame(loop); })();
    D.addEventListener('pointerover',function(e){ root.classList.toggle('cur-hover',!!e.target.closest('a,button,.pill,input,textarea,label')); });
  }

  /* ---- magnetic buttons ---- */
  if(!touch && !reduce) $$('.btn,.logo').forEach(function(b){
    b.addEventListener('pointermove',function(e){ var r=b.getBoundingClientRect(); b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.18)+'px,'+((e.clientY-r.top-r.height/2)*.28)+'px)'; });
    b.addEventListener('pointerleave',function(){ b.style.transform=''; });
  });

  /* ---- 3D tilt + glare ---- */
  if(!touch && !reduce) $$('.tilt').forEach(function(c){
    var g=D.createElement('div'); g.className='glare'; c.appendChild(g);
    c.addEventListener('pointermove',function(e){
      var r=c.getBoundingClientRect(), x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height;
      c.style.transition='transform .08s'; c.style.transform='perspective(900px) rotateX('+((.5-y)*9)+'deg) rotateY('+((x-.5)*11)+'deg) translateZ(8px)';
      g.style.setProperty('--gx',x*100+'%'); g.style.setProperty('--gy',y*100+'%');
    });
    c.addEventListener('pointerleave',function(){ c.style.transition='transform .6s cubic-bezier(.2,.8,.2,1)'; c.style.transform=''; });
  });

  /* ---- hero art follows the mouse ---- */
  var art=$('.hero-art');
  if(art && !touch && !reduce){
    addEventListener('pointermove',function(e){
      var x=(e.clientX/innerWidth-.5), y=(e.clientY/innerHeight-.5);
      $$('[data-depth]',art).forEach(function(el){ var d=+el.dataset.depth; el.style.translate=(x*d)+'px '+(y*d)+'px'; });
    },{passive:true});
  }

  /* ---- copy email ---- */
  $$('[data-copy]').forEach(function(b){ b.addEventListener('click',function(){
    var t=b.dataset.copy, toast=$('.toast');
    function show(m){ if(!toast) return; toast.textContent=m; toast.classList.add('show'); setTimeout(function(){toast.classList.remove('show')},2000); }
    if(navigator.clipboard) navigator.clipboard.writeText(t).then(function(){show('Email copied!')},function(){show(t)}); else show(t);
  });});

  /* ---- page transition: circle reveal from the click point (View Transitions) / curtain fallback ---- */
  D.addEventListener('click',function(e){
    var a=e.target.closest('a'); if(!a) return;
    try{ sessionStorage.setItem('vx',(e.clientX/innerWidth*100)+'%'); sessionStorage.setItem('vy',(e.clientY/innerHeight*100)+'%'); }catch(_){}
    if(native||reduce) return;
    if(e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||a.target==='_blank') return;
    var href=a.getAttribute('href');
    if(!href||href.charAt(0)==='#'||/^(mailto:|tel:|https?:)/.test(href)||a.hasAttribute('download')) return;
    e.preventDefault(); root.classList.add('leaving');
    setTimeout(function(){ location.href=href; },460);
  });
  if(!native && !reduce){
    root.classList.add('entering'); setTimeout(function(){ root.classList.remove('entering'); },700);
    addEventListener('pageshow',function(e){ if(e.persisted) root.classList.remove('leaving'); });
  }

  /* =====================  LAB: Typing Mood Lab  ===================== */
  var tb=$('#typebox');
  if(tb){
    var down={}, holds=[], delays=[], keys=0, backs=0, last=0, start=0, base=null;
    var els={wpm:$('#m-wpm'),hold:$('#m-hold'),gap:$('#m-gap'),err:$('#m-err')};
    var bars={wpm:$('#b-wpm'),hold:$('#b-hold'),gap:$('#b-gap'),err:$('#b-err')};
    var vibe=$('#vibe'), vem=$('#vibe-em'), vt=$('#vibe-t'), vs=$('#vibe-s');
    var avg=function(a){return a.length?a.reduce(function(x,y){return x+y},0)/a.length:0};
    function stats(){
      var mins=Math.max((performance.now()-start)/60000,1/60), chars=tb.value.length;
      return {wpm:start?(chars/5)/mins:0,hold:avg(holds),gap:avg(delays),err:keys?backs/keys:0};
    }
    function paint(s){
      els.wpm.textContent=Math.round(s.wpm); els.hold.textContent=Math.round(s.hold)+' ms';
      els.gap.textContent=Math.round(s.gap)+' ms'; els.err.textContent=Math.round(s.err*100)+'%';
      bars.wpm.style.width=Math.min(s.wpm/90*100,100)+'%'; bars.hold.style.width=Math.min(s.hold/220*100,100)+'%';
      bars.gap.style.width=Math.min(s.gap/600*100,100)+'%'; bars.err.style.width=Math.min(s.err*100*4,100)+'%';
    }
    function read(s){
      var b=base||{wpm:38,hold:105,gap:230,err:.06}, sr=s.wpm/b.wpm, gr=s.gap/b.gap, label,em,txt;
      if(keys<15){ return ['⌨️','Keep typing…','Type about 15 keys or more and I will take a reading.']; }
      if(sr>1.15 && s.err>b.err+.05) return ['⚡','Rushed','Faster than your normal pace and with more corrections. This often looks like hurrying.'];
      if(sr<.8 || gr>1.3) return ['🌙','Slow and tired','Slower than your normal pace, with longer gaps between keys.'];
      if(sr>1.05 && s.err<=b.err+.03) return ['🎯','Focused','Quick and clean. A steady, confident rhythm.'];
      return ['😌','Calm','Close to your usual rhythm.'];
    }
    function update(){
      var s=stats(); paint(s); var r=read(s);
      if(vt.textContent!==r[1]){ vibe.classList.remove('pulse'); void vibe.offsetWidth; vibe.classList.add('pulse'); }
      vem.textContent=r[0]; vt.textContent=r[1]; vs.textContent=r[2]+(base?'':' (compared with typical averages until you set a baseline)');
    }
    tb.addEventListener('keydown',function(e){
      if(e.repeat) return; var t=performance.now(); if(!start) start=t;
      if(last){ var d=t-last; if(d<2000) delays.push(d); } last=t; keys++; if(e.key==='Backspace') backs++;
      down[e.code]=t;
    });
    tb.addEventListener('keyup',function(e){ var t=performance.now(); if(down[e.code]){ var h=t-down[e.code]; if(h<600) holds.push(h); delete down[e.code]; } update(); });
    function reset(){ holds=[];delays=[];keys=0;backs=0;last=0;start=0;down={};tb.value=''; update(); tb.focus(); }
    $('#btn-base').addEventListener('click',function(){
      if(keys<15){ vs.textContent='Type at least 15 keys first, then set your baseline.'; return; }
      base=stats(); reset(); vem.textContent='✅'; vt.textContent='Baseline saved'; vs.textContent='Now type again, in a different mood or at a different speed, and watch the reading change.';
    });
    $('#btn-reset').addEventListener('click',function(){ base=null; reset(); });
    update();
  }

  /* =====================  LAB: Priority Matrix  ===================== */
  var qroot=$('#matrix');
  if(qroot){
    var tasks=[{t:'Finish the report (due today)',u:1,i:1},{t:"Prepare for tomorrow's meeting",u:0,i:1},{t:'New task, no deadline yet',u:0,i:0}], uid=0;
    tasks.forEach(function(x){x.id=++uid});
    var Q={q1:$('#q1'),q2:$('#q2'),q3:$('#q3'),q4:$('#q4')};
    function qk(x){ return x.u&&x.i?'q1':(!x.u&&x.i?'q2':(x.u&&!x.i?'q3':'q4')); }
    function render(){
      Object.keys(Q).forEach(function(k){ Q[k].innerHTML=''; });
      tasks.forEach(function(x){
        var d=D.createElement('div'); d.className='task';
        d.innerHTML='<span></span><button class="'+(x.u?'on':'')+'" data-a="u" title="Toggle urgent">Urgent</button><button class="'+(x.i?'on':'')+'" data-a="i" title="Toggle important">Important</button><button class="x" data-a="x" title="Remove">✕</button>';
        d.firstChild.textContent=x.t;
        d.addEventListener('click',function(e){ var a=e.target.dataset.a; if(!a) return;
          if(a==='x') tasks=tasks.filter(function(y){return y!==x}); else x[a]=x[a]?0:1; render(); });
        Q[qk(x)].appendChild(d);
      });
    }
    $('#addform').addEventListener('submit',function(e){
      e.preventDefault(); var v=$('#addtext').value.trim(); if(!v) return;
      tasks.push({id:++uid,t:v,u:$('#f-u').checked?1:0,i:$('#f-i').checked?1:0}); $('#addtext').value=''; render();
    });
    render();
  }
})();
