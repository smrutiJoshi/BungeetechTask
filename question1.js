/* Consider input file as /input/question-1/main.csv and give the output to /output/answer-1/main.csv 
   and upload solution code file also to the same folder. 
   Group the year by decades and sum the values
*/
var fs = require('fs');
var csv = require('csv');
var Math = require('math');

var inputData = [];
const ObjectsToCsv = require('objects-to-csv');


var readStream = fs.createReadStream('./input/question-1/main.csv');

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

  var size = inputData.length;

  // Records of finlArr array will be written to output1.csv file
  var finlArr = new Array();
  
  // Function Constructer to push record to final array.
  function createNewObj(decadeStrt, populatn, total, violent, proprty, murder, frcblrp, robry, aggrvtdasslt, burglry, lteft, vehtheft) {

    this.Year = decadeStrt;
    this.Population = populatn;
    this.Total = total;
    this.Violent = violent;
    this.Property = proprty;
    this.Murder = murder;
    this.Forcible_Rape = frcblrp;
    this.Robbery = robry;
    this.Aggravated_assault = aggrvtdasslt;
    this.Burglary = burglry;
    this.Larceny_Theft = lteft;
    this.Vehicle_Theft = vehtheft;
  }
  

  var isDecSm;
  var decadeStrt = 0;
  var year = 0;
  var total = 0;
  var violent = 0;
  var proprty = 0;
  var murder = 0;
  var frcblrp = 0;
  var robry = 0;
  var aggrvtdasslt = 0;
  var burglry = 0;
  var lteft = 0;
  var vehtheft = 0;
  var populatn = 0;
  

  for (var i = 0; i < size; i++) {
    // Check if its the first record.      
    if (i !== 0) {
      //Check if previous year and current year belongs to the same decade.
      var prevYr = Math.floor((parseInt(inputData[i - 1].Year) % 100) / 10)
      var currentYr = Math.floor((parseInt(inputData[i].Year) % 100) / 10);
      
      // Set the boolean value based on decade is same or not.
      isDecSm = ((prevYr == currentYr) ? true : false);

    }
    else {
      // If not first record initialse all the variables.
      decadeStrt = parseInt(inputData[i].Year);
      isDecSm = true;
      total = 0;
      violent = 0;
      proprty = 0;
      murder = 0;
      frcblrp = 0;
      robry = 0;
      aggrvtdasslt = 0; 
      burglry = 0;
      lteft = 0;
      vehtheft = 0;
      
    }

    // If different decade, push the previous decade's summated fields into final array.
    if (!isDecSm) {
      finlArr.push(new createNewObj(decadeStrt, populatn, total, violent, proprty, murder, frcblrp, robry, aggrvtdasslt, burglry, lteft, vehtheft));
     
      decadeStrt = parseInt(inputData[i].Year);
      total = 0;
      violent = 0;
      proprty = 0;
      murder = 0;
      frcblrp = 0;
      robry = 0;
      aggrvtdasslt = 0;
      burglry = 0;
      lteft = 0;
      vehtheft = 0;

    }
    // Otherwise perform summation of fields.
    total = total + parseInt(inputData[i].Total);
    violent = violent + parseInt(inputData[i].Violent);
    proprty = proprty + parseInt(inputData[i].Property);
    murder = murder + parseInt(inputData[i].Murder);
    frcblrp = frcblrp + parseInt(inputData[i].Forcible_Rape);
    robry = robry + parseInt(inputData[i].Robbery);
    aggrvtdasslt = aggrvtdasslt + parseInt(inputData[i].Aggravated_assault);
    burglry = burglry + parseInt(inputData[i].Burglary);
    lteft = lteft + parseInt(inputData[i].Larceny_Theft);
    vehtheft = vehtheft + parseInt(inputData[i].Vehicle_Theft);

    // Assign latest population.
    populatn = parseInt(inputData[i].Population);
    
    // Check if last record of file and push it to final array.
    if (i == size - 1) {
      createNewObj(decadeStrt, populatn, total, violent, proprty, murder, frcblrp, robry, aggrvtdasslt, burglry, lteft, vehtheft);
     
      finlArr.push(new createNewObj(decadeStrt, populatn, total, violent, proprty, murder, frcblrp, robry, aggrvtdasslt, burglry, lteft, vehtheft));
     
    }


  }
  //Push final array to csv file.
  new ObjectsToCsv(finlArr).toDisk('./Output/answer1/output1.csv');
  
}));


readStream.pipe(parser);


