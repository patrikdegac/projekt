/* =========================
   MOBILE MENU (HAMBURGER)
   ========================= */

function toggleMenu() {
  const menu = document.querySelector('.topnav ul');
  const btn = document.querySelector('.menu-toggle');
  if (!menu) return;

  menu.classList.toggle('show');

  if (btn) {
    btn.setAttribute('aria-expanded', menu.classList.contains('show') ? 'true' : 'false');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.topnav ul');

  // Ako nema menija ili buttona, nema ništa za raditi
  if (btn && menu) {
    // Klik na hamburger
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Klik na stavku -> zatvori meni
    menu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        menu.classList.remove('show');
        btn.setAttribute('aria-expanded', 'false');
      });
    });

    // Klik izvan menija -> zatvori
    document.addEventListener('click', () => {
      menu.classList.remove('show');
      btn.setAttribute('aria-expanded', 'false');
    });

    // Spriječi da klik unutar menija zatvori meni
    menu.addEventListener('click', (e) => e.stopPropagation());
  }


document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.news-grid .news-card');
  if (cards.length < 2) return; // ako nema bar 2, nema rotacije

  let i = 0;

  function tick(){
    cards.forEach(c => c.classList.remove('is-active'));
    cards[i].classList.add('is-active');
    i = (i + 1) % cards.length;
  }

  tick();                 // odmah aktiviraj prvu
  setInterval(tick, 3500); // rotacija
});

