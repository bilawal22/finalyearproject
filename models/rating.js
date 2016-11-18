var mongoose = require('mongoose');

var ratingSchema = new mongoose.Schema(
    {        
        userID:[{type: mongoose.Schema.Types.ObjectId, ref: 'user' }],        
        rating:Number,
        updated_at:{type:Date,default:Date.now}
       

    }
);

module.exports = mongoose.model('rating',ratingSchema);