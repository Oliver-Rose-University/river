/*
This template visualises Drought Impact per square meter in European Union Countries
data is taken from https://www.eea.europa.eu/en/datahub/featured-data/statistical-data/datahubitem-view/c7c868d8-95dc-4f23-9dde-4cdc2738cc4d
*/

//header text
const HEADERTEXT = "EU Drought Data per Country";

//margin at bottom of canvas
const BOTTOMMARGIN = 52;

// optional parameter to get data from just one country
//let geoCode = "FR";
// parameter to get data from just one year
let year = 2022;

// This vector is used to display the countries drought areas on the screen. It can be filled in different functions - for ex. getAreasForYear - as well as manually. Objects within the vector should be of type {country : String, area: Number, centre : {x: Number, y: Number}}
let droughtsToDisplay = [];

let centres = [];

//maximum area stored within spreadsheet data
let maximumDroughtArea = 0;

function setup() {
  //calculate the maximum area and store in maximumDroughtArea variable
  maximumDroughtArea = calculateMaximumArea();

  // create canvas of maximum width and height
  createCanvas(windowWidth, windowHeight);

  // set stroke to null
  noStroke();

  // set text align to centre
  textAlign(CENTER, CENTER);

  //generate droughts & centres for first time
  droughtsToDisplay = getAreasForYear(year);
  centres = recalculateCentres();

  // setup midi
  setupController();
}

function draw() {
  // set background to black
  background(0);

  // update droughtsToDisplay list to those of the currently displayed year
  droughtsToDisplay = getAreasForYear(year);

  // set text size and text align for countries
  textSize(12);

  // loop through droughtsToDisplay and display circle with area & position given
  for (index in droughtsToDisplay) {
    // get info stored in the current index of the array
    const display = droughtsToDisplay[index];

    // get centre position
    const centre = centres[index];

    // set fill of circles to brown with alpha 100 - to allow overlap
    fill(200, 100, 0, 100);

    // draw circle at (x, y) with proportional area depending on maximumDroughtArea and windowHeight
    circle(
      centre.x,
      centre.y,
      (display.area / maximumDroughtArea) * windowHeight
    );

    // set fill to white for country name
    fill(255);

    // draw country name at centre of area
    text(display.country, centre.x, centre.y);
  }

  // draw title at end to prevent covering it
  textSize(36);
  text(HEADERTEXT, width / 2, height - BOTTOMMARGIN / 2);
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
