(function () {
  'use strict';

  /* NAV DRAWER */
  var hamburger = document.querySelector('.nav__hamburger');
  var drawer    = document.querySelector('.nav__drawer');
  var overlay   = document.querySelector('.nav__drawer-overlay');
  var closeBtn  = document.querySelector('.nav__drawer-close');

  function openDrawer()  { if(drawer){ drawer.classList.add('is-open');    document.body.style.overflow='hidden'; } }
  function closeDrawer() { if(drawer){ drawer.classList.remove('is-open'); document.body.style.overflow=''; } }

  if (hamburger) hamburger.addEventListener('click', openDrawer);
  if (overlay)   overlay.addEventListener('click', closeDrawer);
  if (closeBtn)  closeBtn.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeDrawer(); });

  /* PROGRESS BAR */
  var fill = document.querySelector('.progress-bar__fill');
  if (fill) {
    window.addEventListener('scroll', function(){
      var d = document.documentElement;
      var pct = (d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100;
      fill.style.width = Math.min(Math.max(pct, 0), 100) + '%';
    }, { passive: true });
  }

  /* ACTIVE NAV LINK */
  var path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav__link').forEach(function(a){
    if (a.getAttribute('href').replace(/\/$/, '') === path) a.classList.add('nav__link--active');
  });

  /* SMOOTH SCROLL */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var t = document.querySelector(this.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
    });
  });

  /* WHATSAPP */
  window.openWA = function(msg) {
    var url = 'https://wa.me/61424513998' + (msg ? '?text=' + encodeURIComponent(msg) : '');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

}());
