const Area = require('./areaModel.js');

module.exports = {
  getAreaCrowds: function (req, res) {
    Area.find({}, function (err, areas) {
      if (err) {
        console.log("mongo find area err: ", err);
      }
      else {
        res.status(200).json({ areas: areas });
      }
    });
  },
  updateAreaCrowd: function (req, res){
    let name = req.body.name;
    let duration = req.body.duration;
    let numVisitors = req.body.numVisitors;

    Area.find({name:name}, function(err, areas){
      if (err) {
        console.log("mongo find area err: ", err);
      }
      else {
        let area = areas[0];
        area.population += numVisitors;

        area.save(function (err, area) {
          if (err) {
            console.log("ERROR: unable to update")
            res.status(500).send(err)
          }
          else {
            console.log("Update successful");
            setTimeout(function(){
              area.population -= numVisitors;
              area.save();
            }, duration * 60 * 60 * 1000);

            res.status(200).send("Update successful")
          }
        });
      }
    });
  }
}