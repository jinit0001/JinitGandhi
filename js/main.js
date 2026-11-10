(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var native = 'onpageswap' in window;            // cross-document View Transitions supported
  if (native) document.documentElement.classList.add('vt-native');

  /* header shadow + mobile menu */
  var hdr = document.querySelector('header.site');
  function onScroll(){ if(hdr) hdr.classList.toggle('scrolled', window.scrollY > 8); }
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});
  var burger = document.querySelector('.burger'), links = document.querySelector('.links');
  if (burger) burger.addEventListener('click', function(){
    var open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });

  /* scroll reveal */
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
    }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el,i){ el.style.transitionDelay = (i%3)*90+'ms'; io.observe(el); });
  } else els.forEach(function(el){ el.classList.add('in'); });

  /* rotating word in hero */
  var rot = document.getElementById('rotator');
  if (rot && !reduce){
    var words = (rot.getAttribute('data-words')||'').split('|'), i = 0;
    setInterval(function(){
      i = (i+1) % words.length;
      rot.innerHTML = '<span>'+words[i]+'</span>';
    }, 2200);
  }

  /* soft cursor glow */
  var glow = document.querySelector('.glow');
  if (glow && !reduce){
    window.addEventListener('pointermove', function(e){ glow.style.left=e.clientX+'px'; glow.style.top=e.clientY+'px'; }, {passive:true});
  }

  /* copy email */
  document.querySelectorAll('[data-copy]').forEach(function(b){
    b.addEventListener('click', function(){
      var t = b.getAttribute('data-copy'), toast = document.querySelector('.toast');
      function show(m){ if(!toast) return; toast.textContent=m; toast.classList.add('show'); setTimeout(function(){toast.classList.remove('show')},2000); }
      if (navigator.clipboard) navigator.clipboard.writeText(t).then(function(){show('Email copied!')},function(){show(t)});
      else show(t);
    });
  });

  /* fallback page transition (browsers without cross-document View Transitions) */
  if (!native && !reduce){
    document.documentElement.classList.add('entering');
    setTimeout(function(){ document.documentElement.classList.remove('entering'); }, 600);
    document.addEventListener('click', function(e){
      var a = e.target.closest('a');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
      var href = a.getAttribute('href');
      if (!href || href.charAt(0)==='#' || /^(mailto:|tel:|https?:)/.test(href) || a.hasAttribute('download')) return;
      e.preventDefault();
      document.documentElement.classList.add('leaving');
      setTimeout(function(){ window.location.href = href; }, 380);
    });
    window.addEventListener('pageshow', function(e){ if(e.persisted) document.documentElement.classList.remove('leaving'); });
  }
})();
