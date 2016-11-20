var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var SchemaType =mongoose.Schema.Types;

var propertySchema = new mongoose.Schema(
    {        
        userID:{type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        propertype:String,
        NumOfRoom:Number,
        price:String,
        propertyDate:String,
        propertyStatus:Number,
        updated_at:{type:Date,default:Date.now},
        picture:[{
           pic:String
        }],        
        country:String,
        state:String,
        city:String,        
        area:String,
        plotnum:String,
        floornum:String,
        zip:Number,       
        lat:SchemaType.Double,
        long:SchemaType.Double           
        
    }
);

module.exports = mongoose.model('property',propertySchema);