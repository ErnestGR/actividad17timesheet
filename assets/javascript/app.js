// Initialize Firebase

$(document).ready(function() {    

  var config = {
    apiKey: "AIzaSyC_VZELnTN7j0ze48EAIFkqFJrB70actT4",
    authDomain: "timesheet-37041.firebaseapp.com",
    databaseURL: "https://timesheet-37041.firebaseio.com",
    projectId: "timesheet-37041",
    storageBucket: "timesheet-37041.appspot.com",
    messagingSenderId: "828927234718"
  };
  firebase.initializeApp(config);

  // Create a variable to reference the database
  var database   = firebase.database();
  var name       = "";
  var role       = "";
  var startDate  = "";
  var monthlyRate = "";

  // Capture Button Click
  $("#submitId").on("click", function(event) {
    // Don't refresh the page!
    event.preventDefault();

    // YOUR TASK!!!
    // Get inputs
    name        = $("#name-input").val().trim();
    role        = $("#role-input").val().trim();
    startDate   = $("#startDate-input").val().trim();
    monthlyRate = $("#monthlyRate-input").val().trim();
    // Code in the logic for storing and retrieving the most recent user.
    // Change what is saved in firebase
    database.ref().push({
      name: name,
      role: role,
      startDate: startDate,
      monthlyRate: monthlyRate,
      // me manda la cantidad de segundos desde 1970 a la fecha actual
      // dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });

// Vamos a hablarle a la BD 

database.ref().on("child_added", function(snapshotChild) {

    // Print the initial data to the console.
    console.log(snapshotChild.val());

    // Log the value of the various properties
    console.log(snapshotChild.val().name);
    console.log(snapshotChild.val().role);
    console.log(snapshotChild.val().startDate);
    console.log(snapshotChild.val().monthlyRate);
    
    // Calculamos los meses que lleva trabajando
    // var monthsWorked = 0;
    var yrsWorked = moment(snapshotChild.val().startDate, "MM/DD/YYYY").fromNow();
    
    yrsWorked = yrsWorked * 12;

    // Create the new row
    var newRow = $("<tr>").append(
      
      $("<td>").text(snapshotChild.val().name),
      
      $("<td>").text(snapshotChild.val().role),
      
      $("<td>").text(snapshotChild.val().startDate),
      
      // Cuantos meses lleva ativo
      $("<td>").text(yrsWorked),

      $("<td>").text(snapshotChild.val().monthlyRate),
      
      // Total Billing
      $("<td>").text("y"),
    );
    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);

   
    // If any errors are experienced, log them to console.
    }, function(errorObject) {
    console.log("Errors Handled: " + errorObject.code);
    });



});
