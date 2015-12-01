var mongoose = require('mongoose')
, Schema = mongoose.Schema;

var groupSchema = mongoose.Schema({
    name: String,
    users: [{
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  },
      permission: Number
    }]
});

module.exports = mongoose.model('Group', groupSchema);
