var mongoose = require('mongoose')
, Schema = mongoose.Schema;

var offerSchema = mongoose.Schema({
    start_date: Date,
    end_date: Date,
    price: Number,
    cost_id: { type: Schema.Types.ObjectId, rel: 'Cost'}
});

module.exports = mongoose.model('Offer', offerSchema);