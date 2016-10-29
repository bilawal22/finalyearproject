var mongoose = require('mongoose');

var propertySchema = new mongoose.Schema(
    {        
        propertyID:String,
        country:String,
        state:String,
        city:String,        
        area:String,
        plotnum:String,
        floornum:String,
        propertyStatus:Integer,
        updated_at:{type:Date,default:Date.now}
       

    }
);

module.exports = mongoose.model('address',UserSchema);