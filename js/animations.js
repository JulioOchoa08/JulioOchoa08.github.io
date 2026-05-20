(function () {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ——— Typewriter ——— */
  const typewriterEl = document.getElementById('typewriter');
  if (typewriterEl && !reducedMotion) {
    const phrases = [
      'Analista e Ingeniero de Datos',
      'Especialista en Power BI',
      'Automatización con Python',
      'Integraciones & APIs',
      'Soluciones con IA'
    ];
    const textEl = typewriterEl.querySelector('.typewriter__text');
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const current = phrases[phraseIndex];
      if (!deleting) {
        charIndex++;
        textEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          typewriterEl.classList.add('is-done');
          deleting = true;
          setTimeout(tick, 2200);
          return;
        }
        setTimeout(tick, 55);
      } else {
        charIndex--;
        textEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          typewriterEl.classList.remove('is-done');
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(tick, 400);
          return;
        }
        setTimeout(tick, 30);
      }
    }

    typewriterEl.classList.add('is-done');
    setTimeout(tick, 600);
  } else if (typewriterEl) {
    const textEl = typewriterEl.querySelector('.typewriter__text');
    if (textEl) textEl.textContent = 'Analista e Ingeniero de Datos';
    typewriterEl.classList.add('is-finished');
  }

  /* ——— Scroll reveal ——— */
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();
