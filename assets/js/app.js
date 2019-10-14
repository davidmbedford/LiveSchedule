  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAZuSMKcBu-lzKLuBNY0M8Eve_CpthUKls",
    authDomain: "unit-7-train-schedule.firebaseapp.com",
    databaseURL: "https://unit-7-train-schedule.firebaseio.com",
    projectId: "unit-7-train-schedule",
    storageBucket: "unit-7-train-schedule.appspot.com",
    messagingSenderId: "124735987706"
  };

  firebase.initializeApp(config);

  // Universal Variables
  var database = firebase.database();

$(document).ready(function() {

  // Submit Button
  $("#add-train").on("click", function(event) {
    event.preventDefault();

    var name = $("#name-input").val().trim();
    var dest = $("#dest-input").val().trim();
    var time = moment($("#time-input").val().trim(), "hh:mm").format("hh:mm");
    var freq = $("#freq-input").val().trim();

    var newTrain = {
      name: name,
      destination: dest,
      time: time,
      frequency: freq
      };

    database.ref().push(newTrain);

    alert("Train added!");

    $("#name-input").val("");
    $("#dest-input").val("");
    $("#time-input").val("");
    $("#freq-input").val("");
  });

  // Firebase watcher + initial loader HINT: .on("value")
database.ref().on("child_added", function(childSnapshot) {
  event.preventDefault();
  console.log(childSnapshot.val());

    var name = childSnapshot.val().name;
    var dest = childSnapshot.val().destination;
    var time = childSnapshot.val().time;
    var freq = childSnapshot.val().frequency;

    console.log("name", name);
    console.log("dest", dest);
    console.log("time", time);
    console.log("freq", freq);

    var timeConverted = moment(time, "HH:mm").subtract(1, "years");
    console.log("timeConverted", timeConverted);

    var currentTime = moment();
    console.log("current time: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(timeConverted), "minutes");
    console.log("Difference in time: " + diffTime);

    var timeRemainder = diffTime % freq;
    console.log("timeRemainder", timeRemainder);

    var tMinsTilTrain = freq - timeRemainder;
    console.log("Minutes until next train: " + tMinsTilTrain);

    var nextTrain = moment().add(tMinsTilTrain, "minutes");
    console.log("Arrival time: " + moment(nextTrain).format("hh:mm"));

    var newRow = $("<tr>").append(
      $("<td>").text(name),
      $("<td>").text(dest),
      $("<td>").text(freq),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinsTilTrain)
    );

    $("#train-table > tbody").append(newRow);

    // Handle the errors. ask ta about other database failing
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

});
