var mongoose = require('mongoose')
, Schema = mongoose.Schema;

var purchaseSchema = mongoose.Schema({
    date: Date,
    owner_id: Schema.Types.ObjectId,
    store_id: Schema.Types.ObjectId,
    cart: [{ amount: Number, article_store_id: Schema.Types.ObjectId, benefitial_id: Schema.Types.ObjectId}]
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