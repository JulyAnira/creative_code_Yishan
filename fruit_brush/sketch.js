let apples = [];
let bananas = [];
let brushSize = 30;
let mousePressedTime = 0;
let audioA1;
let audioClose;
let audioLoadSave;
let audioError;
let audioErase;
let drawApples = false;
let drawBananas = false;
let backgroundColors = [
  [176, 207, 56],
  [186, 91, 65],
  [143, 101, 166],
  [230, 198, 96],
  [155, 232, 227],
  [240, 117, 152],
  [120, 191, 155],
  [235, 143, 52],
  [61, 156, 89],
  [219, 158, 218],
  [247, 183, 221],
];
let currentBackgroundColorIndex = 0;
let isErasing = false;
let eraseColor;
let eraseButton;
let appleButton;
let bananaButton;

function preload() {
  audioA1 = loadSound('A1.wav');
  audioClose = loadSound('Close.wav');
  audioLoadSave = loadSound('LoadSave.wav');
  audioError = loadSound('Error.wav');
  audiobanana = loadSound('banana.wav');
  audioErase = loadSound('erase.flac');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fullscreen();
  
  apples.push(loadImage('Apple1.png'));
  apples.push(loadImage('Apple2.png'));
  apples.push(loadImage('Apple3.png'));
  bananas.push(loadImage('banana.png'));  
  
  imageMode(CENTER);
  background(backgroundColors[currentBackgroundColorIndex]);
  eraseColor =         color(backgroundColors[currentBackgroundColorIndex]);


  appleButton = createButton('apple brush');
  appleButton.position(10, 10);
  appleButton.mousePressed(() => toggleDrawing('apple'));

  bananaButton = createButton('banana brush');
  bananaButton.position(130, 10);
  bananaButton.mousePressed(() => toggleDrawing('banana'));


  let changeBackgroundButton = createButton('change background color');
  changeBackgroundButton.position(250, 10); 
  changeBackgroundButton.mousePressed(() => {
    audioLoadSave.play();
    changeBackgroundColor();
  });

  eraseButton = createButton('erase');
  eraseButton.position(10, 40);
  eraseButton.mousePressed(() => {
    audioError.play();
    toggleErasing(eraseButton);
  });
}

function draw() {
  if ((drawApples || drawBananas) && mouseIsPressed && !isErasing) {  // Modified for banana brush
    if (mouseX > 0 && mouseY > 50) {
      mousePressedTime += 1;
      push();
      translate(mouseX, mouseY);
      rotate(radians(frameCount));

      let randomBrush;
      if (drawApples) {
        randomBrush = random(apples);
        if (!audioA1.isPlaying()) {
          audioA1.play();
        }
      } else if (drawBananas) {
        randomBrush = random(bananas);
        if (!audiobanana.isPlaying()) {
          audiobanana.loop(); 
        }
      }
      image(randomBrush, 0, 0, brushSize, brushSize);

      pop();

    }
  } else if (isErasing) {
    if (!audioErase.isPlaying()) {
      audioErase.loop();
    }
  } else {
    mousePressedTime = 0;
    audiobanana.stop();
    audioErase.stop();
  }
  
  fill(backgroundColors[currentBackgroundColorIndex]);
  textSize(17);
  fill(0, 0, 0);
}

function toggleErasing(button) {
  isErasing = !isErasing;

  if (isErasing) {
    button.html('stop erasing');
    cursor('img1.png');
  } else {
    button.html('erase');
    cursor();
  }
}

function toggleDrawing(brushType) {
  if (brushType === 'apple') {
    drawApples = !drawApples;
    drawBananas = false;
    if (isErasing) {
      toggleErasing(eraseButton);
    }
    if (drawApples) {
      appleButton.html('stop drawing');
      bananaButton.html('banana brush');
    } else {
      appleButton.html('apple brush');
    }
  }

  if (brushType === 'banana') {
    drawBananas = !drawBananas;
    drawApples = false;
    if (isErasing) {
      toggleErasing(eraseButton);
    }
    if (drawBananas) {
      bananaButton.html('stop drawing');
      appleButton.html('apple brush');
    } else {
      bananaButton.html('banana brush');
    }
  }

  console.log('drawApples:', drawApples, 'drawBananas:', drawBananas);
  console.log('appleButton:', appleButton.html(), 'bananaButton:', bananaButton.html());
}

function keyPressed() {
  if (key === 'C' || key === 'c') {
    if (!audioClose.isPlaying()) {
      audioClose.play();
    }
    background(backgroundColors[currentBackgroundColorIndex]);
    eraseColor = color(backgroundColors[currentBackgroundColorIndex]);
    
  }
}

function changeBackgroundColor() {
  currentBackgroundColorIndex = (currentBackgroundColorIndex + 1) % backgroundColors.length;
  background(backgroundColors[currentBackgroundColorIndex]);
  eraseColor = color(backgroundColors[currentBackgroundColorIndex]);
}

function mouseDragged() {
  if (isErasing) {
    noStroke();
    fill(eraseColor);
    let eraserSize = brushSize * 2.2;
    rect(mouseX, mouseY, brushSize, brushSize);
    let imgSize = brushSize * 4;
    image(loadImage('img1.png'), mouseX - imgSize / 2, mouseY - imgSize / 2, imgSize, imgSize);
  }
}
