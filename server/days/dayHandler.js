const Day = require('./dayModel.js');

module.exports = {
    getCrowd: function(req, res){;
        let d = req.query.day;
        let t = req.query.time;

      Day.find({day:d}, function(err, days){
          if(err){
            console.log("mongo find day err: ", err);
          }
          else{
            let pop = 0;
            days.forEach(function(obj){
              pop += parseInt(obj[t]);
            });
            pop /= days.length;
            pop = Math.round(pop);

            res.status(200).json({population: pop});
          }
      })
    }
}