/*Consider input file as /input/question-2/main.csv and give the output to /output/answer-2/main.csv 
  and upload solution code file also to the same folder. 
  For each occupation, calculate the minimum and maximum ages
*/
var fs = require('fs');
var csv = require('csv');
var Math = require('math');
var inputData = [];
const ObjectsToCsv = require('objects-to-csv');
const { E, min } = require('math');
const { sameOccCnt } = require('console');


var readStream = fs.createReadStream('./input/question-2/main.csv');

var parser = csv.parse({ columns: true });

parser.on('readable', function () {
  while (record = parser.read()) {
    inputData.push(record);

  }
});

parser.on('error', function (err) {
  console.log(err.message);
});

parser.on('finish', (function () {

  Array.prototype.sortBy = function (p) {
    return this.slice(0).sort(function (a, b) {
      return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
    });
  }

  var sortedArr = inputData.sortBy('occupation');

  // Constructer function to push record to final array.
  function addNewObj(occupation, min, max) {
    this.occupation = occupation;
    this.min = min;
    this.max = max;
  }
  // Records of finlArr array will be written to output1.csv file.
  var finlArr = new Array();

  // Variables to store minimum and maximum age.
  var minAge = sortedArr[0].age;
  var maxAge = sortedArr[0].age;

  // Pointer variables.
  var prevRec = 0;
  var currRec = 1;

  // Counter variable to count records of similar occupation.
  var sameOccCnt = 0;
  var size = sortedArr.length;

  while (currRec < size && prevRec < size) {

    sameOccCnt = 0;

    // If previous and current record's occupation is same, increase the counter.
    while (sortedArr[prevRec].occupation == sortedArr[currRec].occupation) {
      sameOccCnt++;
      currRec++;
      if (currRec == size - 1) break;
    }

    // Calulate minimum and maximum age from previous record pointer upto the current record pointer.
    for (var i = prevRec; i < prevRec + sameOccCnt - 1; i++) {
      minAge = ((minAge > sortedArr[i + 1].age) ? sortedArr[i + 1].age : minAge);
      maxAge = ((maxAge < sortedArr[i + 1].age) ? sortedArr[i + 1].age : maxAge);
    }

    // If record is last record push into final array.
    if (currRec == size - 1) {
      finlArr.push(new addNewObj(sortedArr[prevRec].occupation, minAge, maxAge));
      break;
    }
    
    // If previous and current record's occupation is different,
    // push the details into final array and initialise the variables.
    if (sortedArr[prevRec].occupation !== sortedArr[currRec].occupation) {
      finlArr.push(new addNewObj(sortedArr[prevRec].occupation, minAge, maxAge));
      prevRec = currRec;
      currRec = currRec + 1;
      minAge = sortedArr[prevRec].age;
      maxAge = sortedArr[prevRec].age;
    }
  }
  // Push final array to csv file.
  new ObjectsToCsv(finlArr).toDisk('./Output/answer2/output2.csv');
}));


readStream.pipe(parser);


