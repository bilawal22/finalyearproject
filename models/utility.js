var mongoose = require('mongoose');

var propertySchema = new mongoose.Schema(
    {        
        name:String,        
        updated_at:{type:Date,default:Date.now}
    }
);

module.exports = mongoose.model('utility',UserSchema);