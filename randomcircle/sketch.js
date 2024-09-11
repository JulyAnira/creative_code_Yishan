let img;
let r;
let g;
let b;
let imgX, imgY, imgW, imgH;
let isDrawing = false;
function preload() {
  img = loadImage('pixel1.gif');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  imgX = windowWidth / 2 - 100;
  imgY = windowHeight / 2 - 100;
  imgW = 200;
  imgH = 200;
  background(240, 240, 255);
  noLoop();
  cursor(CROSS);
}

function draw() {
  let r = 200 * randomGaussian() + mouseY - 100;
  let g = 200 * randomGaussian() + 250;
  let b = 200 * randomGaussian() + mouseX - 100;

 let x = 20 * randomGaussian() + mouseX;
 let y = 20 * randomGaussian() + mouseY;
 let d = 50 * randomGaussian() + 25;
  
 let probability = 0.1;
 let t = random(2);
 let pStar = random(3);
 if (t < probability) {
  text('Mansikka', x, y);
  textSize(d);
  textAlign (RIGHT);
  textFont('Handjet');
}
 /* else if(pStar < probability){
    drawStar(x, y, 20, 100, 4);
  }
*/



  noStroke();
  fill(r, g, b);
  circle(x, y, d);
  image(img, imgX, imgY, imgW, imgH);
}
 /*
function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
 
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}*/

function mousePressed() {
  if (mouseX > imgX && mouseX < imgX + imgW && mouseY > imgY && mouseY < imgY + imgH){
  if (isDrawing){
    noLoop();
  }
  else{
    loop();
  }
  isDrawing = !isDrawing
  }
}
