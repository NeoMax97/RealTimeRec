const mongoose = require('mongoose');

let AreaSchema = new mongoose.Schema({
    name: String,
    population: Number
});

module.exports = mongoose.model('Area', AreaSchema);