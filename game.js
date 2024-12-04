
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let plane = { x: 50, y: canvas.height / 2, width: 40, height: 30, velocity: 0, gravity: 0.5, lift: -10 };
let pipes = [], frameCount = 0, score = 0, isGameOver = false;

function createPipe() {
  let gapHeight = 150 - Math.min(50, score * 2);
  let topHeight = Math.random() * (canvas.height / 2);
  pipes.push({ x: canvas.width, top: topHeight, bottom: topHeight + gapHeight, width: 60, speed: 3 + Math.min(2, score / 10) });
}

function updatePipes() {
  pipes.forEach(pipe => { pipe.x -= pipe.speed; });
  pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);
}

function detectCollision(pipe) {
  return (plane.y < pipe.top || plane.y + plane.height > pipe.bottom || plane.y + plane.height > canvas.height);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'blue'; ctx.fillRect(plane.x, plane.y, plane.width, plane.height);
  pipes.forEach(pipe => {
    ctx.fillStyle = 'green';
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
    ctx.fillRect(pipe.x, pipe.bottom, pipe.width, canvas.height - pipe.bottom);
  });
  ctx.fillStyle = 'white'; ctx.font = '24px Arial'; ctx.fillText(`Score: ${score}`, 10, 30);
}

function gameLoop() {
  if (isGameOver) { alert(`Game Over! Score: ${score}`); return; }
  plane.velocity += plane.gravity; plane.y += plane.velocity;
  if (frameCount % 100 === 0) { createPipe(); score++; }
  pipes.forEach(pipe => {
    if (plane.x < pipe.x + pipe.width && plane.x + plane.width > pipe.x && detectCollision(pipe)) { isGameOver = true; }
  });
  updatePipes(); draw(); frameCount++; requestAnimationFrame(gameLoop);
}

window.addEventListener('click', () => { plane.velocity = plane.lift; });
gameLoop();
