
function setDateandTime() {
    let date = new Date();

    let day = date.getDate();

    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let min  = date.getMinutes();

    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;
    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;

    let today = year + "-" + month + "-" + day;
    let displayTime = hour + ":" + min;

    $('#datePicker').val(today);
    $('#timePicker').val(displayTime);
}

function getNumber() {

    let time = $('#timePicker').val();
    let hours = parseInt(time.substring(0,2));
    let minutes = parseInt(time.substring(3));

    if(minutes >= 30){
        hours += 1;
    }

    if(hours > 0 && hours < 5){
        hours = 0;
    }

    let date = new Date($('#datePicker').val())

    let payload = {day:date.getUTCDay(), time: hours};

    $.ajax({
        type: 'GET',
        url: '/api/getCrowd',
        data: payload
    }).done(function(data){
        $('#population').html(data.population);
    }).fail(function(jqXHR){
        console.log("ERROR contacting server!");
    })
}

// popPartySize populates the #div_party_size div with radiobuttons
function popPartySize(){
  var i;
  var div_party = document.getElementById("div_party_size");
  for (i = 1; i < 10; i++){
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
  radioB.id = (i-1).toString()+"+";
  radioB.name = "radioParty";
  radioB.value = i;
  radioB.innerText = (i-1)+"+";
  div_party.appendChild(radioB);
  // Create a label and append to #div_party_size
  var label = document.createElement("label");
  label.innerText = (i-1).toString()+"+";
  div_party.appendChild(label);
}


// showSports hides/shows a div showing the sports that occur in the Courts
function showSports(elem){
  var div_courts = document.getElementById("div_courts");
  var element = document.getElementById(elem);
  if (element.checked == true){
    div_courts.style.display = "inline";
  }else{
    div_courts.style.display = "none";
  }
}

$().ready( function() {
    setDateandTime();
    getNumber();
    popPartySize();
    $('#refresh').click(getNumber);
})
