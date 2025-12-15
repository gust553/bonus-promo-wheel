const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const resultBox = document.getElementById('result');
const actions = document.getElementById('actions');

const prizes = [
  'Benefício Promocional 10%',
  'Benefício Promocional 20%',
  'Benefício Promocional 30%',
  'Benefício Promocional 50%',
  'Cashback Especial',
  'Sem prêmio'
];

let angle = 0;
let spinning = false;

function drawWheel() {
  const slice = (2 * Math.PI) / prizes.length;
  for (let i = 0; i < prizes.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = i % 2 === 0 ? '#0f9d58' : '#1bbf72';
    ctx.moveTo(150,150);
    ctx.arc(150,150,150,i*slice,(i+1)*slice);
    ctx.lineTo(150,150);
    ctx.fill();

    ctx.save();
    ctx.translate(150,150);
    ctx.rotate(i*slice + slice/2);
    ctx.fillStyle = '#fff';
    ctx.font = '14px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(prizes[i], 140, 5);
    ctx.restore();
  }
}

drawWheel();

spinBtn.onclick = () => {
  if (spinning) return;
  spinning = true;
  actions.classList.add('hidden');
  resultBox.classList.add('hidden');

  const spinAngle = Math.random() * 360 + 1440;
  const duration = 3000;
  const start = performance.now();

  function animate(t) {
    const progress = Math.min((t - start) / duration, 1);
    angle = spinAngle * easeOut(progress);
    ctx.setTransform(1,0,0,1,0,0);
    ctx.translate(150,150);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.translate(-150,-150);
    ctx.clearRect(0,0,300,300);
    drawWheel();
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      spinning = false;
      showResult();
    }
  }
  requestAnimationFrame(animate);
};

function easeOut(t){ return 1 - Math.pow(1-t,3); }

function showResult() {
  const slice = 360 / prizes.length;
  const index = Math.floor(((360 - (angle % 360)) % 360) / slice);
  const prize = prizes[index];

  resultBox.innerHTML = `🎉 Resultado: <strong>${prize}</strong><br/><small>Para verificar elegibilidade, fale com o atendimento.</small>`;
  resultBox.classList.remove('hidden');
  actions.classList.remove('hidden');
}
