const Day = require('./dayModel.js');

//Export functions corresponding to api routes
module.exports = {
    getCrowd: function(req, res){
      //Extract the time and day number (sun-0, mon-1, tues-2, etc.)
      let d = req.query.day;
      let t = req.query.time;

      //Query the database for documents where day = d
      Day.find({day:d}, function(err, days){
          if(err){
            console.log("mongo find day err: ", err);
          }
          else{
            //Compute the average population of all of these documents at the specified time, t
            let pop = 0;
            days.forEach(function(obj){
              pop += parseInt(obj[t]);
            });
            pop /= days.length;
            pop = Math.round(pop);

            //Send a response with that average
            res.status(200).json({population: pop});
          }
      })
    }
}