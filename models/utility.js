var mongoose = require('mongoose');

var utilitySchema = new mongoose.Schema(
    {        
        name:String,        
        updated_at:{type:Date,default:Date.now}
    }
);

module.exports = mongoose.model('utility',utilitySchema);