var express = require('express');
var router = express.Router();

var property = require('../models/property.js')

/* GET propertys listing. */
router.get('/', function(req, res, next) 
{
  property.find(function(err,propertys){
      if(err) return next(err);

      res.json(propertys);
  });
});


/* POST /property */
router.post('/',function(req, res, next){
 // console.log(res.body.area);  
  property.create(req.body,function(err,post){
    if(err) return next(err);
    res.json(post);
  });
});


/* GET /property/id */
router.get('/:id',function(req,res,next){
 property.findById(req.params.id,function(err,post){
   if(err) return next(err);
   res.json(post);
 });
});

/* PUT /property/id */
router.put('/:id',function(req,res,next){
  property.findByIdAndUpdate(req.params.id,req,body,function (err,post){
    if(err) return next(err);
    res.json(post);
  });
});


/* DELETE /property/:id */

router.delete('/:id',function(req,res,next){
  property.findByIdAndRemove(req.params.id,req.body,function(err,post){
      if(err) return next(err);
      res.json(post);
  });
});

module.exports = router;
