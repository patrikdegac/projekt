
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

