function setup() {
    createCanvas(windowWidth,windowHeight);
  }
  function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
    background(123,43,23);
  }  
  function draw() {
    background(123,43,23);
    rect(mouseX,mouseY,mouseX,mouseY);
    fill(255, 204, 0);

    //color
    let startColor = color(204, 0, 0);
    let endColor = color(32, 32, 32);
  
  for (let y=0; y<height; y++){
    let interA = map(y, 0, height, 0, 1);
    let c = lerpColor(startColor, endColor, interA);
    stroke(c);
    line(0, y, width, y);
  }
}