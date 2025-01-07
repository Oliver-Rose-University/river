/*
This template visualises UK flood data by cycling through 1 river at a time
*/

let myData;
let index;
let river;
let beginPoint;
let endPoint;
let riverWidth;
const BLANKMESSAGE = "No flood information given."
const HEADERTEXT = "UK Rivers Flood Status";
const BOTTOMMARGIN = 52;

function preload() {
  // API definition - https://environment.data.gov.uk/flood-monitoring/doc/reference
  // local saved version of data best for frequent testing
  myData = loadJSON('data/floods.json')
  // live data best for final version
  // myData = loadJSON('https://environment.data.gov.uk/flood-monitoring/id/floods')
  // myData will represent an array of river objects containing data for each river
}
function setup() {
  createCanvas(innerWidth, innerHeight);
  noLoop();
  selectNewRiver();
  setupController();
} 
function selectNewRiver(){
  // reset background (deletes all previous drawing)
  background(0)
  fill(255)
  textSize(36);
  textAlign(CENTER, CENTER);
  text(HEADERTEXT, width/2, height - BOTTOMMARGIN/2);
  textAlign(LEFT, TOP);
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
  setTimeout(selectNewRiver,5000);
}
function drawRiver(){
  noFill()
  // randomly derive a blueish colour
  stroke(255, random(100), random(100), 200)
  // set the stroke weight so that it relates somewhat to the flood level of the river
  strokeWeight(random(5*riverWidth, 10*riverWidth))
  // drawing routine
  beginShape()
  vertex(beginPoint.x, beginPoint.y)
  let segments = 8;

  let point1 = parseInt(random(1,7))
  let point2 = parseInt(random(1,7))
  let point3 = parseInt(random(1,7))
  let point4 = parseInt(random(1,7))

  let x, y;
  
  // make a slightly wiggly line between the start and end point of the river
  for (let i = 1; i < segments; i++) {
    x = width / segments * i;
    y = height/2 + random(riverWidth * -50, riverWidth * 50)
    vertex(x,y)


    if (i == point1 || i == point2 || i == point3 || i == point4){
      let beginning = random(0, 1) < 0.5;
      let ending = random(0,1) < 0.5;

      // coordinate change varibale
      let branchLength1 = 250;
      let branchLength2 = 150;

      if(beginning){
        // second branches
        let x2 = random(x, x+branchLength1)
        let y2 = random(y-branchLength1, y+branchLength1)
        line(x,y,x2,y2);
        // third branches
        if(ending){
          line(x2,y2,(x2+branchLength2),(y2+50))
        } else {
          line(x2,y2,(x2+branchLength2),(y2+50))
          line(x2, y2,(x2+branchLength2),(y2-50))
        }
      } else {
        // second branches
        let x2 = random(x, x+branchLength1)
        let y2 = random(y-branchLength1, y+branchLength1)
        line(x,y,x2,y2)
        // third branches
        if(ending){
          line(x2,y2,(x2+branchLength2),(y2+50))
        } else {
          line(x2,y2,(x2+branchLength2),(y2+50))
          line(x2, y2,(x2+branchLength2),(y2-50))
        }

      }    
    }

    // uncomment circle to see exactly where each vertex is placed
    // circle(x, y, 100)
  }
  vertex(endPoint.x, endPoint.y)

  endShape()
}
function newRiver(river) {
  // evaluate riverWidth based on severity of flooding, transforming it into a number between 1 (least severe) and 4 (most severe)
  riverWidth = 5 - river.severityLevel // original data given: 1 = worst, 4 = best
  // calculate beginning and end points fixed to left and right edges of the canvas
  beginPoint = { x: 10, y: random(height * 0.25, height * 0.75) }
  endPoint = { x: width-10, y: random(height * 0.25, height * 0.75) }
}
function drawOverlay(){
  fill(255)
  noStroke()
  textSize(24);
  // draw river name
  text(river.description, 50, 50);
  textSize(18);
  // draw flood message or if empty use blank message rather than show an empty string
  let message = river.message.trim() || BLANKMESSAGE; // trim() removes leading white space
  // text(message, 50, 100, width/2);
}


/**
 * React to inputs from the control change sliders in the Midi controller
 * @param {Event} e 
 */
function allCC(e) {
  console.log('controller:', e.controller.number,'value:',  e.value);
  switch (e.controller.number) {
    case 32: {
      break;
    }
    case 33: {
      break;
    }
    case 34: {
      break;
    }
    case 35: {
      break;
    }
    case 36: {
      break;
    }
    case 37: {
      break;
    }
    case 38: {
      break;
    }
    case 39: {
      break;
    }
  }
}

/**
 * React to inputs from the bottom buttons on the controller
 * @param {Event} e 
 */
function allNoteOn(e) {
  console.log('controller:', e.data[1],'value:',  e.value);
  switch (e.data[1]) {
    case 40: {
      if (e.value) {
      } else {
      }
      break;
    }
    case 41: {
      if (e.value) {
      } else {
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