let state = "close"; 
let video;
let audio1;
let label = "none";
let classifier;
let imageModelURL = "https://teachablemachine.withgoogle.com/models/GFs544U5s/";
let selectedEffect = null;
let describe = "";
let img1;
let img2;
let img3;
let stars = [];
let imageFound = false;

const chooseTheCard = {};
const cards = {
  //0
  "THE FOOL": [
    //pink
    "Ah, the journey begins...\nso light, so unaware of the fate that awaits. \nThis one walks a path that transcends time, \nmuch like my own, \nstepping into the unknown with a smile. \nSuch freedom, yet such ignorance.",
    "The Fool walks blindly into the future, \nunaware of the looming end. \nI envy that naivety. \nHow blissful it must be to not feel the weight of time pressing ever forward.",
    //green
    "A new journey begins, unmarked by fear. \nInnocence guides my steps, \nlike the first shoots of spring breaking through the frost. \nYet, what lies ahead in this vast world, I cannot know.",
    "I step into the unknown, \nguided by the whispers of my parents’ memories. \nEach step on this new journey carries the essence of my past, \nunmarked by fear but rich with possibility.",
    //purple
    "Every beginning holds the promise of an unknown journey. \nEmbrace your naïveté and step forth.",
    "Embrace the unknown; \nevery step you take is a new beginning, filled with potential.",
    "Branch_2"
  ],
  //1
  "THE MAGICIAN": [
    //pink
    "Ah, the one who commands the elements, \nbending reality to their will. \nA reminder that we create our own destiny, \nthough some things, like the laws of the world's end, \nremain beyond even our control.",
    "The power to manifest, to bring forth what one desires... \nbut power alone cannot break the laws that govern this world. \nEven magic has its limits.",
    //green
    "The power to create, to weave the threads of magic... \nA reminder that within us lies the ability to shape our own destiny. \nBut I must remember, not all magic is meant for my hands.",
    "I weave the threads of creation with ancient knowledge. \nThough I do not wield magic like others, \nmy craftsmanship transforms the mundane into the extraordinary—my arrows are my voice.",
    //purple
    "With power at your fingertips, \nchannel your unique abilities wisely. \nTransformation lies within.",
    "Your innate powers can shape reality. \nHarness your skills to create the life you desire.",
  ],
  //2
  "THE HIGH PRIESTESS": [
    //pink
    "Secrets hidden in the shadows... \nThe veil between worlds is thin here. I know this well. \nWhat lies beyond is not always meant to be understood by mortals.",
    "Knowledge hidden beneath the surface. \nI have long sought such truths, \nbut I wonder, do we truly want to uncover what lies beyond the veil? \nNot all knowledge brings peace.",
    //green
    "Wisdom hidden in the depths of the forest, \nsecrets whispered by the leaves. \nI have learned to listen, \nto trust in the knowledge the world has gifted me, \nbut some truths are too heavy to bear.",
    "In the stillness of the forest, \nI unlock secrets that lie buried deep. \nThe language of the ancients flows through me, \na gift from my mother, \nconnecting me to the wisdom of my ancestors.",
    //purple
    "Secrets linger in the shadows. \nTrust your intuition to guide you through the mysteries of existence.",
    "Trust your inner voice; \nwisdom lies in the depths of your heart, \nwaiting to be uncovered.",
  ],
  //3
  "THE EMPRESS": [
    //pink
    "Creation, fertility, life flourishing... \nbut all things must ripen, then fade. \nEven the sweetest strawberry must wither eventually, \na law I cannot escape.",
    "A card of abundance and life. \nYet, as sweet as this card may seem, \nall things that grow must wither. \nSuch is the nature of time, \neven in a land of eternal sweetness.",
    //green
    "Nurturing and abundance surround me, \nyet I feel the ache of loss. \nThe beauty of the forest cradles my heart, \nyet I am reminded that even the most vibrant blossoms must eventually fade.",
    "Nurtured by the forest’s embrace, \nI learn the balance of life and death. \nMy arrows bring protection, not destruction; \nthe bounty of nature feeds my spirit and fills the void of my heart.",
    //purple
    "Nurture the flickers of warmth within, \neven amidst the coldness of your heart. \nGrowth can arise from sorrow.",
    "Even amidst detachment, \nallow yourself to nurture and grow. \nHealing can emerge from pain."
  ],
  //4
  "THE EMPEROR": [
    //pink
    "Structure, order, rules... \nThese are not my allies. \nStill, even in defiance, \nI must acknowledge their necessity in the dance of life and death.",
    "Authority, structure... \nThese are pillars that hold up civilizations, \nbut even they crumble in time. \nI have seen empires fall, \nleaving only dust and memory.",
    //green
    "Stability and order, \nthe pillars that hold up this peaceful realm. \nThough I cherish the calm of Zela, \nI wonder how long this peace can endure in the face of rising shadows.",
    "The strength of my lineage flows within me. \nI honor my father’s bravery and my mother’s wisdom, \nunderstanding that leadership requires both gentleness and resolve.",
    //purple
    "Structure and authority may seem distant, \nyet your influence quietly shapes the world around you.",
    "Establishing control may feel distant, \nyet your presence commands influence in unseen ways."

],
  //5
  "THE HIEROPHANT": [
    //pink
    "Tradition and wisdom handed down through the ages. How quaint. \nI have seen many such teachings lost to time, \nthough some truths endure longer than others.",
  "Tradition, sacred knowledge... \nIt binds us, yet it also blinds us. \nI have lived long enough to know that some rules are meant to be broken, \nthough not without consequence.",
  //green
    "Traditions bind us, yet they can also liberate. \nI have witnessed the wisdom of the ages, \nand I seek to understand what knowledge must be preserved, \neven as new paths emerge.",
    "Traditions of old echo through my memories. \nI seek to preserve the lore of my people, \nfor in the knowledge passed down, \nI find my purpose and a connection to my roots.",
    //purple
    "Tradition binds us, \nbut it can also provide strength. \nSeek knowledge from the sacred tomes.",
    "Tradition holds power. \nSeek guidance from the knowledge of the ancients to navigate your path."


  ],
  //6
  "THE LOVERS": [
    //pink
    "Ah, a choice... \nsuch sweet harmony, yet often bittersweet. \nEven love can wither, as the end of all things approaches, \nbut in the fleeting moments, \nit is a warmth worth savoring.",
  "Ah, love... a union of two, a merging of paths. \nBut what of those who must walk alone? \nI have watched many lovers part, \ntheir sweetness turned to sorrow.",
  //green
  "A bond forged in harmony, yet I stand alone. \nLove weaves connections, but loss lingers in my heart. \nIn this vast world, I long for companionship, \neven as I cherish my solitude.",
  "Connections forged in the heart of the forest, \nyet I feel the weight of solitude. \nLove for my parents binds me to the past, \neven as I seek companionship in a world filled with strangers.",
  //purple
  "Connections are both a blessing and a burden. \nNavigate your relationships with care.",
  "Relationships are a double-edged sword. \nApproach connections with intention and care.",
  "Branch_4"],
  //7
  "THE CHARIOT": [
    //pink
    "Victory through determination... \nbut how long can one maintain control? \nNo matter how far or fast we run, \ntime catches up with us all. \nI, too, once sought to outrun fate.",
  "Victory through willpower. \nYet where do we drive ourselves? \nWe push forward, but to what end? \nI have traveled through time and space, \nbut some destinations cannot be reached.",
  //green
  "Determination guides my path, \nas I navigate the twists of fate. \nYet, I must remain grounded, \nfor the road ahead is fraught with uncertainty, \nand even the strongest hearts can falter.",
  "With determination, \nI navigate the paths of Zela. \nMy journey is one of self-discovery, \nharnessing the strength of my spirit while respecting the rhythm of the world around me.",
  //purple
  "Your determination can drive you forward. \nControl your path and conquer the tumult of your past.",
  "Your willpower propels you forward. \nTake charge of your journey and confront your past."],
  //8
  STRENGTH: [
    //pink
    "To master one's own instincts, \nto be gentle and fierce in equal measure. \nThere is power in restraint, \nbut even that cannot shield one from the inevitable.",
    "True strength lies in patience, \nin controlling one's desires. \nI have learned this over countless years, \nyet I still wonder... is there a strength that can overcome fate itself?",
    //green
    "True strength lies in gentleness, \nin the courage to face the unknown. \nI may be soft, but my spirit is resilient, \nand within me flows the quiet power of the forest.",
    "True strength comes from within, \nfrom the quiet courage to face my pain. \nI may carry scars, but they are a testament to my resilience, \na reminder of the love that shaped me.",
    //purple
    "Inner courage often hides beneath a veneer of indifference. \nFace your fears with a silent resolve.",
    "True courage often hides behind a façade of apathy. \nFace your inner demons with quiet resilience."
],
  //9
  "THE HERMIT": [
    //pink
    "Solitude, seeking knowledge in the dark. \nHow familiar this is to me... \nBut beware, the light you hold may only reveal more questions, \nnot answers.",
  "Solitude, reflection. \nThe Hermit seeks answers in isolation, just as I do. \nBut some answers cannot be found in the quiet... \nsome must be faced in the chaos of life.",
  //green
  "In solitude, I find clarity. \nThe Border Forest is my sanctuary, \nwhere I reflect on the world beyond. \nYet, I cannot help but feel the pull of the outside, calling me to explore.",
    "In the solitude of my treehouse, I find clarity. \nThe forest’s heart is my sanctuary, \nwhere I reflect on the world beyond and seek the answers hidden within.",
    //purple
    "In solitude, find the answers you seek. \nReflection reveals the way through darkness.",
    "Solitude is a sacred space for reflection. \nIn silence, you may discover your true direction."

],
  //10
  "WHEEL of FORTUNE": [
    //pink
    "Ah, the wheel spins... \nHow many times have I watched its turning? \nFate’s cycle is relentless, and yet, \nI still wonder if one can ever break free from its pull.",
  "The ever-turning wheel, \na dance of fate that none can escape. \nI’ve seen this wheel turn many times, \nand though I resist, its pull remains inevitable.",
  //green
  "The wheel spins, carrying us through the cycles of fate. \nIn this moment of tranquility, \nI wonder what awaits me when the wheel turns once more. \nWill it bring harmony or chaos?",
  "The wheel turns, carrying the echoes of my past into the future. \nI embrace the cycles of fate, \nknowing that every ending opens the door to new beginnings.",
  //purple
  "Cycles turn endlessly. \nEmbrace change, \nfor it may bring unexpected fortune.",
  "Life's cycles are ever-turning. \nEmbrace the ebb and flow, \nas change brings new opportunities."],
  //11
  JUSTICE: [
    //pink
    "Balance, fairness. \nThe scales tip as they must, \nthough I often wonder if justice exists beyond this world... \nI seek a justice that defies the finality of fate.",
  "Balance and fairness... \nBut what justice is there in a world where all must end? \nI wonder if there is a justice beyond this life, \nwhere the rules of time no longer apply.",
  //green
  "Balance, fairness... the essence of Zela’s tranquility. \nYet, I see cracks forming beneath the surface. \nHow do we maintain equilibrium when the scales tip toward darkness?",
  "Balance is the essence of my existence. \nAs I witness the shifts in Zela, \nI must advocate for fairness and truth, \nensuring that the legacy of my parents is honored.",
  //purple
  "Balance must be restored. \nSeek truth, \nfor it will guide you through the labyrinth of your existence.",
    "Truth must prevail. \nStrive for balance, \nfor fairness will guide you through challenges."

],
  //12
  "THE HANGER MAN": [
    //pink
    "Suspended between worlds, waiting for clarity... \nThis one has accepted their fate for now, \nbut oh, how much more they have to learn. \nSometimes, it’s in stillness that we find our way.",
  "Suspended, waiting for a new perspective. \nI, too, have waited... for lifetimes, hoping to see the world differently. \nYet some truths remain unchanged, \nno matter how we look at them.",
  //green
  "Suspended between worlds, \nwaiting for enlightenment. \nI have learned to embrace stillness, for in quiet moments, \nthe answers often reveal themselves like sunlight filtering through leaves.",
  "Suspended in time, I seek a new perspective. \nThe forest teaches me patience; \nsometimes, the answers reveal themselves \nwhen I let go and allow life to unfold.",
  //purple
  "Let go of control. \nSometimes surrendering opens new perspectives and paths.",
  "Surrender control and shift your perspective. \nSometimes, letting go reveals new pathways."],
  //13
  DEATH: [
    //pink
    "Ah, yes... this card. \nThe end and the beginning, intertwined like vines. \nI know this truth well. We all must face it, \nthough I wonder... is there a way to rewrite this chapter?",
  "The end that is not an end. \nDeath is a transformation, yes, \nbut it is still a loss. \nI have seen many endings, and I know... \nit comes for us all, even me.",
  //green
  "Transformation, an ending that leads to a new beginning. \nI have seen the cycle of life and death in the forest. \nThough loss brings sorrow, \nit also paves the way for rebirth.",
    "Transformation lies at the heart of existence. \nThe cycle of life and death is a part of my journey; \nthrough loss, I learn to cherish what remains and embrace the rebirth that follows.",
    //purple
    "Embrace transformation, \nas endings herald new beginnings. \nLife's cycle continues.",
    "Transformation is essential. \nEmbrace endings, \nas they pave the way for fresh beginnings.",
    "Branch_3"
    

],
  //14
  TEMPERANCE: [
    //pink
    "Harmony, balance between extremes... \nThe key to life is in finding this delicate blend. \nBut how can one balance a life that is destined to end? \nI still search for the answer.",
  "Balance, the blending of opposites. \nI have spent so long seeking this harmony, \nbetween life and death, between hope and despair. \nBut can such a balance ever be truly found?",
  //green
  "Harmony in balance, the mingling of light and shadow. \nI seek to cultivate peace within, \nas the world outside shifts. \nThe secret lies in embracing both sides of my heart.",
  "Harmony in the balance of nature and spirit. \nI blend my heritage with my present, \nseeking peace within as I navigate the complexities of the world outside the forest.",
    //purple
    "Balance your powers; \nharmony arises from the blending of light and dark.",
    "Seek harmony in your actions. \nThe blending of light and shadow leads to inner peace."

],
  //15
  "THE DEVIL": [
    //pink
    "Temptation, chains... \nIt’s easy to become trapped by desire or fear. \nYet I feel neither, only the weight of inevitability. \nPerhaps that is its own chain.",
  "Chains, temptations... \nIt is easy to become trapped in desire. \nYet my chains are not of the heart, but of time itself. \nHow does one break free of a fate already written?",
    //green
    "Temptations linger, like shadows in the forest. \nI must guard against the allure of despair, \nfor even the gentlest heart can be swayed by darkness. \nStrength lies in choosing the light.",
    "Temptations lurk in the shadows of the forest. \nI must guard my heart against despair, \nfor true freedom comes from recognizing and overcoming the chains that bind me.",
    //purple
    "Temptations may ensnare you. \nRecognize them, \nbut do not allow them to define you.",
    "Recognize the temptations that ensnare you. \nThey do not define you; awareness is liberation."

],
  //16
  "THE TOWER": [
    //pink
    "Destruction, sudden and inevitable. \nHow many towers have I seen crumble? How many more will fall? \nThere is power in accepting that from chaos, \nsomething new always rises.",
  "Destruction, sudden and swift. \nI have seen towers fall, seen worlds collapse. \nBut from the ruins, new life always springs. \nStill, not all destruction can be rebuilt.",
  //green
  "A sudden upheaval, a shattering of illusions. \nI have seen peace crumble in the face of chaos, \nbut from the ruins, new growth often emerges. \nWe must embrace change, \neven when it is painful.",
  "A sudden upheaval shatters the calm, \nbut from the wreckage, new truths emerge. \nI must be prepared to embrace change, \neven when it disrupts the world I hold dear.",
    //purple
    "Chaos often precedes rebirth. \nEmbrace the upheaval, \nfor it clears the way for renewal.",
    "Chaos may disrupt your life, \nbut from turmoil arises renewal. \nEmbrace the upheaval for growth."



],
  //17
  "THE STAR": [
    //pink
    "Hope... such a fragile thing, but beautiful, nonetheless. \nIt shines brightest when the night is darkest, \na guiding light, though even stars fade in time.",
  "A glimmer of hope, distant but bright. \nI have followed such stars through the darkest nights. \nThey guide us, but even stars burn out eventually.",
  //green
  "Hope shines bright, a beacon in the night. \nIn my solitude, I reach for the stars, \nbelieving that even the darkest moments can be illuminated by a single glimmer of faith.",
  "Hope shines like a beacon in my heart. \nIn my solitude, I reach for the stars, \nbelieving that the light of my parents’ love \nwill guide me through the darkness.",
  //purple
  "Hope flickers, a guiding light amidst despair. \nTrust in the possibility of brighter days.",
  "Hope shines brightly in the darkness. \nTrust in its light; \nbrighter days are on the horizon."],
  //18
  "THE MOON": [
    //pink
    "Illusions, dreams... \nThe moon hides as much as it reveals. \nBe wary, for what you see may not be what is true. \nYet in those shadows, \nthere is always a path forward.",
  "Illusion, mystery... \nThe Moon reflects light but hides as much as it reveals. \nI walk in the shadows it casts, \nseeking truths that remain just out of reach.",
  //green
  "Illusions dance like shadows among the trees. \nI tread carefully through the mysteries that surround me, \nknowing that not all is as it seems. \nI must trust my instincts to guide me.",
  "Illusions dance among the shadows. \nI tread carefully, trusting my instincts to navigate the mysteries of the forest \nand the unknown paths of my journey.",
  //purple
  "Illusions can mislead. \nNavigate your path with caution, \nand trust your instincts.",
  "Illusions can cloud your path. \nProceed with caution, \nallowing your intuition to guide you."],
  //19
  "THE SUN": [
    //pink
    "Ah, light and joy! How radiant, yet fleeting... \nI have basked in such warmth before, \nbut it never lasts, always setting, always fading.",
    "The Sun brings joy and clarity, but even it cannot last forever. \nI have basked in its warmth, \nonly to feel the coldness that follows when it sets.",
    //green
    "Joy radiates, a reminder of the beauty that exists in the world. \nI cherish the moments of light, \neven as I understand that the sun must set, giving way to the night.",
    "Joy radiates within, \na reminder of the beauty I can still find. \nThe light of hope breaks through the shadows, \nilluminating my path as I seek to connect with the world.",
    //purple
    "Joy and clarity await. \nLet the warmth of hope illuminate your journey.",
    "Joy and clarity are within reach. \nLet the warmth of positivity illuminate your journey."
],
  //20
  JUDGEMENT: [
    //pink
    "Awakening, rebirth... but to what? \nIs it truly a new beginning, \nor just another turn of the wheel? \nI’ve seen too many resurrections to trust in finality.",
  "A call to rise, to awaken... But to what? \nI wonder if true rebirth is possible, \nor if we are only ever shifting from \none form of existence to another.",
  //green
  "Awakening to new possibilities, \na call to rise from the depths of solitude. \nI feel the pull of change, \nurging me to embrace the world beyond the forest and discover what awaits.",
  "Awakening to the call of destiny, \nI feel the urge to rise from the depths of solitude. \nThe legacy of my parents beckons me to explore and understand my purpose in Zela.",
  //purple
  "Awaken to your true self. \nReflection reveals the depth of your journey and the choices ahead.",
  "Awaken to your true purpose. \nSelf-reflection unveils the depth of your choices and their impact."],
  //21
  "THE WORLD": [
    //pink
    "Completion... the end of a journey, \nyet also the start of another. \nThe world turns, cycles close, \nbut does anything truly end? \nI still search for the answer.",
  "Completion, the end of a journey. \nI have walked this path many times, yet I still wonder... \nwhen the world ends, is it truly the end? \nOr does another cycle begin?",
  //green
  "Completion, the tapestry of my life woven with threads of joy and sorrow. \nAs I stand at the edge of my forest, \nI ponder the vastness of Zela and what it means to belong to this world.",
    "Completion lies in the harmony of my existence. \nI stand at the edge of the forest, \ncontemplating the vastness of Zela, \nwhere every thread of my life weaves \ninto the grand tapestry of this world.",
    //purple
    "Completion is within reach. \nCelebrate your journey, \nfor it intertwines with the fate of others.",
    "Completion is near. \nCelebrate your journey; \nit intertwines with the fates of those around you.",
    "Branch_1"
],
};
const colorEffects = {
  effects1: [mansikka],
  effects2: [elena],
  effects3: [filia],
};
let particles = [];

function preload() {
  classifier = ml5.imageClassifier('MobileNet');
  img1 = loadImage("p1.png");
  img2 = loadImage("p2.png");
  img3 = loadImage("p3.png");
  audio1 = loadSound('Accept.mp3');

  classifier = ml5.imageClassifier(imageModelURL + "model.json", {
    flipped: true,
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
   for (let k = 0; k < 100; k++) {
    stars.push(new Star(random(width), random(height), random(5, 15)));
  }
  video = createCapture(VIDEO, { flipped: true });
  video.size(320, 240);
  video.hide();
  classifier.classifyStart(video, gotResult);
}

function classifyVideo() {
  classifier.classify(video, gotResult);
}

function draw() {
  background(10, 10, 30);
  //backgraound
    for (let star of stars) {
    star.update();
    star.display();
  }
  push();
  let xvideo = width / 2;
  let yvideo = height / 2 - 150;
  imageMode(CENTER);
  image(video, xvideo, yvideo, 480, 360);
  pop();
  
  //3 particles effects
    for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].isOffScreen()) {
      particles.splice(i, 1); // Remove off-screen particles
    }
  }

if (state === "open") {
    if (selectedEffect) {
      selectedEffect(); // Show the effect
    }
  textSize(20);
  textAlign(CENTER, CENTER);
  textFont("Special Elite");
  fill(255);
  text(describe, width / 2, height - 75); // Show the card description
  } else {
    textSize(20);
    textAlign(CENTER, CENTER);
    textFont("Special Elite");
    fill(255);
    text("Keep your cards close to the camera.\nMake sure the deck fills the camera and is not upside down.", width / 2, height / 2 + 150);
  }

}
class Star {
  constructor(xStar, yStar, sizeStar) {
    this.x = xStar;
    this.y = yStar;
    this.size = sizeStar;
    this.alpha = random(100, 255);
    this.speed = random(0.1, 0.5);
  }

  update() {
    this.y -= this.speed;
    if (this.y < -this.size) {
      this.y = height + this.size;
      this.x = random(width);
    }

    this.alpha = 100 + 155 * sin(frameCount * 0.1 + this.x * 0.1);
  }

  display() {
    fill(255, this.alpha, 200, this.alpha);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function cardCheck(label) {
  //decide the random label
 if (cards[label]) {
    let randomIndex = floor(random(cards[label].length));
    describe = cards[label][randomIndex];

    if (randomIndex < 2) {
      selectedEffect = colorEffects.effects1[0];
      createParticles(255, 182, 193);
      audio1.play();
    } else if (randomIndex < 4) {
      selectedEffect = colorEffects.effects2[0];
      createParticles(157, 201, 85);
      audio1.play();
    } else {
      selectedEffect = colorEffects.effects3[0];
      createParticles(213, 168, 240);
      audio1.play();
    }

if (describe === "Branch_1") {
      window.location.href = 'branch_1';
    } else if (describe === "Branch_2") {
      window.location.href = 'branch_2';
    }
   else if (describe === "Branch_3") {
      window.location.href = 'branch_3';
    }
   else if (describe === "Branch_4") {
      window.location.href = 'branch_4';
    }
  } else {
    describe = "No description for this label";
    selectedEffect = null;
  }

}

function createParticles(baseR, baseG, baseB) {
  for (let i = 0; i < 100; i++) {
    // Generate a random factor to create variations in lightness
    let variation = random(-50, 50);
    let r = constrain(baseR + variation, 0, 255);
    let g = constrain(baseG + variation, 0, 255);
    let b = constrain(baseB + variation, 0, 255);
    
    // Create a new particle with the generated color
    particles.push(new Particle(random(width), random(height), r, g, b));
  }
}


class Particle {
  constructor(x, y, r, g, b) {
    this.x = x;
    this.y = y;
    this.size = random(5, 15);
    this.speedX = random(-2, 2);
    this.speedY = random(-2, -0.5);
    this.color = [r, g, b];
    this.lifespan = 255;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.lifespan -= 4; // Fade out effect
  }

  show() {
    fill(this.color[0], this.color[1], this.color[2], this.lifespan);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }

  isOffScreen() {
    return this.lifespan < 0;
  }
}

function mansikka() {
  push();
  fill(255, 182, 193, 150);
  stroke(255, 182, 193);
  strokeWeight(4);
  let rectX = width / 2 - 250;
  let rectY = height - 210;
  let rectWidth = 500;
  let rectHeight = 50;
  rect(rectX, rectY, rectWidth, rectHeight, 20);
  pop();
  push();
  textFont("Sacramento");
  textAlign(CENTER, CENTER);
  textSize(35);
  fill(255, 242, 248);
  text("✨Mansikka says:✨", rectX + rectWidth / 2 + 30, rectY + rectHeight / 2);
  pop();
  stroke(196, 59, 96);
  strokeWeight(2);
  image(img1, width / 2 - 300, height / 2 , 216, 288);
}

function elena() {
  push();
  fill(157, 201, 85, 150);
  stroke(157, 201, 85);
  strokeWeight(4);
  let rectX = width / 2 - 250;
  let rectY = height - 210;
  let rectWidth = 500;
  let rectHeight = 50;
  rect(rectX, rectY, rectWidth, rectHeight, 20);
  pop();
  push();
  textFont("Sacramento");
  textAlign(CENTER, CENTER);
  textSize(35);
  fill(246, 255, 230);
  text("✨Elena says:✨", rectX + rectWidth / 2 + 30, rectY + rectHeight / 2);
  pop();
  stroke(125, 83, 67);
  strokeWeight(2);
  image(img2, width / 2 - 300, height / 2 , 216, 288);
}

function filia() {
  push();
  fill(213, 168, 240, 150);
  stroke(213, 168, 240);
  strokeWeight(4);
  let rectX = width / 2 - 250;
  let rectY = height - 210;
  let rectWidth = 500;
  let rectHeight = 50;
  rect(rectX, rectY, rectWidth, rectHeight, 20);
  pop();
  push();
  textFont("Sacramento");
  textAlign(CENTER, CENTER);
  textSize(35);
  fill(248, 235, 255);
  text("✨Filia says:✨", rectX + rectWidth / 2 + 30, rectY + rectHeight / 2);
  pop();
  stroke(114, 89, 168);
  strokeWeight(2);
  image(img3, width / 2 - 300, height / 2 , 216, 288);
}

function gotResult(results) {
  //console.log(results);
  // we identified a card!! exciting :)
  if (results[0].confidence > 0.98 && imageFound == false) {
    label = results[0].label;
    cardCheck(label);
    state = "open"; 
    imageFound = true;

    setTimeout(function () {
      imageFound = false;
      label = "none";
      state = "close";
    }, 2000);
  }
  let confidence = "Confidence: " + nf(results[0].confidence, 0, 2);
}
