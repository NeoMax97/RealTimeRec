let dayHandler = require('../days/dayHandler.js');

module.exports = function(app, express){
    app.get('/api/getCrowd', dayHandler.getCrowd);
};