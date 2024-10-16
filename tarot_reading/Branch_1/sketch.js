let textToDisplay = "Mansikka - The World: A Travel Beneath the Snow-Capped Peaks\n\nIn the serene meadows at the foot of the majestic snow-capped mountains, Mansikka wanders, her presence weaving magic through the air. With each step, the grass beneath her feet shimmers as if touched by a thousand fairy tales. She gathers stories from the gentle breeze, embracing the whispers of traveling cows and the laughter of children playing nearby. \n\nHere, amidst nature's splendor, she dances gracefully, embodying the harmony of the land. Each twirl sends ripples of warmth through the icy air, reminding the world that even in the coldest places, love and magic flourish. As she gazes at the peaks, she knows her journey is to connect the hearts of all who seek solace in their stories, ensuring that no dream is ever forgotten.\n(Artist:茶宿)";
let text2 = "Press the mouse to go back";
let currentIndex = 0; 
let typingSpeed = 50; 
let img1;
let audio; 
let playButton; // 声明播放按钮

function preload() {
  img1 = loadImage("bgpic.png");
  audio = loadSound('typping.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);  
  frameRate(60);
  
  // 创建播放按钮并设置位置
  playButton = createButton('Play Sound');
  playButton.position(20, 20); // 设置为左上角
  playButton.size(200, 50); // 设置按钮大小
  playButton.style('font-family', 'Special Elite'); // 使用自定义字体
  playButton.style('font-size', '24px'); // 设置字体大小
  playButton.style('background-color', 'rgba(255, 255, 255, 0.5)'); // 半透明背景
  playButton.style('border', '2px solid rgba(23, 12, 11, 0.7)'); // 设置边框颜色
  playButton.mousePressed(startAudio); // 设置点击事件
}

function startAudio() {
  // 请求音频上下文
  userStartAudio().then(() => {
    audio.loop(); // 循环播放音频
    playButton.hide(); // 隐藏按钮
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
    if (currentIndex >= textToDisplay.length) {
      audio.stop(); 
    }
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
