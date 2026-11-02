/* Giriş ekranı küçük etkileşimleri — bağımlılık yok */
(() => {
  'use strict';

  const password = document.getElementById('id_password');
  const toggle = document.getElementById('togglePassword');
  const eyeIcon = document.getElementById('eyeIcon');

  if (password && toggle && eyeIcon) {
    toggle.addEventListener('click', () => {
      const visible = password.type === 'password';
      password.type = visible ? 'text' : 'password';
      eyeIcon.setAttribute('href', visible ? '#i-eye-off' : '#i-eye');
      toggle.setAttribute('aria-pressed', String(visible));
      toggle.setAttribute('aria-label', visible ? 'Parolayı gizle' : 'Parolayı göster');
      toggle.title = visible ? 'Parolayı gizle' : 'Parolayı göster';
      password.focus();
    });
  }

  const fillDemo = document.getElementById('fillDemo');
  if (fillDemo && password) {
    fillDemo.addEventListener('click', () => {
      const username = document.getElementById('id_username');
      if (username) username.value = fillDemo.dataset.demoUser || '';
      password.value = fillDemo.dataset.demoPassword || '';
      password.focus();
    });
  }

  const form = document.getElementById('loginForm');
  const submit = document.getElementById('submitButton');
  if (form && submit) {
    form.addEventListener('submit', () => {
      submit.classList.add('is-loading');
      submit.setAttribute('aria-busy', 'true');
    });
  }
})();
