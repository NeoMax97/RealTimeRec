let dayHandler = require('../days/dayHandler.js');

//Add/export api routes
module.exports = function(app, express){
    app.get('/api/getCrowd', dayHandler.getCrowd);
};