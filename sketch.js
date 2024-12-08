let button;
let canvas;
let lineWeight;
let slider;
let drawState = -1;
let colors = [];
let img;
let input;

function setup() {
  frameRate(300);
  canvas = createCanvas(600, 400);
  canvas.parent("sketch-holder");
  background(255);

  var button = createButton("Upload Palette");
  button.parent("button-holder");
  //button.mousePressed(uploadPalette);

  var button2 = createButton("Pen");
  button2.parent("button-holder");
  button2.mouseClicked(drawPen);

  var button3 = createButton("Eraser");
  button3.parent("button-holder");
  button3.mouseClicked(drawEraser);

  var button5 = createButton("Save Image");
  button5.parent("button-holder");
  //button5.mousePressed(saveImage);

  slider = createSlider(1, 20);
  slider.parent("controls");

  button = createButton("Clear Screen");
  button.parent("controls");
  button.mousePressed(clearScreen);

  button.input = createFileInput(handleFile);
}

function draw() {
  stroke(0);
  lineWeight = slider.value();
  strokeWeight(lineWeight);
  if (mouseIsPressed === true) {
    line(pmouseX, pmouseY, mouseX, mouseY);
    if (drawState == 0) {
      drawPen();
    } else if (drawState == 1) {
      drawEraser();
      line(pmouseX, pmouseY, mouseX, mouseY);
    }
  } else {
    fill(255);
  }
}

function drawPen() {
  drawState = 0;
  stroke(0);
}

function drawEraser() {
  drawState = 1;
  stroke(255);
}

function saveImage() {
  saveCanvas("randomizedColorDrawing.jpg");
}

function clearScreen() {
  background(255);
}

function handleFile() {
  print(file);
  if (file.type === "image") {
    img = createImg(file.data, "");
    img.hide();
  } else {
    img = null;
  }
}
