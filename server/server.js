const express = require('express');
const middleware = require('./config/middleware.js');
const routes = require('./config/routes.js');

//Create an express instance
const app = express();

//Add middleware to it
middleware(app, express);

//Add routes to it
routes(app, express);

module.exports = app;
