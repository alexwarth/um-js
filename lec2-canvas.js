'use strict';

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'cornflowerblue';
ctx.font = '20pt Monaco, Courier New';
ctx.fillText('hello world', 20, 40);

ctx.fillStyle = 'red';
ctx.fillRect(100, 100, 500, 250);

ctx.beginPath();
ctx.fillStyle = 'blue';
ctx.lineWidth = 5;
ctx.strokeStyle = 'black';
ctx.moveTo(20, 320);
ctx.lineTo(800, 500);
ctx.lineTo(20, 500);
ctx.lineTo(20, 320);
ctx.fill();
ctx.stroke();

ctx.beginPath();
ctx.arc(400, 300, 80, 0, 2 * Math.PI);
ctx.fillStyle = 'yellow';
ctx.fill();

