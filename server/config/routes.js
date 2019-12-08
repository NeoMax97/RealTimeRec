const dayHandler = require('../days/dayHandler.js');
const areaHandler = require('../areas/areaHandler.js');

module.exports = function(app, express){
    app.get('/api/getCrowd', dayHandler.getCrowd);
    app.get('/api/getAreaCrowds', areaHandler.getAreaCrowds);
    app.put('/api/updateAreaCrowd', areaHandler.updateAreaCrowd);
};