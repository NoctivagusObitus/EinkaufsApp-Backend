var mongoose = require('mongoose')
, Schema = mongoose.Schema;

var groupSchema = mongoose.Schema({
    name: String,
    users: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Group', groupSchema);