let pos;
let vel;
let pos2;
let vel2;
let gridSize = 50; 
let dotSize = 20;
let timeOffset = 0; 


function preload(){
  flyingimg = loadImage('./p1.PNG');
}

function setup() {
    createCanvas(windowWidth,windowHeight);
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
  for(let x = 0; x < width; x += gridSize){
    for(let y = 0; y < height; y += gridSize){
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
    if (pos.x > width/2 || pos.x < 0) {
      vel.x *= -1;
    }
    if (pos.y > height - 50 || pos.y < 0) {
      vel.y *= -1;
    }

    if (pos2.x > width/2 || pos2.x < 0) {
      vel2.x *= -1;
    }
    if (pos2.y > height - 50 || pos2.y < 0) {
      vel2.y *= -1;
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