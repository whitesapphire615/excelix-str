function go(id) {
  document.getElementById(id).scrollIntoView({
    behavior: 'smooth'
  });
}

const canvas = document.getElementById("particles");
const ctx    = canvas.getContext("2d");

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;
let hue = 180;

class ParticleUnit {
  constructor(x, y, size, speedX, speedY) {
    this.x      = x;
    this.y      = y;
    this.size   = size;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color  = `hsl(${hue}, 100%, 60%)`;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width)  this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    this.color  = `hsl(${hue}, 100%, 60%)`;
  }
  paint() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function startParticles() {
  particlesArray = [];
  for (let i = 0; i < 50; i++) {
    let size   = Math.random() * 3 + 1;
    let x      = Math.random() * canvas.width;
    let y      = Math.random() * canvas.height;
    let speedX = (Math.random() - 0.5) * 1.2;
    let speedY = (Math.random() - 0.5) * 1.2;
    particlesArray.push(new ParticleUnit(x, y, size, speedX, speedY));
  }
}

function particleLines() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.strokeStyle = `hsla(${hue}, 100%, 60%, 0.2)`;
        ctx.lineWidth   = 0.8;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animating() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {p.update();p.paint();});
  particleLines();
  requestAnimationFrame(animating);
}

startParticles();
animating();

window.addEventListener("resize", () => {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  startParticles();
});