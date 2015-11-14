var mongoose = require('mongoose')
, Schema = mongoose.Schema;

var storeSchema = mongoose.Schema({
    name: String,
    GPS_lng: Number,
    GPS_lat: Number,
    country: String,
    zip: Number,
    street: String,
    street_num: Number
});

module.exports = mongoose.model('Store', storeSchema);