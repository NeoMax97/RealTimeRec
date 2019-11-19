//Sets the date picker to today's date and the time picker to right now
function setDateandTime() {
    let date = new Date();

    let day = date.getDate();

    let month = date.getMonth() + 1;    //+1 because 0-Jan, 1-Feb, 2-Mar,etc.
    let year = date.getFullYear();
    let hour = date.getHours();
    let min  = date.getMinutes();

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
    let hours = parseInt(time.substring(0,2));
    let minutes = parseInt(time.substring(3));

    //Since there is no data from 1am to 4am, default to the latest available time (00:00)
    if(hours > 0 && hours < 5){
        hours = 0;
    }

    let date = new Date($('#datePicker').val())

    //ready the payload for HTTP Request
    let payload = {day:date.getUTCDay(), time: hours};

    //Deploy payload
    $.ajax({
        type: 'GET',
        url: '/api/getCrowd',
        data: payload
    }).done(function(data){
        //Update the HTML
        $('#population').html(data.population);
    }).fail(function(jqXHR){
        console.log("ERROR contacting server!");
    })
}

//Once the DOM is loaded
$().ready( function() {
    //Run these functions
    setDateandTime();
    getNumber();

    //Add event listeners
    $('#refresh').click(getNumber);
})
