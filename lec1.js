'use strict';

function div() {
  return document.createElement('div');
}

/*
for (let x = 1; x <= 10; x++) {
  const d = div();
  d.innerText = 'x is ' + x;
  d.style.color = `rgb(0, 0, ${Math.floor(x * 255 / 10)})`;
  document.body.append(d);

  d.onclick = e => {
    d.innerText = 'x_x ' + x;
  };
}
*/

const mouseLabel = div();
mouseLabel.innerText = 'mouse is at (?, ?)';
document.body.append(mouseLabel);

const formulaLabel = div();
formulaLabel.innerText = 'f(x) = ';
document.body.append(formulaLabel);

const input = document.createElement('input');
input.value = 'Math.sin(x/10)*100';
formulaLabel.append(input);

const output = div();
output.innerText = 'f(?) = ?';
document.body.append(output);

const vizHolder = div();
vizHolder.style.marginLeft = '200px';
document.body.append(vizHolder);

document.body.onmousemove = e => {
  mouseLabel.innerText = `mouse is at (${e.x}, ${e.y})`;

  const x = e.x;
  const expr = input.value;
  const val = eval(expr);

  output.innerText = `f(${x}) = ${val}`;

  const viz = div();
  viz.style.background = 'cornflowerblue';
  viz.style.height = '1px';
  vizHolder.prepend(viz);
  viz.style.width = Math.abs(val) + 'px';
  if (val < 0) {
    viz.style.marginLeft = val + 'px';
  }
};
