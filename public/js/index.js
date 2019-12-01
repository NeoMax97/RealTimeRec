//Sets the date picker to today's date and the time picker to right now
function setDateandTime() {
  let date = new Date();

  let day = date.getDate();

  let month = date.getMonth() + 1;    //+1 because 0-Jan, 1-Feb, 2-Mar,etc.
  let year = date.getFullYear();
  let hour = date.getHours();
  let min = date.getMinutes();

  //Formatting to appease the date input and time input standards
  month = (month < 10 ? "0" : "") + month;
  day = (day < 10 ? "0" : "") + day;
  hour = (hour < 10 ? "0" : "") + hour;
  min = (min < 10 ? "0" : "") + min;

  let today = year + "-" + month + "-" + day;
  let displayTime = hour + ":" + min;

  //Updating the HTML
  $('#datePicker').val(today);
  $('#timePicker').val(displayTime);
}

//Updates the displayed Rec Center population based on the Date and Time selected by getting data from that date and time from the database
function getNumber() {
  //Extracts the time from the timePicker
  let time = $('#timePicker').val();
  let hours = parseInt(time.substring(0, 2));
  let minutes = parseInt(time.substring(3));

  if (minutes >= 30) {
    hours += 1;
  }

  //Since there is no data from 1am to 4am, default to the latest available time (00:00)
  if (hours > 0 && hours < 5) {
    hours = 0;
  }

  let date = new Date($('#datePicker').val())

  //ready the payload for HTTP Request
  let payload = { day: date.getUTCDay(), time: hours };

  //Deploy payload
  $.ajax({
    type: 'GET',
    url: '/api/getCrowd',
    data: payload
  }).done(function (data) {
    //Update the HTML
    $('#population').html(data.population);
  }).fail(function (jqXHR) {
    console.log("ERROR contacting server!");
  });
}

// popPartySize populates the #div_party_size div with radiobuttons
function popPartySize() {
  var i;
  var div_party = document.getElementById("div_party_size");
  for (i = 1; i < 10; i++) {
    // Create a radio button and append to #div_party_size
    var radioB = document.createElement("input");
    radioB.type = "radio";
    radioB.id = i.toString();
    radioB.name = "radioParty";
    radioB.value = i;
    radioB.innerText = i;
    div_party.appendChild(radioB);
    // Create a label and append to #div_party_size
    var label = document.createElement("label");
    label.innerText = i.toString();
    div_party.appendChild(label);
  }
  // Create a radio button and append to #div_party_size
  var radioB = document.createElement("input");
  radioB.type = "radio";
  radioB.id = (i - 1).toString() + "+";
  radioB.name = "radioParty";
  radioB.value = i;
  radioB.innerText = (i - 1) + "+";
  div_party.appendChild(radioB);
  // Create a label and append to #div_party_size
  var label = document.createElement("label");
  label.innerText = (i - 1).toString() + "+";
  div_party.appendChild(label);
}


// showSports hides/shows a div showing the sports that occur in the Courts
function showSports(elem) {
  var div_courts = document.getElementById("div_courts");
  var element = document.getElementById(elem);
  if (element.checked == true) {
    div_courts.style.display = "inline";
  } else {
    div_courts.style.display = "none";
  }
}


//Sign in to RealTimeRec
function signIn() {
  //Temp data. Will be replaced by user input in the future
  let time = new Date();
  let duration = 5000;
  let numGuests = 5;

  let payload = {duration: duration, numGuests: numGuests };

  //Deploy payload
  $.ajax({
    type: 'PUT',
    url: '/api/signIn',
    data: payload
  }).done(function (data) {
    //saves info for toggling the checkin section
    localStorage.setItem('time', time);
    localStorage.setItem('duration', duration);

    toggleSignIn();
    getNumber();
  }).fail(function (jqXHR) {
    console.log("ERROR contacting server!");
  });
}

function toggleSignIn() {
  let duration = localStorage.getItem('duration');
  let oldTime = new Date(localStorage.getItem('time'));

  //If the localstorage exists
  if (oldTime != null && duration != null) {
    let currTime = new Date();
    oldTime.setHours(oldTime.getHours() + duration);

    //If you are still 'signed in'
    if (oldTime > currTime) {
      $('#checkIn').hide();
      $('#check_in').html('You are signed in');
    }
    //If your duration has expired
    else{
      $('#checkIn').show();
      $('#check_in').html('Check In: ');
    }
  }
}

//Once the DOM is loaded
$().ready(function () {
  //Run these functions
  setDateandTime();
  getNumber();
  popPartySize();
  toggleSignIn();

  //Add event listeners
  $('#refresh').click(getNumber);
  $('#signIn').click(signIn);
})
