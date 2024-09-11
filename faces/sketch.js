let f;
//let speed;
function setup() {
  createCanvas(windowWidth/2, windowHeight/2);
  background(255, 52, 153)
  
 // f = new Face();
//  speed = 4;
}

function draw() {
  //background(220); 
  f = new Face();
  
   f.display();
  f.displayEye();
    //f2.display();
//  console.log(f.size)
//  f.x = f.x + speed // 
}

  /*f.display();
  f.smile();
  f.blink();*/

//blueprint for a face object
class Face {
  
  // properties
  constructor() {
    this.faceSize = random(30, 60);
    this.x = random(width);
    this.y = random(height);
    this.skinColor = color(random(256), random(256), random(256));
    this.eyeColor = color(random(256), random(256), random(256));
    this.eyeSize = random(4, 8);
    this.eyeDistance =15;
    this.eyeHeight = random((this.y)-6, (this.y)-3);
  }
  //random (256) which is 0 - 255.9999999...
  // methods
  display() {
    fill(this.skinColor);
    ellipse(this.x, this.y, this.faceSize);
    textSize(22);
    text('👄', (this.x)-11, (this.eyeHeight)+20);
  }
  displayEye(){
    fill(this.eyeColor);
    ellipse((this.x)-7.5, this.eyeHeight, this.eyeSize)
    ellipse((this.x)-7.5 + this.eyeDistance, this.eyeHeight, this.eyeSize)
  }
  
  
}