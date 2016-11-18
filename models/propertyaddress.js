var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaType =mongoose.Schema.Types;

var propertySchema = new mongoose.Schema(
    {        
        propertyID:String,
        country:String,
        state:String,
        city:String,        
        area:String,
        plotnum:String,
        floornum:String,
        zip:Number,       
        lat:SchemaType.Double,
        long:SchemaType.Double,
        updated_at:{type:Date,default:Date.now}
       

    }
);

module.exports = mongoose.model('address',propertySchema);