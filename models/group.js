var mongoose = require('mongoose')
, Schema = mongoose.Schema;

var groupSchema = mongoose.Schema({
    name: String,
    users: [{user_id: Schema.Types.ObjectId, permission: Number}],
});

module.exports = mongoose.model('Group', groupSchema);