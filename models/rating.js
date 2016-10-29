var mongoose = require('mongoose');

var propertySchema = new mongoose.Schema(
    {        
        userID:String,
        propertyID:String,
        rating:Integer,
        updated_at:{type:Date,default:Date.now}
       

    }
);

module.exports = mongoose.model('rating',UserSchema);