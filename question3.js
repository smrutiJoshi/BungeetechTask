/*Consider input file as /input/question-3/main.csv and give the output to /output/answer-3/main.csv
  and upload solution code file also to the same folder. 
  Sort the teams by Red Cards, then to Yellow Cards
*/
var fs = require('fs');
var csv = require('csv');
var Math = require('math');

var inputData = [];
const ObjectsToCsv = require('objects-to-csv');
const { E, min } = require('math');
const { count } = require('console');

var readStream = fs.createReadStream('./input/question-3/main.csv');

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
  var size = inputData.length

  //Helper function that returns sorted array based on specified  two properties.
  const sortObjs = (arr, prop1, prop2) => {
    let sortedArry = [...arr].sort((a, b) => {
      var result = parseInt(b[prop1]) - parseInt(a[prop1]);
      if (result !== 0) {
        return result;
      }
      return parseInt(b[prop2]) - parseInt(a[prop2]);

    });
    return sortedArry;
  }


  var sortedArry = sortObjs(inputData, "Red Cards", "Yellow Cards");

  // Constructer function to push record to final array.
  function addNewObj(index, team, prop1, prop2) {
    this[" "] = index;
    this.Team = team;
    this["Yellow Cards"] = prop1;
    this["Red Cards"] = prop2;
  }

  // Records of finlArr array will be written to output1.csv file.
  let finlArr = new Array();

  // Get the index position of each sorted array record from original array.
  for (var i = 0; i < size; i++) {
    var index = 0;
    for (var j = 0; j < size; j++) {
      if (sortedArry[i].Team == inputData[j].Team) {
        index = j;
        break;
      }
    }
    // Push the record to final Array.
    finlArr.push(new addNewObj(index, sortedArry[i].Team, sortedArry[i]["Yellow Cards"], sortedArry[i]["Red Cards"]));
  }
  // // Push final array to csv file.
  new ObjectsToCsv(finlArr).toDisk('./Output/answer3/output3.csv');
}));


readStream.pipe(parser);


