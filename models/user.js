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
        password:String
        ,
        zip:String,
        usertype:Number,
        picture:String,
        age:Number,
        Gender:Boolean,        
        updated_at:{type:Date,default:Date.now},       
        properties : { type: mongoose.Schema.Types.ObjectId, ref: 'Property' }
    }
);

module.exports = mongoose.model('user',UserSchema);