function showIndicator(){
  var crowdIndicator = radialIndicator("#crowd_indicator", {
    barColor: '#b71c1c',
    barWidth: 5,
    minValue: 0,
    maxValue: 3000
});


}

function initializeTabs(){
  $(".tabs").tabs();
}

//Once the DOM is loaded
$().ready( function() {
    //Run these functions
    showIndicator();
    initializeTabs();
    //Add event listeners

})
