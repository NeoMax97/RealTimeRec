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

    let date = new Date($('#datePicker').val())

    let payload = {day:date.getUTCDay(), time: hours};

    $.ajax({
        type: 'GET',
        url: '/api/getCrowd',
        data: payload
    }).done(function(data){
        console.log('here')
        $('#population').html(data.population);
    }).fail(function(jqXHR){
        console.log("ERROR contacting server!");
    })
}

$().ready( function() {
    setDateandTime();
    getNumber();
    $('#refresh').live('click',function(){console.log('hello')});
})
