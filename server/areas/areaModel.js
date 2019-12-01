const mongoose = require('mongoose');

//Model for the database, so it knows what its documents should look like
let AreaSchema = new mongoose.Schema({
    name: String,
    population: Number
});

module.exports = mongoose.model('Area', AreaSchema);