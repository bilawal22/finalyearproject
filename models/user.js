var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema(
    {        
        name:{
              firstname:String,
              lastname:String
        },
        country:String,
        state:String,
        city:String,
        Address:String,
        contact:{
            phone:String,
            mobilenum:String,
            email:String
        },
        userType:Integer,        
        updated_at:{type:Date,default:Date.now}

    }
);

module.exports = mongoose.model('Todo',TodoSchema);