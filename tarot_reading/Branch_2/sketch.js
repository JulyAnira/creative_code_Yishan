let textToDisplay = "Elena - The Fool: Dancing with the Forest\n\nIn the heart of the forest, Elena leaps lightly between moss-covered stones, the cool mountain stream rushing beneath her feet. A white deer bounds ahead, its graceful form leading the way, while squirrels dart playfully through the trees around her. Her bow swings at her side, but today, there is no need for it. The forest hums with life, and for a moment, Elena feels free from the weight of her memories. \n\nThe sun filters through the canopy, casting dappled shadows on the ground, and the crisp air carries the scent of pine and earth. As she follows the deer deeper into the woods, a sense of belonging fills her heart. With every step, the echoes of her past seem to soften, and her journey into the unknown feels less daunting. Elena smiles softly, knowing that she is not alone—this living forest, in all its beauty, walks with her.\n(Artist:茶宿)";
let text2 = "Press the mouse to go back";
let currentIndex = 0; 
let typingSpeed = 50; 
let img1;
let audio; 
let playButton;

function preload() {
  img1 = loadImage("bgpic.png");
  audio = loadSound('typping.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);  
  frameRate(60); 

  playButton = createButton('Play Sound');
  playButton.position(20, 20);
  playButton.size(200, 50);
  playButton.style('font-family', 'Special Elite');
  playButton.style('font-size', '24px');
  playButton.style('background-color', 'rgba(255, 255, 255, 0.5)');
  playButton.style('border', '2px solid rgba(23, 12, 11, 0.7)');
  playButton.mousePressed(startAudio);
}

function startAudio() {
  userStartAudio().then(() => {
    audio.loop();
    playButton.hide();
  });
}

function draw() {
  background(255); 
  let aspectRatio = img1.width / img1.height; 
  let newWidth, newHeight;

  if (img1.width > img1.height) {
    newWidth = width; 
    newHeight = width / aspectRatio; 
  } else {
    newHeight = height; 
    newWidth = height * aspectRatio; 
  }

  let x = (width - newWidth) / 2;
  let y = (height - newHeight) / 2;

  image(img1, x, y, newWidth, newHeight); 
  textSize(30);
  fill(23, 12, 11, 200); 
  stroke(255, 250, 250);
  strokeWeight(2); 
  textAlign(LEFT, TOP);
  textFont("Special Elite");
  
  let displayedText = textToDisplay.substring(0, currentIndex); 
  let cursor = "_"; 
  text(displayedText + cursor, 20, 100, width - 40, height - 40); 
  
  if (frameCount % (typingSpeed / 1000 * 30) === 0 && currentIndex < textToDisplay.length) {
    currentIndex++; 
  }
  
  if (currentIndex >= textToDisplay.length) {
    audio.stop(); 
    fill(255); 
    noStroke(); 
    textAlign(CENTER, BOTTOM); 
    text(text2, width / 2, height - 50);
    textSize(35);
  }
}

function mousePressed() {
  if (currentIndex >= textToDisplay.length) {
    window.open("https://julyanira.github.io/creative_code_Yishan/tarot_reading/");
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
