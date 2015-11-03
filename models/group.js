var mongoose = require('mongoose')
, Schema = mongoose.Schema;

var groupSchema = mongoose.Schema({
    name: String,
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    creator: Schema.Types.ObjectId
});

module.exports = mongoose.model('Group', groupSchema);