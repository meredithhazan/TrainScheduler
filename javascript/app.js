  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA4dvV3UED63kAE-YTfQb7pXuXIewV7pPs",
    authDomain: "train-scheduler-hw.firebaseapp.com",
    databaseURL: "https://train-scheduler-hw.firebaseio.com",
    projectId: "train-scheduler-hw",
    storageBucket: "train-scheduler-hw.appspot.com",
    messagingSenderId: "79168803996"
  };
  firebase.initializeApp(config);

// get a reference to the database via firebase
var database = firebase.database();


$("#addTrain").on("click", function(event) {
	event.preventDefault();
// collect the data from the html form, create variables to hold the data
// train name, .... etc	
var tName = $("#trainName").val().trim();
var tDest = $("#trainDest").val().trim();
// when retrieving first train data make sure to parse it into a unix timestamp
var tTime = moment($("#firstTrain").val().trim(), "HH").format("X");
// console.log("Orig start time: " + moment.unix(tTime).format('HH:mm a'));
var tFreq = $("#trainFreq").val().trim();

var newTrain = {
	name: tName,
	destination: tDest,
	start: tTime,
	frequency: tFreq
};

// "push" that date into firebase (assume that the child_added listener updates HTML)
database.ref().push(newTrain);

console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.start);
console.log(newTrain.frequency);

// alert that train was added
alert("Train successfully added");

// clear out html form for the next input
$("#trainName").val("");
$("#trainDest").val("");
$("#firstTrain").val("");
$("#trainFreq").val("");

});


database.ref().on("child_added", function(childSnapshot) {

console.log(childSnapshot.val());

// create local variables to store the data from firebase

var tName = childSnapshot.val().name;
var tDest = childSnapshot.val().destination;
var tTime = childSnapshot.val().start;
var tFreq = childSnapshot.val().frequency;
var timeInMinutes = "";
var tArrival = "";

console.log(tName);
console.log(tDest);
console.log("Start time: " + tTime);
console.log(tFreq);


// FIRST MAKE THE TABLE ROW SHOW UP WITH EMPTY STRINGS FOR 'timeInMinutes' / 'tArrival'

// THEN DO THIS MATH

	// compute the difference in time from "now" and the first train, store in variable for later use
/*var result = moment().diff(tTime).format('HH:mm');
console.log(result);*/

var now = moment();
console.log("Currently: " + now.format('HH:mm'));

var convertedStTime = moment.unix(tTime).subtract(1, "years");
console.log("Start time: " + convertedStTime.format('HH:mm'));

var diffTime = now.diff(moment(convertedStTime), "minutes");
console.log("Difference: " + diffTime);

var tRemainder = diffTime % tFreq;
console.log(tRemainder);

timeInMinutes = tFreq - tRemainder;
console.log("Next train: " + timeInMinutes);

tArrival = now.add(timeInMinutes, "minutes");

	// get the remainder of time after using "mod" with the frequency
	// subtract the remainder from the frequency, store in var called timeInMinutes

	// format timeInMinutes & store in var, "make the time pretty"
// IT'S OKAY TO JUST SHOW EMPTY STRINGS FOR 'timeInMinutes' / 'tArrival'

var arrivalTimePretty = moment.unix(tArrival).format("HH:mm");
	
// append to our table of trains, inside the tbody, with a new row of the train data
$("#train-list > tbody").append(
	"<tr><td>" + tName + "</td><td>" + tDest + "</td><td>" + tFreq + "</td><td>" + arrivalTimePretty +
	"</td><td>" + timeInMinutes + "</td></tr>");


	






});