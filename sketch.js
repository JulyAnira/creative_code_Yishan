function setup() {
    createCanvas(windowWidth,windowHeight);
  }
  function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
    background(123,43,23);
  }  
  function draw() {
  let colors = [
    color(240, 174, 174),
    color(246, 105, 124),
    color(198, 43, 79),
  ] 
  setBackground(colors);

    function setBackground(colors){
      for (let y = 0; y < height; y++) {
        //ps: colors.length - 1 is the last number of array
        /* 通过map将y（行数）的范围‘0, height’映射到‘colors.length - 1’
        这个值通常为小数
        */
        let interColorIndex = map(y, 0, height, 0, colors.length - 1);
        let colorIndex = floor(interColorIndex);
        /* floor() 函数将 interColorIndex 向下取整，
        即舍去小数部分，得到一个整数索引 colorIndex。*/
        let inter = interColorIndex - colorIndex;
        /*inter 是一个在 [0, 1] 范围内的小数，
        用于表示当前行颜色在两个相邻颜色之间的渐变程度*/
        

        //Used to define the color transition range for the current row
        let startColor = colors[colorIndex];
        /* endColor is the next color, and 
        never exceed the last index of the array */
        let endColor = colors[min(colorIndex + 1, colors.length - 1)];
        let c = lerpColor(startColor, endColor, inter);

        stroke(c);
        line(0, y, width, y);

    }
  }
}