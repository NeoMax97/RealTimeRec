const bodyParser = require('body-parser');

//Add/export middleware (anything passed to app.use(...))
module.exports = function(app, express){
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(express.static(__dirname + '/../../public'));
};