let textToDisplay = "Filia - Death: The Whisper of Shadows\n\nIn the dim corners of the ancient library, Filia stands beside her blackened guiding lamp, an ethereal presence lost in thought. She wanders through the rows of forgotten tomes, her expression distant and contemplative. The whispers of the past surround her, yet she remains unaware of the intricate games of fate unfolding around her. With each flicker of the lamp's flame, shadows dance on the walls.\n\nFilia is a being of mystery, unable to recall the full extent of her powers, drifting through the silence like a specter, caught between life and death. In her solitude, she searches for meaning, unaware of the fate that lies within her grasp.\n(Artist: JulyAnira)";
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
  playButton.style('border', '2px solid rgba(49, 36, 87, 0.7)');
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
  fill(255, 255, 255, 200); 
  stroke(49, 36, 87);
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
  }
  
  if (currentIndex >= textToDisplay.length) {
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
