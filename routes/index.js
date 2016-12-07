var express = require('express');
var router = express.Router();
var property = require('../models/property.js')
/* GET home page. */
router.get('/', function(req, res, next) {


   property.find(function(err,properties){

      var newProperties =[];
     
      properties.forEach(function(Property){
        //yconsole.log(Property);
        if(Property.area != undefined){
            Property.propertystatus = 'available';
            
            newProperties.push(Property);
        }
      });

      if(err) return next(err);
        res.render('index', { 
          title: 'Hamari Zameen',
          Properties:newProperties
        });
      //res.json(propertys);
  });
  
});

module.exports = router;
