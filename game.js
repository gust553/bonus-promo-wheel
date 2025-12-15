let indicator = document.getElementById('indicator');
let stopBtn = document.getElementById('stopBtn');
let scoreBox = document.getElementById('scoreBox');
let actions = document.getElementById('actions');

let pos = 0;
let dir = 1;
let speed = 2.6;
let playing = true;

function animate(){
  if(!playing) return;
  pos += speed * dir;
  if(pos >= 94 || pos <= 0) dir *= -1;
  indicator.style.left = pos + '%';
  requestAnimationFrame(animate);
}
animate();

stopBtn.onclick = () => {
  if(!playing) return;
  playing = false;

  const center = pos + 3;
  const distance = Math.abs(50 - center);
  const score = Math.max(0, Math.round(100 - distance * 4));

  scoreBox.innerHTML = `🎯 Pontuação final: <strong>${score}</strong><br>
  Quanto mais próximo do centro, maior a pontuação.`;
  scoreBox.classList.remove('hidden');
  actions.classList.remove('hidden');

  const params = new URLSearchParams(window.location.search);
  const ref = params.get('ref');
  if(ref){
    localStorage.setItem('affiliate_ref', ref);
  }
};
