var mongoose = require('mongoose');

var upropertySchema = new mongoose.Schema(
    {        
        utilityID:String,
        propertyID:String,       
        updated_at:{type:Date,default:Date.now}       
    }
);

module.exports = mongoose.model('utilityproperty',upropertySchema);