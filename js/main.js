
function toggleMenu(){document.getElementById('nav').classList.toggle('show');}
async function handleSubmit(e){
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  try{
    const res = await fetch('php/send.php',{method:'POST',body:data});
    const json = await res.json();
    document.getElementById('status').textContent = json.message || 'Poslano.';
    if(json.ok) form.reset();
  }catch(err){
    document.getElementById('status').textContent = 'Greška pri slanju. Pokušajte kasnije.';
  }
  return false;
}

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.news-grid');
  const cards = Array.from(document.querySelectorAll('.news-grid .news-card'));
  if (!grid || cards.length === 0) return;

  const prevBtn = document.getElementById('prevNews');
  const nextBtn = document.getElementById('nextNews');

  let index = 0;
  let timer = null;

  function cardsPerView() {
    // na desktopu 3, na mobu 1
    return window.matchMedia('(max-width: 900px)').matches ? 1 : 3;
  }

  function render() {
    const n = cardsPerView();
    // sakrij sve
    cards.forEach(c => (c.style.display = 'none'));
    // prikaži n komada od indexa
    for (let i = 0; i < n; i++) {
      const c = cards[(index + i) % cards.length];
      c.style.display = '';
    }
  }

  function next() {
    index = (index + 1) % cards.length;
    render();
  }

  function prev() {
    index = (index - 1 + cards.length) % cards.length;
    render();
  }

  function start() {
    timer = setInterval(next, 5000);
  }

  function restart() {
    clearInterval(timer);
    start();
  }

  nextBtn?.addEventListener('click', () => { next(); restart(); });
  prevBtn?.addEventListener('click', () => { prev(); restart(); });
  window.addEventListener('resize', render);

  render();
  start();
});
