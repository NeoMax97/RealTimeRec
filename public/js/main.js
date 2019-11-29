var crowdInd;

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
}

function initializePickers(){
  $('.datepicker').datepicker();
  var date = new Date();
  $('.datepicker').attr("placeholder", date.toDateString());
  $("#date_picker").val(date.toDateString());
  $('.timepicker').timepicker();
  $('.timepicker').attr("placeholder", date.toLocaleTimeString());
  $("#time_picker").val(date.toLocaleTimeString());
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

//Once the DOM is loaded
$().ready( function() {
    //Run these functions
    showIndicator();
    initializeTabs();
    initializePickers();
    initializeSlider();
    updateIndicator();

    //Add event listeners
    $("#refresh").click(updateIndicator);
})
