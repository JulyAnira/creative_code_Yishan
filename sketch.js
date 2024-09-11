let pos;
let vel;
let pos2;
let vel2;
let dotSize = 20;
let timeOffset = 0; 

let w;
let img1;
let mousetopicDistance = 100;


function preload(){
  flyingimg = loadImage('./p1.PNG');
  img1 = loadImage('IMG_2979.PNG');
  img2 = loadImage('IMG_2978.PNG');
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
    function setBackground(colors){
      for (let y = 0; y < height; y++) {
        //解释: colors.length - 1 is the last number of array
        let interColorIndex = map(y, 0, height, 0, colors.length - 1);
        let colorIndex = floor(interColorIndex);
        /* floor() 函数将 interColorIndex 向下取整，
        即舍去小数部分，得到一个整数索引 colorIndex。*/
        let inter = interColorIndex - colorIndex;
        /*inter 是一个在 [0, 1] 范围内的小数，
        用于表示当前行颜色在两个相邻颜色之间的渐变程度*/


        //(under) Used to define the color transition range for the current row
        let startColor = colors[colorIndex];
        /* (under) endColor is the next color, and 
        never exceed the last index of the array */
        let endColor = colors[min(colorIndex + 1, colors.length - 1)];
        let c = lerpColor(startColor, endColor, inter);

        stroke(c);
        line(0, y, width, y);

    }
  }


  function drawVector(){
    pos.add(vel);//necessary, renew the position
  }

  //flying strawberry head Img 1 (under)
  function drawImage(x, y){
    imageMode(CENTER);
    image (flyingimg, x, y, 200, 200)
  }

  function drawVector2(){
    pos2.add(vel2);//necessary, renew the position
  }

  //flying strawberry head Img 1 (under)
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