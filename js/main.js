(function () {
  'use strict';

  const menuToggle = document.getElementById('menu-toggle');
  const siteNav = document.getElementById('site-nav');
  const navLinks = document.querySelectorAll('.site-nav__link');

  /* ——— Mobile navigation ——— */
  function setMenuOpen(open) {
    if (!menuToggle || !siteNav) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    siteNav.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      setMenuOpen(!isOpen);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false);
        menuToggle.focus();
      }
    });

    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        setMenuOpen(false);
      });
    });
  }

  /* ——— Experience tabs ——— */
  const tabWork = document.getElementById('tab-work');
  const tabEdu = document.getElementById('tab-edu');
  const panelWork = document.getElementById('panel-work');
  const panelEdu = document.getElementById('panel-edu');

  function selectTab(activeTab, activePanel, inactiveTab, inactivePanel) {
    activeTab.setAttribute('aria-selected', 'true');
    inactiveTab.setAttribute('aria-selected', 'false');
    activePanel.hidden = false;
    inactivePanel.hidden = true;
  }

  if (tabWork && tabEdu && panelWork && panelEdu) {
    tabWork.addEventListener('click', function () {
      selectTab(tabWork, panelWork, tabEdu, panelEdu);
    });
    tabEdu.addEventListener('click', function () {
      selectTab(tabEdu, panelEdu, tabWork, panelWork);
    });

    [tabWork, tabEdu].forEach(function (tab) {
      tab.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          if (tab === tabWork) tabEdu.focus();
          else tabWork.focus();
          tab.click();
        }
      });
    });
  }

  /* ——— Active section in nav ——— */
  const sections = document.querySelectorAll('main section[id]');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              const href = link.getAttribute('href');
              link.classList.toggle('is-active', href === '#' + id);
            });
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }
})();
