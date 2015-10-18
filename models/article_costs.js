var mongoose = require('mongoose')
, Schema = mongoose.Schema;

var articlecostsSchema = mongoose.Schema({
    article_id: {type: Schema.Types.ObjectId, rel: 'Article'},
    store_id: {type: Schema.Types.ObjectId, rel: 'Store'},
    costs_id: {type: Schema.Types.ObjectId, rel: 'Costs'}
});

module.exports = mongoose.model('Article_Costs', articlecostsSchema);