var crowdInd;
var checkout_time;
var checkout_func;

function showIndicator(){
  var crowdIndicator = radialIndicator("#crowd_indicator", {
    barColor: '#b71c1c',
    barWidth: 5,
    minValue: 0,
    maxValue: 3000
  });
  crowdInd = crowdIndicator;
}

function updateIndicator(){
  let date = new Date($('#date_picker').val())

  //Extracts the time from the timePicker
  let time = $('#time_picker').val();
  let hours = parseInt(time.substring(0,2));
  let minutes = parseInt(time.substring(3));

  if(minutes >= 30){
      hours += 1;
  }
  //Since there is no data from 1am to 4am, default to the latest available time (00:00)
  if(hours > 0 && hours < 5){
      hours = 0;
  }


  //ready the payload for HTTP Request
  let payload = {day:date.getUTCDay(), time: hours};

  //Deploy payload
  $.ajax({
      type: 'GET',
      url: '/api/getCrowd',
      data: payload
  }).done(function(data){
      // $('#population').html(data.population);
      crowdInd.animate(data.population);
      console.log("population: ", data.population);
  }).fail(function(jqXHR){
      console.log("ERROR contacting server!");
  })
}

function initializeTabs(){
  $(".tabs").tabs();
  // document.getElementById("checkout_content").style.display = "none";
  document.getElementById("checkout_content").classList.add("hide");
}

function initializePickers(){
  var date = new Date();
  $('.datepicker').datepicker({
    showClearBtn: true,
    format: "ddd mmm dd yyyy",
    onClose: function(){
      if ($("#date_picker").val() == ""){
        date = new Date();
        $("#date_picker").val(date.toDateString());
      }
    }
  });

  $('.datepicker').attr("placeholder", date.toDateString());
  $("#date_picker").val(date.toDateString());
  $('.timepicker').timepicker({
    showClearBtn: true,
    onCloseStart: function(){
      if ($("#time_picker").val() == ""){
        date = new Date();
        $("#time_picker").val(((date.getHours() % 12)+":"+date.getMinutes()+" "+(date.getHours() > 12 ? "PM":"AM")));
      }

    }
  });
  $('.timepicker').attr("placeholder", (((date.getHours() % 12)+":"+date.getMinutes()+" "+(date.getHours() > 12 ? "PM":"AM"))));
  $("#time_picker").val(((date.getHours() % 12)+":"+date.getMinutes()+" "+(date.getHours() > 12 ? "PM":"AM")));

}

function initializeSlider(){
  var slider = document.getElementById('party_slider');
  noUiSlider.create(slider, {
   start: [1],
   tooltips: true,
   connect: 'lower',
   step: 1,
   orientation: 'horizontal', // 'horizontal' or 'vertical'
   range: {
     'min': 1,
     'max': 10
   },
   // Number Formatting
   format: wNumb({
     decimals: 0,
     // fix for 4 returning as 3.99999
     // and 7 returning as 6.99999
     encoder: function(value){
       return Math.round(value);
     }
   }) // end of format
  });
  var rangeSliderValueElement = document.getElementById('party_slider_value');

  slider.noUiSlider.on('update', function (values, handle) {
    rangeSliderValueElement.innerText = values[handle];
 });
}

function selectCard(id){
  var card = document.getElementById(id);
  if (card.classList.contains("blue-grey")){
    card.classList.remove("blue-grey");
    card.classList.remove("lighten-5");
    card.classList.add("red");
    card.classList.add("lighten-4");
  }else{
    card.classList.remove("red");
    card.classList.remove("lighten-4");
    card.classList.add("blue-grey");
    card.classList.add("lighten-5");
  }
}

function check_in(id){
  var courts_card = document.getElementById("courts_card");
  var track_card = document.getElementById("track_card");
  var gym_card = document.getElementById("gym_card");
  var party_size = document.getElementById("party_slider_value");

  var courts_val = parseInt($("#courts_val").text().split(" ")[0]);
  var track_val = parseInt($("#track_val").text().split(" ")[0]);
  var gym_val = parseInt($("#gym_val").text().split(" ")[0]);
  var party_size = parseInt($("#party_slider_value").text());

  if (courts_card.classList.contains("red")){
    courts_val += party_size;
    // Update value in db
    // Reset to White
    selectCard("courts_card");
  }
  if (track_card.classList.contains("red")){
    track_val += party_size;
    // Update value in db
    // Reset to White
    selectCard("track_card");
  }
  if (gym_card.classList.contains("red")){
    gym_val += party_size;
    // Update value in db
    // Reset to White
    selectCard("gym_card");
  }

  console.log("Courts: ", courts_val);
  console.log("Track: ", track_val);
  console.log("Gym: ", gym_val);

  checkin_checkout(id);

}

function checkin_checkout(id){
  if (id == "submit"){
    // document.getElementById("checkin_content").style.display = "none";
    // document.getElementById("checkout_content").style.display = "inline";
    document.getElementById("checkin_content").classList.add("hide");
    document.getElementById("checkout_content").classList.remove("hide");
  }
  else if (id == "checkout_man_card"){
    // document.getElementById("checkin_content").style.display = "inline";
    // document.getElementById("checkout_content").style.display = "none";
    document.getElementById("checkin_content").classList.remove("hide");
    document.getElementById("checkout_content").classList.add("hide");
    document.getElementById("checkout_auto").classList.remove("hide");
    document.getElementById("checkout_timer_container").classList.add("hide");
    clearInterval(checkout_func);
  }
}

function check_out_setup(){
  document.getElementById("checkout_timer_container").classList.add("hide");
  for (var i = 1; i < 5; i++){
    if (i == 1){
      optionText = i + " hour";
      $("#check_out_dropdown").append(new Option(optionText, i));
    }else{
      optionText = i + " hours";
      $("#check_out_dropdown").append(new Option(optionText, i));
    }
  }
  $("#check_out_dropdown").formSelect();
  // document.getElementById("tab3").style.display = "none";
}

function checkout_timer(){
  var duration = parseInt(document.getElementById("check_out_dropdown").value.split(" ")[0]);
  document.getElementById("checkout_auto").classList.add("hide");
  document.getElementById("checkout_timer_container").classList.remove("hide");
  // var curr_time = new Date();
  // var checkout_text = ((curr_time.getHours() + duration) % 24).toString() + ":" + curr_time.getMinutes().toString();
  checkout_time = duration * 60;
  update_timer(checkout_time);
  checkout_func = setInterval(update_timer, 60000);

}

function update_timer(){
  mins = checkout_time;
  if (mins > 0){
    var checkout_text = (Math.floor(mins/60)) + ":" + ((mins % 60) < 10 ? ("0" + (mins % 60)) : (mins % 60)); // (mins % 60);
    // date.getHours() > 12 ? "PM":"AM"
    document.getElementById("checkout_timer_text").innerText = checkout_text;
    checkout_time -= 1;
  }else{
    clearInterval(checkout_func);
  }
}

//Once the DOM is loaded
$().ready( function() {
    //Run these functions
    showIndicator();
    initializeTabs();
    initializePickers();
    initializeSlider();
    updateIndicator();
    check_out_setup();
    //Add event listeners
    $("#refresh").click(updateIndicator);


})
