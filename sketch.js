let button;
let canvas;
let lineWeight;
let slider;
let drawState = -1;
let colors = [];
let img;
let img2;
let input;
let paletteStart = 500;
let colorBlock;
let selectedColor = 255;
let quadrilateralShape;

function setup() {
  input = createFileInput(handleFile);
  input.parent("upload-button");

  frameRate(300);
  canvas = createCanvas(600, 400);
  canvas.parent("sketch-holder");
  background(255);

  var button = createButton("Get Palette");
  button.parent("button-holder");
  button.mousePressed(colorPalette);

  var button2 = createButton("Pen");
  button2.parent("button-holder");
  button2.mouseClicked(drawPen);

  var button3 = createButton("Eraser");
  button3.parent("button-holder");
  button3.mouseClicked(drawEraser);

  var button4 = createButton("Clear Screen");
  button4.parent("button-holder");
  button4.mousePressed(clearScreen);

  var button5 = createButton("Save Image");
  button5.parent("button-holder");
  button5.mousePressed(saveImage);

  var button6 = createButton("Fill Canvas");
  button6.parent("button-holder");
  button6.mousePressed(fillBackground);
  
  var button7 = createButton("Random Shape");
  button7.parent("button-holder");
  button7.mousePressed(newRandomShape);
  
  p2 = createElement('p', 'Line Weight');
  p2.parent('stroke-holder');

  slider = createSlider(1, 40);
  slider.parent("stroke-holder");
  slider.style('width', '500px');
  
  colorBlock = createDiv();
  colorBlock.parent("current-color");
  colorBlock.style('width','100%');
  colorBlock.style('height','100%');
  colorBlock.style('background', 'white');
}

function draw() {
  drawPalette();
  stroke(0);
  lineWeight = slider.value();
  strokeWeight(lineWeight);
  if (mouseIsPressed && mouseX < paletteStart) {
    if (drawState == 0) {
      drawPen();
      line(pmouseX, pmouseY, mouseX, mouseY);
    } else if (drawState == 1) {
      drawEraser();
      line(pmouseX, pmouseY, mouseX, mouseY);
    } else if (drawState == 2) {
      fillBackground();
    } else if (drawState == 3){
      newRandomShape();
    }
  }
}

function drawPen() {
  drawState = 0;
  stroke(selectedColor);
}

function drawEraser() {
  drawState = 1;
  stroke("white");
}

function fillBackground() {
  drawState = 2;
  noStroke();
  fill(selectedColor);
  rect(0, 0, 500, 400);
}

function drawPalette() {
  noStroke();
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    rect(paletteStart, i * 80, 100, 80);
  }
}

function saveImage() {
  saveCanvas("randomizedColorDrawing.jpg");
}

function clearScreen() {
  background(255);
}

function handleFile(file) {
  print(file);
  if (file.type == "image") {
    img = createImg(file.data, "");
    img.hide();
    img2 = loadImage(file.data);
  } else {
    img = null;
  }
}

function colorPalette() {
  colors = [];
  for (let i = 0; i < 5; i++) {
    let randomColors = img2.get(random(img2.width), random(img2.height));
    colors[i] = randomColors;
  }
}

function mousePressed() {
  if (mouseX >= paletteStart) {
    let paletteIndex = (mouseY - (mouseY % 80)) / 80;
    if (paletteIndex >= 0 && paletteIndex < colors.length) {
      selectedColor = colors[paletteIndex];
      
      var hx = "#" + hex(selectedColor[0],2) + hex(selectedColor[1],2) + hex(selectedColor[2],2);
      colorBlock.style('background', hx);
    }
  }
}


function drawRandomStamp(x, y) {
  noStroke();
  fill(selectedColor);
  quad(random(width/x), random(height/y), random(width), random(height), random(width), random(height), random(width), random(height));
}

class randomStamp {
  constructor(xpos, ypos) {
    this.xpos = xpos;
    this.ypos = ypos;
  }

  display() {
    drawRandomStamp(this.xpos, this.ypos);
  }
}

function newRandomShape() {
  quadrilateralShape = new drawRandomStamp(random(width), random(height));
}

