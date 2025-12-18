
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

(function(){
  const cards = document.querySelectorAll('.news-card');
  if(cards.length !== 3) return;

  let i = 0;
  function tick(){
    cards.forEach(c => c.classList.remove('is-active'));
    cards[i].classList.add('is-active');
    i = (i + 1) % cards.length;
  }

  tick();
  setInterval(tick, 3500);
})();
