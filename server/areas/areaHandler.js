const Area = require('./areaModel.js');

//Export functions corresponding to api routes
module.exports = {
  signIn: function (req, res) {
    //Get data from the request
    let duration = req.body.duration;
    let numGuests = req.body.numGuests;

    //Find the corresponding area
    Area.find({ name: "total" }, function (err, area) {
      if (err) {
        console.log("mongo find day err: ", err);
        res.status(500).send(err)
      }
      else {
        //increment the population of the specified area
        area[0].population += numGuests;

        area[0].save(function (err, a) {
          if (err) {
            console.log("ERROR: unable to update")
            res.status(500).send(err)
          }
          else {
            console.log("Update successful");
            res.status(200).send("Update successful");
            
            //The area will have its population decremented once the duration has passed
            setTimeout(function () {
              Area.find({ name: 'total' }, function (err, area) {
                if (err) {
                  console.log("mongo find day err: ", err);
                }
                else {
                  area[0].population -= numGuests;
                  area[0].save(function (err, a) {
                    if (err) {
                      console.log("ERROR: unable to update");
                      res.status(500).send(err);
                    }
                    else {
                      console.log("Update success");
                    }
                  });
                }
              });
            }, duration);
          }
        });
      }
    });
  }
}