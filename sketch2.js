let w;
let img1;
let mousetopicDistance = 100;

function preload() {
  img1 = loadImage('IMG_2979.PNG');
  img2 = loadImage('IMG_2978.PNG')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  w = new Walker();
}

function draw() {
  //background(220);
  w.display();
  w.step();
  w.stepMouse();
if (mouseIsPressed === true) {
    frameRate(10);
  } else {
    frameRate(60);
  }
}

class Walker{
  constructor(){
    this.x = width/2;
    this.y = height/2;
  }
  display(){
    let d = dist(this.x, this.y, mouseX, mouseY);
    let img = d < mousetopicDistance ? img2 : img1;
    push();
    if (this.x < windowWidth/2){
     translate(this.x + img.width / 2, this.y);
      scale(-1,1);
      image(img, -img.width / 2, 0);
    }
    else{
    image(img, this.x, this.y);
    }
    pop();
}
  step(){
    let choice = floor(random (4));
    if (choice == 0){
      this.x = this.x+5;
    }
    else if (choice ==1){
      this.x = this.x-5;
    }
    else if (choice ==2){
      this.y = this.y+5;
    }
    else {
      this.y = this.y-5;
    }
  }
  
  stepMouse(){
    if (this.x < mouseX){
      this.x = this.x+6;
    }
    else if (this.x > mouseX){
      this.x = this.x-6;
    }
    else if (this.y < mouseY){
      this.y = this.y+6;
    }
    else {
      this.y = this.y-6;
    }
  }
}