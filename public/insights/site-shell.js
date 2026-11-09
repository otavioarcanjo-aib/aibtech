(() => {
  const header = document.querySelector('.topbar');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.topbar .nav');
  const syncHeader = () => header?.classList.toggle('scrolled', window.scrollY > 8);
  syncHeader();
  addEventListener('scroll', syncHeader, { passive: true });
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav?.classList.toggle('open', open);
  });
  nav?.addEventListener('click', event => {
    if (event.target.closest('a')) {
      menu?.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    }
  });
  addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      menu?.setAttribute('aria-expanded', 'false');
      nav?.classList.remove('open');
    }
  });
})();
