const Area = require('./areaModel.js');

module.exports = {
    getAreaCrowds: function(req, res){;
      Area.find({}, function(err, areas){
          if(err){
            console.log("mongo find area err: ", err);
          }
          else{
            res.status(200).json({areas: areas});
          }
      })
    }
}