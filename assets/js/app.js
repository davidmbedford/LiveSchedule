
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

  // Submit Button
  $("#add-train").on("click", function(event) {
    // Don't refresh the page!
    event.preventDefault();

    var name = $("#name-input").val().trim();
    var dest = $("#dest-input").val().trim();
    var time = $("#time-input").val().trim();
    var freq = $("#freq-input").val().trim();

    database.ref().push({
      name: name,
      destination: dest,
      time: time,
      frequency: freq
    });

  });

  // Firebase watcher + initial loader HINT: .on("value")
  database.ref().on("value", function(snapshot) {

    // trying to see whats being logged
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().time);
    console.log(snapshot.val().frequency);

    // this is test code. i will dynamically create divs once i get the firebase portion working


    // Handle the errors. ask ta about other database failing
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
