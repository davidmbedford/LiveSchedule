
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAEZBnUyr8p-OZRWWMegf5foXvsr6JdETw",
    authDomain: "mar-28-project-one.firebaseapp.com",
    databaseURL: "https://mar-28-project-one.firebaseio.com",
    projectId: "mar-28-project-one",
    storageBucket: "mar-28-project-one.appspot.com",
    messagingSenderId: "647628320169"
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
database.ref().on("value", function(snapshot) {
  event.preventDefault();
  console.log(snapshot.val());

    var name = snapshot.val().name;
    var dest = snapshot.val().destination;
    var time = snapshot.val().time;
    var freq = snapshot.val().frequency;

    console.log(name);
    console.log(dest);
    console.log(time);
    console.log(freq);

    var timeConverted = moment(time, "HH:mm").subtract(1, "years");
    console.log(timeConverted);

    var currentTime = moment();
    console.log("current time: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(timeConverted), "minutes");
    console.log("Difference in time: " + diffTime);

    var timeRemainder = diffTime % freq;
    console.log(timeRemainder);

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
