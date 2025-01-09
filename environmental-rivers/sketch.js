/*
This template visualises UK flood data by cycling through 1 river at a time
*/

// colours variables used for MIDI control sliders
let alpha = 255; // skintone transparency
let r;  // individual rgb variables
let g;
let b;


let myData;
let index;
let river;
let beginPoint;
let endPoint;
let riverWidth;
let branchLength1 = 250;
let branchLength2 = 150;
let floodWarning;
let isTidal; // boolean
let floodDescription; // flood description - optional

let numberOfPoints = 5;

const BLANKMESSAGE = "No flood information given."
const HEADERTEXT = "UK Rivers Flood Status";
const BOTTOMMARGIN = 52;
const cellSize = 3;


function preload() {
  // API definition - https://environment.data.gov.uk/flood-monitoring/doc/reference
  // local saved version of data best for frequent testing
  myData = loadJSON('data/floods.json')
  // live data best for final version
  // myData = loadJSON('https://environment.data.gov.uk/flood-monitoring/id/floods')
  // myData will represent an array of river objects containing data for each river
}
function setup() {


  //canvas position - Olie
  let canvas = createCanvas(innerWidth, 0.75 * innerHeight);
  canvas.id("canvas"); let newCanvasX = (windowWidth) - width;
  let newCanvasY = (windowHeight) / 8;
  canvas.position(newCanvasX, newCanvasY);

  // noLoop();
  selectNewRiver();
  setupController();
  setInterval(selectNewRiver, 5000);

  frameRate(15)

  noiseSeed(1);


  // river colours
  r = random(255);
  g = random(100);
  b = random(100);
}
function selectNewRiver() {
  // reset background (deletes all previous drawing)
  // background(0)
  fill(255)
  // textSize(26);
  // textAlign(CENTER, CENTER);
  // text(HEADERTEXT, width/2, height - BOTTOMMARGIN/2);
  // textAlign(LEFT, TOP);
  // choose a new river index at random
  index = floor(random(myData.items.length - 1))
  // assign the current river data object for ease of reference
  river = myData.items[index];
  // use print(river) to see all the info contained in a river object
  // print(river)
  // calculate drawing info for river
  newRiver(river)
  // drawy the river
  drawRiver();

  // newRiver(river);
  // drawRiver();

  // draw the info text
  drawOverlay();
  // move to the next river after a given number of milliseconds
}

function drawBackground() {
  noStroke();
  //background(220);
  for (y = 0; y < height; y += cellSize) {
    for (x = 0; x < width; x += cellSize) {
      let n = noise(x * 0.005, y * 0.005);

      if (n < 0.25) {
        fill(216, 150, 91, alpha);
      }
      else if (n < 0.5) {
        fill(200, 125, 80, alpha);
      }
      else if (n < 0.75) {
        fill(185, 115, 70, alpha);
      }
      else {
        fill(189, 105, 64, alpha);
      }
      rect(x, y, cellSize);
    }
  }
  filter(BLUR, 10);
}

function draw() {
  background(0, 20);
  drawBackground();

  drawRiver();
  drawOverlay();


  // selectNewRiver();
}

function drawRiver() {
  noFill()
  // randomly derives a redish colour that coresponds to flood warnings
  //let r;
  //let g;
  //let b;//

  /*if(floodWarning == "Flood alert"){
    r = 200
    g = random(80)
    b = random(80)
  } else if(floodWarning == "Flood warning"){
    r = 150 
    g = random(40)
    b= random(40)
  } else {
    r = 255
    g = random(100)
    b = random(100)
  }*/
  stroke(r, g, b)

  // set the stroke weight so that it relates severity level of the flood
  if (riverWidth == 2) {
    strokeWeight(25)
  } else if (riverWidth == 3) {
    strokeWeight(15)
  } else {
    strokeWeight(5)
  }


  // drawing routine
  beginShape()
  vertex(beginPoint.x, beginPoint.y)
  let segments = 8;
  let points = [];
  for (let i = 0; i < numberOfPoints; i++) {
    points.push(parseInt(random(1, 7)));
  }


  let x, y;

  // make a slightly wiggly line between the start and end point of the river
  for (let i = 1; i < segments; i++) {
    x = width / segments * i;
    y = height / 2 + random(riverWidth * -50, riverWidth * 50)
    vertex(x, y)

    for (let j = 0; j < numberOfPoints; j++) {
      if (i==points[j]) {
        let beginning = random(0, 1) < 0.5;
        let ending = random(0, 1) < 0.5;

        // coordinate change varibale


        if (beginning) {
          // second branches
          let x2 = random(x, x + branchLength1)
          let y2 = random(y - branchLength1, y + branchLength1)
          line(x, y, x2, y2);
          // third branches
          if (ending) {
            line(x2, y2, (x2 + branchLength2), (y2 + 50))
          } else {
            line(x2, y2, (x2 + branchLength2), (y2 + 0))
            line(x2, y2, (x2 + branchLength2), (y2 - 50))
          }
        } else {
          // second branches
          let x2 = random(x, x + branchLength1)
          let y2 = random(y - branchLength1, y + branchLength1)
          line(x, y, x2, y2)
          // third branches
          if (ending) {
            line(x2, y2, (x2 + branchLength2), (y2 + 50))
          } else {
            line(x2, y2, (x2 + branchLength2), (y2 + 50))
            line(x2, y2, (x2 + branchLength2), (y2 - 50))
          }

          // circles appear on river (clots) if river is tital (even if only one of them is)
          if (isTidal == true && (i == point1 || i == point3)) {
            fill(r, g, b)
            circle(x, y, 30)
            noFill()
          }
        }
      }
    }
  }
  vertex(endPoint.x, endPoint.y)

  endShape()
}
function newRiver(river) {
  // evaluate riverWidth based on severity of flooding, transforming it into a number between 1 (least severe) and 4 (most severe)
  riverWidth = 5 - river.severityLevel // original data given: 1 = worst, 4 = best
  floodWarning = river.severity
  isTidal = river.isTidal
  // calculate beginning and end points fixed to left and right edges of the canvas
  beginPoint = { x: 0, y: random(height * 0.25, height * 0.75) }
  endPoint = { x: width, y: random(height * 0.25, height * 0.75) }
}
function drawOverlay() {
  fill(255)
  noStroke()
  textSize(20);
  // draw river name
  let riverDescription = river.description
  let riverText = text(riverDescription, 50, 50);
  textSize(18);

  textSize(20);
  textAlign(CENTER, CENTER);
  text(HEADERTEXT, width / 2, height - BOTTOMMARGIN / 2);
  textAlign(LEFT, TOP);

}


/**
 * React to inputs from the control change sliders in the Midi controller
 * @param {Event} e 
 */
/* reacts to sliders and dials */

// note - dials change background, sliders change river features, 1st button stops the loop when held
function allCC(e) {
  console.log('controller:', e.controller.number, 'value:', e.value);
  switch (e.controller.number) {
    case 32: { /* first dial */
      alpha = e.value * 255; //background transparency
      break;
    }
    case 33: {
      noiseSeed(e.value * 10); //change background seed
      break;
    }
    case 34: {

      break;
    }
    case 35: { /* last dial */
      break;
    }
    case 36: { /* first slider */

       // changes colour of river (?)
        r = map(e.value, 0, 1, 255, 150);
        //g = e.value *100;
        b = map(e.value, 0, 1, 150, 255)
      

      break;
    }
    case 37: {
      // second slider - branch length
      // if (e.value < 50){
      //   e.value = e.value + 50
      // }
      branchLength1 = map(e.value, 0, 1, 100, 250);
      branchLength2 = map(e.value, 0, 1, 70, 150);


      break;
    }
    case 38: {
      // changing number of points on a branch depending on slider
      numberOfPoints = map(e.value, 0, 1, 1, 7);
      break;
    }
    case 39: { /* last slider */
      break;
    }
  }
}
/**
 * React to inputs from the bottom buttons on the controller
 * @param {Event} e 
 */
function allNoteOn(e) {
  console.log('controller:', e.data[1], 'value:', e.value);
  switch (e.data[1]) {
    case 40: {
      if (e.value) { // stops the loop
        noLoop() // small error when held for too long, different text and rivers overlay
      } else {
        loop()
      }
      break;
    }
    case 41: {
      if (e.value) { // shows river info text
        // if button held, show info, middle of the screen(?) diana's idea lol
        
      } else {
        // dont show any river info
        
      }
      break;
    }
    case 42: {
      if (e.value) {
      } else {
      }
      break;
    }
    case 43: {
      if (e.value) {
      } else {
      }
      break;
    }
  }
}