var mongoose = require('mongoose');

var soldSchema = new mongoose.Schema(
    {        
        userID:String,
        propertyID:String,       
        updated_at:{type:Date,default:Date.now}       
    }
);

module.exports = mongoose.model('sold',soldSchema);