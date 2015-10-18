var mongoose = require('mongoose')
, Schema = mongoose.Schema;

var purchaseSchema = mongoose.Schema({
    date: Date,
    buyer_user: { type: Schema.Types.ObjectId, ref: 'User'},
    benefitial_user: { type: Schema.Types.ObjectId, ref: 'User'},
    benefitial_group: { type: Schema.Types.ObjectId, ref: 'Group'},
    purchased_articles: [{article_cots_id: Schema.Types.ObjectId, amount: Number}]
});


purchaseSchema.statics.findByBuyerUser= function (user, schema){
    return this.find({buyer_user: user}, schema);
}

purchaseSchema.statics.findByBenefitialUser= function (user, schema){
    return this.find({benefitial_user: user}, schema);
}

purchaseSchema.statics.findByBuyerUser= function (user, schema){
    return this.find({buyer_user: user}, schema);
}
module.exports = mongoose.model('Purchase', purchaseSchema);