var mongoose = require('mongoose')
, Schema = mongoose.Schema;

var storeSchema = mongoose.Schema({
    name: String,
    gps: {
        ln: Number,
        lat: Number
    },
    country: String,
    zip: String,
    street: String,
    street_num: Number
});

module.exports = mongoose.model('Store', storeSchema);