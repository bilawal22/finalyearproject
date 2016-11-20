var mongoose = require('mongoose');

var ratingSchema = new mongoose.Schema(
    {        
        userID:{type: mongoose.Schema.Types.ObjectId, ref: 'user' },        
        rating:Number,
        propertyID:{type: mongoose.Schema.Types.ObjectId, ref: 'property' },
        updated_at:{type:Date,default:Date.now}       
    }
);

module.exports = mongoose.model('rating',ratingSchema);