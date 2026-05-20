(function () {
  'use strict';

  const menuToggle = document.getElementById('menu-toggle');
  const siteNav = document.getElementById('site-nav');
  const navLinks = document.querySelectorAll('.site-nav__link');
  const contactForm = document.getElementById('contact-form');
  const sendBtn = document.getElementById('send-btn');
  const formStatus = document.getElementById('form-status');

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

  /* ——— Contact form ——— */
  function showStatus(message, type) {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.hidden = false;
    formStatus.className = 'form-status form-status--' + type;
  }

  function setFieldError(field, message) {
    const errorEl = document.getElementById(field.id + '-error');
    field.classList.toggle('is-error', Boolean(message));
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (errorEl) {
      errorEl.textContent = message || '';
      errorEl.hidden = !message;
    }
  }

  function validateForm() {
    let valid = true;
    const fields = [
      { el: document.getElementById('name'), msg: 'Ingresa tu nombre.' },
      { el: document.getElementById('email'), msg: 'Ingresa un correo válido.' },
      { el: document.getElementById('subject'), msg: 'Ingresa un asunto.' },
      { el: document.getElementById('message'), msg: 'Ingresa tu mensaje.' }
    ];

    fields.forEach(function (f) {
      if (!f.el) return;
      let err = '';
      if (!f.el.value.trim()) err = f.msg;
      else if (f.el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.el.value)) {
        err = f.msg;
      }
      setFieldError(f.el, err);
      if (err) valid = false;
    });
    return valid;
  }

  function mailtoFallback(form) {
    const email = form.dataset.email;
    if (!email) {
      window.open('https://www.linkedin.com/in/julio-ochoa-medrano-94a08b277/', '_blank', 'noopener,noreferrer');
      return;
    }
    const name = form.name.value.trim();
    const subject = encodeURIComponent(form.subject.value.trim());
    const body = encodeURIComponent(
      'From: ' + name + ' (' + form.email.value.trim() + ')\n\n' + form.message.value.trim()
    );
    window.location.href = 'mailto:' + email + '?subject=' + subject + '&body=' + body;
  }

  async function submitFormspree(form, endpoint) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        subject: form.subject.value.trim(),
        message: form.message.value.trim()
      })
    });
    if (!res.ok) throw new Error('Formspree error');
    return res;
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (!validateForm()) {
        showStatus('Corrige los errores indicados arriba.', 'error');
        sendBtn.classList.add('is-error');
        return;
      }

      sendBtn.classList.remove('is-error');
      sendBtn.classList.add('is-loading');
      sendBtn.setAttribute('aria-busy', 'true');
      sendBtn.disabled = true;

      const formspreeId = contactForm.dataset.formspree;
      const endpoint = formspreeId
        ? 'https://formspree.io/f/' + formspreeId
        : '';

      try {
        if (endpoint) {
          await submitFormspree(contactForm, endpoint);
          showStatus('Mensaje enviado correctamente. Te responderé pronto.', 'success');
          contactForm.reset();
        } else {
          mailtoFallback(contactForm);
          showStatus('Se abrirá tu cliente de correo. Si no, usa el botón de LinkedIn.', 'success');
        }
      } catch {
        showStatus('No se pudo enviar. Prueba el botón de LinkedIn.', 'error');
        sendBtn.classList.add('is-error');
      } finally {
        sendBtn.classList.remove('is-loading');
        sendBtn.removeAttribute('aria-busy');
        sendBtn.disabled = false;
      }
    });

    contactForm.querySelectorAll('.field__input, .field__textarea').forEach(function (input) {
      input.addEventListener('input', function () {
        setFieldError(input, '');
      });
    });
  }
})();
