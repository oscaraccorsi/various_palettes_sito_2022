let baseURLImage = 'https://oscaraccorsi.github.io/pictures/';
let logo;
let xLogo;


let palette = [];
let bubbles = [];
let palettes = [];
let distance = [10, 15, 25, 40];

let X;
let Y;
let dist;

let img;
let coeff = 5;

let dataFlow;
let rate;
let vol;

let c1;
let fibo = [5, 8, 13, 21, 34, 55, 89];
let many;

function preload() {
 logo = loadImage(baseURLImage + 'good one white.png'); 
 dataFlow = loadSound('assets/flow1.mp3'); 
 palettes[0] = loadImage('assets/pal0.png');
 palettes[1] = loadImage('assets/pal1.png'); 
 palettes[2] = loadImage('assets/pal2.png');
 palettes[3] = loadImage('assets/pal3.png');
 palettes[4] = loadImage('assets/pal4.png'); 
 palettes[5] = loadImage('assets/pal5.png'); 
 palettes[6] = loadImage('assets/pal6.png'); 
 palettes[7] = loadImage('assets/pal7.png');
 palettes[8] = loadImage('assets/pal8.png');
 palettes[9] = loadImage('assets/pal9.png');  
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  xLogo = windowWidth-40;
  setInterval(resetSketch, 1000*120);
  img = random(palettes);
  img.resize(100, 200);
  img.loadPixels();
  
  
  
  frameRate(10);
  //background(10);
  many = random(fibo);
  X = random(50, windowWidth-50);
  Y = random(0, windowHeight/2);
  dist = int(random(distance));
  
  
  for (let i=0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i]; 
    let g = img.pixels[i+1]; 
    let b = img.pixels[i+2]; 
    let c = color(r, g, b, 50);
    palette.push(c);    
  }
  
  for (let i = 0; i < many; i++) {
    let x = X;
    let y = Y+i*dist;
    let col = random(palette);
    let dim = int(random(1, 5));
    bubbles[i] = new Bubble (x, y, col, dim);
  }
  rate = random(0.5, 1);
  dataFlow.play(0,rate);
  dataFlow.loop();
  vol = 1;
  
  reverb = new p5.Reverb();
  reverb.process(dataFlow, 3, 0, false);
}

function draw() {
  dataFlow.setVolume(vol);
  vol = vol - 0.00075;
  if (vol <= 0) {
    vol = 0;
  }
  coeff += 0.2 ;
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
    
    
  }  
}
function resetSketch() {
  //save();
  clear();
  //background(10);
  bubbles = [];
  palette = [];
  X = random(100, windowWidth-100);
  Y = random(50, windowHeight/2);
  dist = int(random(distance));
  coeff = 5;
  
  
  
  img = random(palettes);
  img.loadPixels();
  img.resize(100, 200);
  
  
  for (let i=0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i]; 
    let g = img.pixels[i+1]; 
    let b = img.pixels[i+2]; 
    let c = color(r, g, b, 50);
    palette.push(c);    
  }
  
  many = random(fibo);
  
  for (let i = 0; i < many; i++) {
    let x = X;
    let y = Y+i*dist;
    let col = random(palette);
    let dim = int(random(1, 5));
    
    bubbles[i] = new Bubble (x, y, col, dim); 
  }  
  rate = random(0.5, 1);
  dataFlow.stop();
  dataFlow.play(0,rate);
  dataFlow.loop();
  vol = 1;
  
  reverb = new p5.Reverb();
  reverb.process(dataFlow, 3, 0, false);
}
//-------------------------------------------mousePressed
function mousePressed() {
  
  imageMode(CENTER);
  logo.resize(40, 0);
  image(logo, xLogo, windowHeight-25);
  tint(200); 
  save();
  clear();
  //background(10);
  
}