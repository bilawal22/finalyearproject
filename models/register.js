var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
     username: {type: String, unique: true },
	 password: {type: String},
	 fullname:String,
	 confirmpassword: String,
	 address: String
	 
	 });
	 
	 var register = mongoose.model('realestate',UserSchema);
	 module.experts = register;
    