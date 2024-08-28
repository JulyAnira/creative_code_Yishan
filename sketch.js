function setup() {
    createCanvas(windowWidth,windowHeight);
  }
  
  function draw() {
    background(123,43,23);
    rect(mouseX,mouseY,mouseX,mouseY);
    fill(255, 204, 0);
  }
  function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
    background(123,43,23);
  }