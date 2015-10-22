var mongoose = require('mongoose')
, Schema = mongoose.Schema;

var articlecostsSchema = mongoose.Schema({
    article_id: {type: Schema.Types.ObjectId, rel: 'Article'},
    store_id: {type: Schema.Types.ObjectId, rel: 'Store'},
    costs: {
        price: Number,
        currency: { name: String },
        base_price: { type: String, conversation: Number}
    },
    offer: {
        start_date: Date,
        end_date: Date,
        price: Number,
        cost_id: { type: Schema.Types.ObjectId, rel: 'Cost'}
    }
});

module.exports = mongoose.model('Article_Costs', articlecostsSchema);