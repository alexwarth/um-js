'use strict';

const ctx = canvas.getContext('2d');

let mouseX = 20, mouseY = 20;
window.onmousemove = e => {
  mouseX = e.x;
  mouseY = e.y;
};

function step() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);


  const seymour = {x: window.innerWidth / 2, y: 2 * window.innerHeight / 3, a: -90, c: 'blue'};
  seymour.turnBy = function(n) {
    this.a += n;
  };
  seymour.forwardBy = function(n) {
    ctx.beginPath();
    ctx.strokeStyle = this.c;
    ctx.moveTo(this.x, this.y);
    this.x += n * Math.cos(this.a * Math.PI / 180);
    this.y += n * Math.sin(this.a * Math.PI / 180);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
  };

  seymour.branch = function(n) {
    if (n === 0) {
      return;
    }

    this.forwardBy(mouseY);

    const c1 = Object.create(this);
    c1.turnBy(-mouseX); c1.branch(n - 1);

    const c2 = Object.create(this);
    c2.turnBy(mouseX); c2.branch(n - 1);
  };

  seymour.branch(10);

  requestAnimationFrame(step);
}

requestAnimationFrame(step);

