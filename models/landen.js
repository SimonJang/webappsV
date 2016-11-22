/**
 * Schema voor land
 */

var mongoose = require('mongoose');

var LandSchema = new mongoose.Schema({
    naam: String,
    hoofdstad: String,
    continent: String
});

mongoose.model('Land', LandSchema);

module.exports = mongoose;
