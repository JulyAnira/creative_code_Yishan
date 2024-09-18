let pos;
let vel;
let pos2;
let vel2;
let dotSize = 20;
let timeOffset = 0; 
let audio1;

let p;
let particles = [];

let w;
let img1;
let mousetopicDistance = 100;
let imgP;


function preload(){
  flyingimg = loadImage('./p1.PNG');
  img1 = loadImage('IMG_2979.PNG');
  img2 = loadImage('IMG_2978.PNG');
  imgP = loadImage('strawberry1.PNG');
  audio1 = loadSound('BounceYoFrankie.wav');
}

function setup() {
    createCanvas(windowWidth,windowHeight);
    w = new Walker();
    pos = createVector(random(width), random(height));
    vel = createVector(random(-3, 3), random(-3, 3));
    pos2 = createVector(random(width), random(height));
    vel2 = createVector(random(-3, 3), random(-3, 3));
    frameRate(30);
    noStroke();
    //noLoop();

    for (let i = 0; i < 30; i++){
      let p = new Particle();
      particles.push(p);
    }
  
  }

  
  function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
    background(255,255,255);
  }  


  function draw() {
  let colors = [
    color(255, 235, 240),
    color(250, 203, 214),
    color(245, 155, 176),
  ] 
  setBackground(colors);


  timeOffset += 0.05;//This is the speed of background dots
  //'+=' is add AND save
  for(let x = 0; x < width; x += 50){
    for(let y = 0; y < height; y += 50){
      let r = map (sin(timeOffset + (x + y) * 0.1), -1, 1, 53, 195)
      let g = map (sin(timeOffset + (x + y) * 0.1), -1, 1, 42, 189)
      let b = map (sin(timeOffset + (x + y) * 0.1), -1, 1, 97, 222)
      //(up)this is sin function for smooth visualization
      fill (r, g, b, 98);
      ellipse(x, y, dotSize);
      noStroke();
    }
  }

  drawVector();
  drawVector2();
  drawImage(pos.x, pos.y);
  drawImage(pos2.x, pos2.y);

  // Boundary detection (under)
    if (pos.x > windowWidth-50 || pos.x < 0) {
      vel.x *= -1;
    }
    if (pos.y > windowHeight - 50 || pos.y < 0) {
      vel.y *= -1;
    }

    if (pos2.x > windowWidth-50 || pos2.x < 0) {
      vel2.x *= -1;
    }
    if (pos2.y > windowHeight - 50 || pos2.y < 0) {
      vel2.y *= -1;
    }
    w.step();
    w.stepMouse();
    w.display();
    
    
  if (mouseIsPressed === true) {
      frameRate(10);
    } else {
      frameRate(60);
    }

    for (let i = 0; i < particles.length; i++){
    
      let currentParticle = particles[i];
      currentParticle.update();
      currentParticle.checkWalls();
      currentParticle.show();

      if (currentParticle.isTheage()){
        particles.splice(i,1);
        i--;
       }
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
        translate(this.x + this.x/ 2, this.y);
        scale(-1,1);
        image(img, this.x / 2, 0);
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
      if (this.x > mouseX){
        this.x = this.x-6;
      }
      if (this.y < mouseY){
        this.y = this.y+6;
      }
      if (this.y > mouseY){
        this.y = this.y-6;
      }
    }
  
  }
    function setBackground(colors){
      for (let y = 0; y < height; y++) {
        let interColorIndex = map(y, 0, height, 0, colors.length - 1);
        let colorIndex = floor(interColorIndex);
        let inter = interColorIndex - colorIndex;

        let startColor = colors[colorIndex];
        let endColor = colors[min(colorIndex + 1, colors.length - 1)];
        let c = lerpColor(startColor, endColor, inter);

        stroke(c);
        line(0, y, width, y);

    }
  }


  function drawVector(){
    pos.add(vel);
  }

  function drawImage(x, y){
    imageMode(CENTER);
    image (flyingimg, x, y, 200, 200)
  }

  function drawVector2(){
    pos2.add(vel2);
  }

  function drawImage(x, y){
    imageMode(CENTER);
    image (flyingimg, x, y, 200, 200)
  }

  /*function mousePressed(){
    if (isLooping()){
      noLoop();}
      else{
        loop();
      }
    }*/
      class Particle{
        constructor(){
          this.position = createVector(random(width), random(height));
          this.velocity = createVector(random(2,-2), random(2,-2));
          this.acceleration = createVector(random(-0.01,0.01), random(-0.01));
          this.age = 0;
          this.life = random(100, 700); 
          this.angle = random(TWO_PI);
          this.rotationSpeed = random(-0.05, 0.05);
          this.size = random(40, 50); 
          this.playSound = false;
          //this.lastPlayTime = 0;
          //this.playInterval = 1000;
        }
        update(){
          this.position.add(this.velocity);
          this.velocity.add(this.acceleration);
          this.angle += this.rotationSpeed;
          this.age++;
        }
        checkWalls(){
          if (this.position.x > width || this.position.x < 0 || this.position.y > height || this.position.y < 0){
            if (!this.playSound){
              audio1.play();
              this.playSound = true;
            }
          if (this.position.x > width){
            this.position.x --;
            this.velocity.x *= -2;
          }
          else if (this.position.x < 0){
            this.position.x ++;
            this.velocity.x *= -2;
          }
          if (this.position.y > height){
            this.position.y --;
            this.velocity.y *= -2;
          }
          else if (this.position.y < 0){
            this.position.y ++;
            this.velocity.y *= -2;
          }
        }
        else{
          this.playSound = false;
        }
      }
        show(){
          push();
          translate(this.position.x, this.position.y);
          rotate(this.angle);
          imageMode(CENTER);
          image(imgP,0,0, this.size, this.size);
          noStroke();
          pop();
        }
        isTheage(){
          return this.age > this.life;
        }
      }