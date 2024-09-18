let bgMusic;
let bgimg;
let p;
let particles = [];
//const aspectRatio = 5/2.9; 
function preload() {
  bgimg = loadImage('background.png');
  bgMusic = loadSound('bgm.wav');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
    bgMusic.volume = 0.8;
      setTimeout(() => {
    bgMusic.loop = true; 
    bgMusic.play();
  }, 3000); 

  for (let i = 0; i < 100; i++){
    let p = new Particle();
    particles.push(p);
  }

}

function draw() {
  background(400);
    let imgAspect = bgimg.width / bgimg.height;
    let canvasAspect = width / height;

  let newWidth, newHeight;
  let offsetX = 0, offsetY = 0;

  if (imgAspect > canvasAspect) {
    newWidth = width;
    newHeight = width / imgAspect;
    offsetY = (height - newHeight) / 2;
  } else {
    newWidth = height * imgAspect;
    newHeight = height;
    offsetX = (width - newWidth) / 2;
  }

  image(bgimg, offsetX, offsetY, newWidth, newHeight);

  for (let i = 0; i < particles.length; i++){
    
    let currentParticle = particles[i];
    currentParticle.update();
    currentParticle.checkWalls();
    currentParticle.show();
  }

}



class Particle{
  constructor(){
    this.position = createVector(random(width), random(0, windowHeight/3));
    this.position2 = createVector(random(width), random(0, windowHeight/3));
    this.position3 = createVector(random(width), random(0, windowHeight/3));
    this.velocity = createVector(random(-1,1), random(1,3));
    this.velocity3 = createVector(random(2,-2), random(1,-1));
    this.acceleration = createVector(random(-0.01,0.01), random(-0.01));
  }
  update(){
    //the caculate happen
    this.position.add(this.velocity);
    this.position2.add(this.velocity);
    this.position3.add(this.velocity3);
    this.velocity.add(this.acceleration);
    this.velocity3.add(this.acceleration);
  }
  checkWalls(){
    if (this.position.x > width){
      this.position.x --;
      this.velocity.x *=1;
    }
    else if (this.position.x < 0){
      this.position.x ++;
      this.velocity.x *=-1;
    }
    /*if (this.position.y > height){
      this.position.y --;
      this.velocity.y *=1;
    }*/
     else if (this.position.y < 0){
      this.position.y ++;
      this.velocity.y *= -1;
    }
    
     if (this.position3.x > width){
      this.position3.x --;
      this.velocity3.x *=1;
    }
    else if (this.position3.x < 0){
      this.position3.x ++;
      this.velocity3.x *=-1;
    }
    if (this.position3.y > height){
      this.position3.y --;
      this.velocity3.y *=1;
    }
     else if (this.position3.y < 0){
      this.position3.y ++;
      this.velocity3.y *= -1;
    }
  }
  
  show(){
    fill(random(235,249),random(236,252),random(252,255),random(230,255));
    ellipse(this.position.x, this.position.y, random(0, 5), random(0, 5));
   ellipse(this.position3.x, this.position3.y, random(0, 5), random(0, 5));
    
    fill(random(235,249),random(236,252),random(252,255),random(100,220));
    ellipse(this.position2.x, this.position2.y, random(4,7), random(4,7));
    //235,236,252
    //249,252,255
    //fill(age,random(255),random(255));
    noStroke();
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}