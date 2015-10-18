var mongoose = require('mongoose')
, Schema = mongoose.Schema;

var costSchema = mongoose.Schema({
    price: Number,
    currency: { name: String },
    base_price: { type: String, conversation: Number}
});

module.exports = mongoose.model('Cost', costSchema);