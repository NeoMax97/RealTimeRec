const Area = require('./areaModel.js');

module.exports = {
  //Returns the number of people in each location to the browser
  getAreaCrowds: function (req, res) {
    //Search the DB for all areas
    Area.find({}, function (err, areas) {
      if (err) {
        console.log("mongo find area err: ", err);
      }
      else {
        //Send areas back ti the browser
        res.status(200).json({ areas: areas });
      }
    });
  },

  //Updates a specific area's population
  updateAreaCrowd: function (req, res){

    let name = req.body.name; //name of the area
    let duration = req.body.duration; //how long the party will be there for. Used by setTimeout()
    let partySize = req.body.partySize; //How big the party size is

    //Find the specified area
    Area.find({name:name}, function(err, areas){
      if (err) {
        console.log("mongo find area err: ", err);
      }
      else {
        let area = areas[0];  //find returns an array, even if only one item is found

        //increments the population by the party size
        area.population += parseInt(partySize);

        area.save(function (err, area) {
          if (err) {
            console.log("ERROR: unable to update")
            res.status(500).send(err)
          }
          else {
            console.log("Update successful");
            
            //Decrements the population after the given duration has passed
            setTimeout(function(){
              area.population -= parseInt(partySize);
              area.save();
            }, duration * 60 * 60 * 1000); //Conversion from hours to milliseconds

            res.status(200).send("Update successful")
          }
        });
      }
    });
  },

  checkOut: function(req, res){
    let name = req.body.name; //name of the area
    let milliseconds = req.body.milliseconds; //how long the party will be there for. Used by setTimeout()
    let partySize = req.body.partySize; //How big the party size is

    //Find the specified area
    Area.find({name:name}, function(err, areas){
      if (err) {
        console.log("mongo find area err: ", err);
      }
      else {
        let area = areas[0];  //find returns an array, even if only one item is found

        //increments the population by the party size
        area.population -= parseInt(partySize);

        area.save(function (err, area) {
          if (err) {
            console.log("ERROR: unable to update")
            res.status(500).send(err)
          }
          else {
            console.log("Update successful");
            //Decrements the population after the given duration has passed
            setTimeout(function(){
              area.population += parseInt(partySize);
              area.save();
            }, milliseconds); //Conversion from hours to milliseconds

            res.status(200).send("Update successful")

          }
        });
      }
    });
  }
}