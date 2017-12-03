'use strict';

const ctx = canvas.getContext('2d');

let g = {vx: 0, vy: 30};
let dampingFactor = 0.9;

class Ball {
  constructor(x, y, r, c, vx, vy) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
    this.vx = vx;
    this.vy = vy;
    Ball.numBalls++;
  }

  step(dt) {
    this.vx += g.vx;
    this.vy += g.vy;
    this.x += dt * this.vx;
    this.y += dt * this.vy;

    if (this.y + this.r >= window.innerHeight) {
      this.y = window.innerHeight - this.r;
      this.vy = -this.vy * dampingFactor;
    } else if (this.y - this.r < 0) {
      this.y = this.r;
      this.vy = -this.vy * dampingFactor;
    }
    if (this.x + this.r >= window.innerWidth) {
      this.x = window.innerWidth - this.r;
      this.vx = -this.vx * dampingFactor;
    } else if (this.x - this.r < 0) {
      this.x = this.r;
      this.vx = -this.vx * dampingFactor;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = this.c;
    ctx.fill();
  }
}

Ball.numBalls = 0;

const b1 = new Ball(100, 250, 80, 'blue', 300, 300);
const b2 = Object.create(b1);
b2.x = 300;
b2.c = 'green';

const balls = [b1, b2];

let lastTime;

function step(time) {
  time /= 1000;

  let dt;
  if (lastTime === undefined) {
    dt = 0;
  } else {
    dt = time - lastTime;
  }
  lastTime = time;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  ctx.fillStyle = 'cornflowerblue';
  ctx.font = '20pt Monaco, Courier New';
  ctx.fillText('time ' + time, 20, 40);
  ctx.fillText('dt ' + dt, 20, 80);

  for (let ball of balls) {
    ball.step(dt);
  }

  for (let ball of balls) {
    ball.draw();
  }

  requestAnimationFrame(step);
}

function addBall(x, y, vx, vy) {
console.log('vx', vx, 'vy', vy);
  const c = `rgb(
      ${Math.floor(Math.random() * 256)},
      ${Math.floor(Math.random() * 256)},
      ${Math.floor(Math.random() * 256)})`;
  const b =
    new Ball(x, y, 30 + Math.random() * 20, c, vx, vy);
  balls.push(b);
}

let mouseDownPos = null;
window.onmousedown = e => {
  mouseDownPos = {x: e.x, y: e.y};
};
window.onmouseup = e => {
  const vx = e.x - mouseDownPos.x;
  const vy = e.y - mouseDownPos.y;
  addBall(e.x, e.y, vx, vy);
};

for (let i = 0; i < 10; i++) {
  addBall(
    Math.random() * window.innerWidth,
    Math.random() * window.innerHeight,
    (Math.random() - 0.5) * 1000,
    (Math.random() - 0.5) * 1000);
}

requestAnimationFrame(step);

