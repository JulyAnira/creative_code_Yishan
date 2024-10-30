let img;
let imgX, imgY, imgW, imgH;
let isDrawing = false;
let shape;

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
  shape = new Shape();
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
  
  let probability = 0.3;
 let t = random(2);
 let pStar = random(3);
 if (t < probability) {
  text('Mansikka', x, y);
  textSize(d);
  textAlign (RIGHT);
  textFont('Handjet');
}

  shape.setCenter(x, y);
  shape.setColor(r, g, b);
  shape.setSize(d);
  shape.display();
  
  image(img, imgX, imgY, imgW, imgH);
}

function mousePressed() {
  if (mouseX > imgX && mouseX < imgX + imgW && mouseY > imgY && mouseY < imgY + imgH) {
    isDrawing = !isDrawing;
    if (isDrawing) {
      loop();
    } else {
      noLoop();
    }
  }
}

class Shape {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.size = 50;
  }

  setCenter(x, y) {
    this.x = x;
    this.y = y;
  }

  setColor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  setSize(size) {
    this.size = size;  
  }

  display() {
    noStroke();
    
    fill(this.r * 0.6, this.g * 0.6, this.b * 0.5, 60);
    this.polarEllipses(10, this.size * 0.5, this.size * 0.5, this.size * 0.7);
    
    fill(this.r * 1.3, this.g * 1.5, this.b * 1.4, 60);
    this.polarEllipses(5, this.size * 0.36, this.size * 0.36, this.size * 0.32);
    
    fill(this.r - 20, this.g - 20, this.b, 70);
    this.polarEllipses(10, this.size * 0.3, this.size * 0.3, this.size * 0.7);
    this.polarEllipses(10, this.size * 0.3, this.size * 0.3, this.size * 1.2);
    
    fill(this.r * 1.2, this.g, this.b, 50);
    this.polarEllipses(12, this.size * 0.08, this.size * 0.08, this.size * 0.4);
    
    fill(this.r, this.g * 1.5, this.b, 70);
    this.polarEllipses(5, this.size * 0.16, this.size * 0.16, this.size * 0.32);
    
    fill(this.r, this.g, this.b, 50);
    this.polarEllipses(14, this.size * 0.5, this.size * 0.5, this.size * 1.55);
    
    fill(this.r, this.g, this.b, 50);
    this.polarHexagon(3, this.size * 0.1, 0);
    
    fill(this.r, this.g, this.b, 50);
    this.polarTriangles(4, this.size * 0.06, this.size * 1.6);
    this.polarTriangles(4, this.size * 0.08, this.size * 2.8);
    
    this.polarSquares(8, this.size * 0.02, this.size * 1.8);
    this.polarSquares(4, this.size * 0.04, this.size * 2.4);
  }

  polarEllipses(sides, widthRadius, heightRadius, distance) {
    for (let i = 0; i < sides; i++) {
      let angle = TWO_PI / sides * i;
      let x = this.x + cos(angle) * distance;
      let y = this.y + sin(angle) * distance;
      ellipse(x, y, widthRadius, heightRadius);
    }
  }

  polarHexagon(angle, radius, distance) {
    fill(this.r, this.g, this.b);
    beginShape();
    for (let i = 0; i < 6; i++) {
      let x = this.x + cos(angle + TWO_PI / 6 * i) * radius + distance;
      let y = this.y + sin(angle + TWO_PI / 6 * i) * radius + distance;
      vertex(x, y);
    }
    endShape(CLOSE);
  }

  polarTriangles(sides, radius, distance) {
    for (let i = 0; i < sides; i++) {
      let angle = TWO_PI / sides * i;
      let x = this.x + cos(angle) * distance;
      let y = this.y + sin(angle) * distance;
      this.drawTriangle(x, y, radius);
    }
  }

  drawTriangle(x, y, radius) {
    fill(this.r, this.g, this.b);
    beginShape();
    for (let i = 0; i < 3; i++) {
      let angle = TWO_PI / 3 * i;
      let vx = this.x + cos(angle) * radius;
      let vy = this.y + sin(angle) * radius;
      vertex(vx, vy);
    }
    endShape(CLOSE);
  }

  polarSquares(sides, radius, distance) {
    fill(this.r, this.g, this.b);
    for (let i = 0; i < sides; i++) {
      let angle = TWO_PI / sides * i;
      let x = this.x + cos(angle) * distance;
      let y = this.y + sin(angle) * distance;
      rect(x - radius / 2, y - radius / 2, radius, radius);
    }
  }
}
