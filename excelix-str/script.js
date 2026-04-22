const canvas = document.getElementById("particles");
const ctx = canvas ? canvas.getContext("2d") : null;

let particlesArray = [];
let hue = 180;
let animationId = null;

class ParticleUnit {
  constructor(x, y, size, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  update(width, height) {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > width) {
      this.speedX *= -1;
    }

    if (this.y < 0 || this.y > height) {
      this.speedY *= -1;
    }
  }

  paint(context) {
    context.fillStyle = `hsl(${hue}, 100%, 60%)`;
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fill();
  }
}

function startParticles() {
  if (!canvas) {
    return;
  }

  particlesArray = [];
  const count = window.innerWidth < 768 ? 24 : 50;

  for (let i = 0; i < count; i += 1) {
    const size = Math.random() * 3 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speedX = (Math.random() - 0.5) * 1.1;
    const speedY = (Math.random() - 0.5) * 1.1;
    particlesArray.push(new ParticleUnit(x, y, size, speedX, speedY));
  }
}

function particleLines() {
  if (!ctx) {
    return;
  }

  const maxDistance = window.innerWidth < 768 ? 90 : 120;

  for (let a = 0; a < particlesArray.length; a += 1) {
    for (let b = a + 1; b < particlesArray.length; b += 1) {
      const dx = particlesArray[a].x - particlesArray[b].x;
      const dy = particlesArray[a].y - particlesArray[b].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDistance) {
        ctx.strokeStyle = `hsla(${hue}, 100%, 60%, 0.18)`;
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  if (!canvas || !ctx) {
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((particle) => {
    particle.update(canvas.width, canvas.height);
    particle.paint(ctx);
  });
  particleLines();
  hue = (hue + 0.15) % 360;
  animationId = requestAnimationFrame(animateParticles);
}

function setCanvasSize() {
  if (!canvas) {
    return;
  }
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function shouldReduceMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function initParticles() {
  if (!canvas || !ctx || shouldReduceMotion()) {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    if (canvas) {
      canvas.style.display = "none";
    }
    return;
  }

  canvas.style.display = "block";
  setCanvasSize();
  startParticles();
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  animateParticles();
}

window.addEventListener("resize", () => {
  initParticles();
});

const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
if (typeof reducedMotionMedia.addEventListener === "function") {
  reducedMotionMedia.addEventListener("change", initParticles);
} else if (typeof reducedMotionMedia.addListener === "function") {
  reducedMotionMedia.addListener(initParticles);
}

const elements = document.querySelectorAll(".part");

if (typeof IntersectionObserver === "function") {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach((el) => observer.observe(el));
} else {
  elements.forEach((el) => el.classList.add("show"));
}

initParticles();
