/**
 * This file uses the variable droughtInformation which is created and filled from the csv-management.js file. This variable contains the data in data/droughts.csv parsed for JS. Feel free to add, remove and modify functions in this helper.js file.
 * WARNING: You should never change the files droughts.csv nor csv-management.js. If you feel like you need to do so, please talk to your tutors.
 */

/**
 * The rows on the droughtInformation is organized as follows : 
 * Each row contains information relative to one territory + one year
 * All territories are countries, except for the one marked as EU27_2020, corresponding to European Union - 27 countries (from 2020). In the template no information is taken from the EU27_2020 rows but it can be used if necessary.
 * 
 * In each row, there are eight columns. You should not worry about columns 0 to 4 as they do not change throughout the data. You will be interested in reading data from columns 5 to 8. Here is an explanation of what each column does:
 * 
 * [0] eu_sdg (EU Sustainable Development Goals): all are marked as 15_42 (Drought impact on ecosystems in Europe)
 * [1] dimension: always "KM2" (meaning square km)
 * [2] dimension_label: always "Drought impact area"
 * [3] unit: always "KM2" (meaning square km)
 * [4] unit_label: always "Square kilometre"
 * [5] geo (geographic area): This can be EU27_2020 (the whole of the EU) OR a country code (such as ES, FR...)
 * [6] geo_label: A longer version of geo, which will either be "European Union - 27 countries (from 2020)" or the name of the country (such as Spain, France...)
 * [7] time: A number ranging from 2000 to 2020 - representing the year to which that row belongs to
 * [8] obs_value: A number representing the square kilometres of drought observed that year
 * 
 * To access a column, you can use the command droughtInformation[index], for ex. droughtInformation[6] will contain a geo_label.
 * 
 */

/**
 * Calculate the maximum drought area from the information stored in the droughtInformation variable
 * @returns maximumArea - the maximum area in square meters found in the list of droughts per year
 */
function calculateMaximumArea() {
  // start maximum at zero
  let maximumArea = 0;

  // loop through all rows in the CSV
  for (row of droughtInformation) {
    if (row[5] === "EU27_2020") continue; //ignore whole of EU information

    // get area of current row
    const droughtArea = Number(row[8]);

    // if current area is bigger than current maximum, update maximum
    if (droughtArea > maximumArea) maximumArea = droughtArea;
  }

  // at end -> return maximum
  return maximumArea;
}

/**
 * Get the drought areas in the correct format for a specific given year
 * @param {Number} year
 * @returns array of objects of type {country: String, area: Number, centre: {x: Number, y: Number}} storing data of given year
 */
function getAreasForYear(year) {
  // initialize vector as empty
  let droughtsToDisplay = [];

  // loop through information stored in the droughtInformation variable
  for (row of droughtInformation) {
    if (row[0] === "eu_sdg") continue; //skip first line
    if (row[5] === "EU27_2020") continue; //ignore whole of EU data
    if (Number(row[7]) !== year) continue; //skip rows from another year

    //get info from row (country name and square meters of drought)
    const countryName = row[6];
    const droughtArea = Number(row[8]);

    //create object & push to droughtsToDisplay vector
    const newDisplay = {
      country: countryName,
      area: droughtArea,
    };
    droughtsToDisplay.push(newDisplay);
  }

  // return the complete list of droughts to display
  return droughtsToDisplay;
}

function recalculateCentres() {
  let centres = [];
  for (element of droughtsToDisplay) {
    //calculate new random centre and store in correctly formatted variable
    const newX = random(0, windowWidth);
    const newY = random(0, windowHeight);
    const centre = { x: newX, y: newY };
    centres.push(centre);
  }
  return centres;
}
