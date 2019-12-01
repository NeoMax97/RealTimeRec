const dayHandler = require('../days/dayHandler.js');
const populationHandler = require('../areas/areaHandler.js');

//Add/export api routes
module.exports = function(app, express){
    app.get('/api/getCrowd', dayHandler.getCrowd);
    app.put('/api/signIn', populationHandler.signIn);
};