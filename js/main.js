
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
