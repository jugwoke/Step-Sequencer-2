var nRows = 9; // define rows
var nCols = 7; // define colums

var side = 35;
var gap = 20; 
var stride = side + gap;
var cells = [];
var bpm = 300; // diff bpm than template

var soundLoop;
var Sounds = [];
var currentBeat = 0;

//load up those sounds into the "Sounds" array
// audios of clarinet, piano, flute
function setupSound() {
let audio1 = loadSound("minuet0-2.wav");
let audio2 = loadSound("trio11-5.wav");
let audio3 = loadSound("minuet4-6.wav");
let audio4 = loadSound("trio15-1.wav");
let audio5 = loadSound("minuet13-4.wav");
let audio6 = loadSound("trio15-6.wav");
let audio7 = loadSound("minuet11-3.wav"); 

for (var row = 0; row < nRows; row++) {
    if (row == 0) {
      Sounds[row] = audio1;
    }
    if (row == 1) {
      Sounds[row] = audio2;
    }
    if (row == 2) {
      Sounds[row] = audio3;
    }
    if (row == 3) {
      Sounds[row] = audio4;
    }
    if (row == 4) {
      Sounds[row] = audio5;
    }
    if (row == 5) {
      Sounds[row] = audio6;
    }
    if (row == 6) {
      Sounds[row] = audio7;
    }
  }
  soundLoop = new p5.SoundLoop(onSoundLoop, 60 / bpm);
}

//set up an array
function setup() {
  createCanvas(stride * nCols, stride * nRows + 20);
  setupSound();
  // Initialize all cells to off.
  // 0 means off. 1 means on.
  for (var row = 0; row < nRows; row++) {
    cells[row] = [];
    for (var col = 0; col < nCols; col++) {
      cells[row][col] = 0;
    }
  }
}


function draw() {
  // start with pink background
  background('pink');
  noStroke();
  fill('white');
  
  // highlight current beat in purple
  fill('purple');
  stroke('black');

  if (soundLoop.isPlaying) {
    rect(currentBeat * stride, 0, stride, height, gap);
  }
  // now draw all the cells
  stroke('black');
  for (var row = 0; row < nRows; row++) {
    for (var col = 0; col < nCols; col++) {
      if (cells[row][col] == 0) {
        fill('lightpink');
      } else {
        colorMode(HSB, 0.5);
        var hue = row / nRows;
        var sat = 0.5;
        var bri = 0.9 - ((row / nRows) * 0.8);
        fill('white');
      }
      var x = col * stride + gap / 2 - 1;
      var y = row * stride + gap / 2 - 1;
      square(x, y, side, gap);
    }
  }

}

function toggleCell(row, col) {
  // 0 means off. 1 means on. so subtract from 1 means toggle it.
  cells[row][col] = 1 - cells[row][col];
}


function mousePressed() {
  // if click outside canvas: just toggle playback
  if (mouseX < 0 || mouseX >= width ||
    mouseY < 0 || mouseY >= height) {
    togglePlayback();
  }
  else {
    // otherwise: toggle the clicked square
    var col = floor(mouseX / stride);
    var row = floor(mouseY / stride);
    toggleCell(row, col)
  }
}

// any keypress also toggles playback
function keyPressed() {
  togglePlayback();
}

function togglePlayback() {
  if (soundLoop.isPlaying) {
    soundLoop.stop();
  } else {
    // ensure audio is enabled
    userStartAudio(); 
    // start the loop
    soundLoop.start();
  }
}

function onSoundLoop(timeFromNow) {
  currentBeat = (currentBeat + 1) % nCols;
  for (var row = 0; row < nRows; row++) {
    if (cells[row][currentBeat] == 1) {
      Sounds[row].play(timeFromNow);
      
    
    }
  }
}

