/**
 * THIS FILE SHOULD NOT BE CHANGED. Please check in with your tutors if you believe a change is needed before proceeding.
 */

//declare file path
const fileUrl = "data/droughts.csv";

//file content
let droughtInformation;

/**
 * parse csv content
 * @param {String} data in comma separated style
 */
function parseCSV(data) {
  //split by rows
  const rows = data.split("\n");
  //split by cols
  const result = rows.map((row) => row.split(","));
  //set info to result
  droughtInformation = result;
}

/**
 * fetch csv and parse csv
 * @param {String} fileUrl url to csv file
 */
async function fetchCSV(fileUrl) {
  const response = await fetch(fileUrl);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const text = await response.text();
  parseCSV(text);
}

/**
 * get all rows that are linked to this geocode in the CSV
 * @param {String} geoCode 
 */
function getRowsFromArea(geoCode) {
  let rows = [];
  for(let row of droughtInformation) {
    if(row[5] === geoCode) rows.push(row);
  }
  return rows;
}

/**
 * get single row given a year and an array of rows
 * @param {Array} rows list of rows to check
 * @param {Number} year year from 2000 to 2023
 * @returns 
 */
function getRowFromYear(rows, year) {
  for(let row of rows) {
    if(row[7] == year) return row;
  }
}

// fetch csv at start to fill droughtInformation variable data
fetchCSV(fileUrl);