var mongoose = require('mongoose');

var propertySchema = new mongoose.Schema(
    {        
        userID:String,
        propertype:String,
        NumOfRoom:Integer,
        price:String,
        propertyDate:String,
        propertyStatus:Integer,
        updated_at:{type:Date,default:Date.now}
       

    }
);

module.exports = mongoose.model('property',UserSchema);