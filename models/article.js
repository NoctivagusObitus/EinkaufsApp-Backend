var mongoose = require('mongoose')
, Schema = mongoose.Schema;

var articleSchema = mongoose.Schema({
    name: String,
    ean: String
});

articleSchema.statics.findByName = function (name, schema){
    return this.find({name: name, schema});
}

articleSchema.statics.findByEan = function (ean, schema){
    return this.find({ean: ean, schema});
}

articleSchema.statics.findbyIds = function(ids, schema){
    for(var i = 0; i < ids.length; i++){
       ids[i] = mongoose.Types.ObjectId(ids[i]);
    }
    
    return this.find({ _id: { $in: ids }}, schema);   
} 

module.exports = mongoose.model('Article', articleSchema);