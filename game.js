

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let plane;
let pipes = [];
let gameStarted = false;
let gravity = 0.1;
let ascendForce = 2;
let score = 0;

const skyImage = new Image();
skyImage.src = 'https://media.istockphoto.com/vectors/cloud-and-sky-background-in-flat-style-cartoon-blue-cloudy-panorama-vector-id1215724660';

const planeImage = new Image();
planeImage.src = 'https://media.istockphoto.com/vectors/3d-vector-cartoon-airplane-summer-journey-time-to-travel-concept-vector-id1457278025';

class Plane {
  constructor() {
    this.x = 150;
    this.y = canvas.height / 2;
    this.width = 50;
    this.height = 50;
    this.velocity = 0;
  }

  draw() {
    ctx.drawImage(planeImage, this.x, this.y, this.width, this.height);
  }

  update() {
    this.velocity += gravity;
    this.y += this.velocity;

    if (this.y + this.height > canvas.height || this.y < 0) {
      gameOver();
    }
  }

  flap() {
    this.velocity = -ascendForce;
  }
}

class Pipe {
  constructor() {
    this.width = 60;
    this.height = Math.floor(Math.random() * (canvas.height / 1.5)) + 100;
    this.x = canvas.width;
    this.gap = 200;
  }

  draw() {
    ctx.fillStyle = "#32CD32"; // Green pipes
    ctx.fillRect(this.x, 0, this.width, this.height);
    ctx.fillRect(this.x, this.height + this.gap, this.width, canvas.height - this.height - this.gap);
  }

  update() {
    this.x -= 2;
  }
}

function startGame() {
  gameStarted = true;
  document.getElementById("playButton").style.display = "none"; 
  plane = new Plane();
  pipes = [];
  score = 0;
  animate();
}

function drawBackground() {
  ctx.drawImage(skyImage, 0, 0, canvas.width, canvas.height);
}

function animate() {
  if (!gameStarted) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  plane.update();
  plane.draw();

  if (Math.random() < 0.01) {
    pipes.push(new Pipe());
  }

  pipes.forEach((pipe, index) => {
    pipe.update();
    pipe.draw();

    if (pipe.x + pipe.width < 0) {
      pipes.splice(index, 1);
      score++;
    }

    if (
      plane.x + plane.width > pipe.x &&
      plane.x < pipe.x + pipe.width &&
      (plane.y < pipe.height || plane.y + plane.height > pipe.height + pipe.gap)
    ) {
      gameOver();
    }
  });

  requestAnimationFrame(animate);
}

function gameOver() {
  gameStarted = false;
  alert("Game Over! Score: " + score);
  document.getElementById("playButton").style.display = "block";
}

document.getElementById("playButton").addEventListener("click", startGame);

window.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    plane.flap();
  }
});

window.addEventListener("click", () => {
  if (gameStarted) {
    plane.flap();
  }
});

  

    
