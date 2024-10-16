let textToDisplay = "The Lovers - Snowfall Before Christmas\n\nAs the snowflakes twirl gently down from the grey sky, Elena and Mansikka stroll through the charming streets of Finland, the air filled with the sweet aroma of freshly baked pastries. The quaint market stalls showcase a delightful array of festive treats, their colorful decorations bright against the winter landscape. The soft glow of lights casts a warm light on their faces, creating a magical atmosphere.\n\nWith their hands entwined, they wander toward a nearby bakery, drawn in by the scent of cinnamon and gingerbread. They share stories and dreams, each moment a testament to their blossoming friendship. The promise of Christmas fills the air as they make their way back to the Strawberry House, where the cozy warmth awaits. \n(Artist: JulyAnira)";
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
    playButton.style('border', '2px solid rgba(51, 13, 13, 0.7)');
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
    fill(51, 13, 13, 200); 
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
        window.location.href = "..";
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
