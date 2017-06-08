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
// clear out html form for the next input

// alert that train was added

});


$("").on("child_added", function(childSnapshot) {

console.log("the childSnapshot data", childSnapshot.val());

// create local variables to store the data from firebase

// FIRST MAKE THE TABLE ROW SHOW UP WITH EMPTY STRINGS FOR 'timeInMinutes' / 'tArrival'

// THEN DO THIS MATH

	// compute the difference in time from "now" and the first train, store in variable for later use

	// get the remainder of time after using "mod" with the frequency
	// subtract the remainer from the frequency, store in var called timeInMinutes

	// format timeInMinutes & store in var, "make the time pretty"
// IT'S OKAY TO JUST SHOW EMPTY STRINGS FOR 'timeInMinutes' / 'tArrival'

	
// append to our table of trains, inside the tbody, with a new row of the train data

});