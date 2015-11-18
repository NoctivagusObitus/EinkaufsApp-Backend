var mongoose = require('mongoose')
, Schema = mongoose.Schema;

var expensesSchema = mongoose.Schema({
    date: Date,
    user_id: Schema.Types.ObjectId,
    title: String,
    repeat: Number
});
module.exports = mongoose.model('Expenses', expensesSchema);