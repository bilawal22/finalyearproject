var express = require('express');
var router = express.Router();

var propertyAdd = require('../models/propertyaddress.js')

/* GET propertyAdds listing. */
router.get('/', function(req, res, next) {
  propertyAdd.find(function(err,propertyAdds){
      if(err) return next(err);
      res.json(propertyAdds);
  });
});

/* POST /propertyAdd */
router.post('/',function(req, res, next){
  propertyAdd.create(req.body,function(err,post){
    if(err) return next(err);
    res.json(post);
  });
});


/* GET /propertyAdd/id */
router.get('/:id',function(req,res,next){
 propertyAdd.findById(req.params.id,function(err,post){
   if(err) return next(err);
   res.json(post);
 });
});

/* PUT /propertyAdd/id */
router.put('/:id',function(req,res,next){
  propertyAdd.findByIdAndUpdate(req.params.id,req,body,function (err,post){
    if(err) return next(err);
    res.json(post);
  });
});


/* DELETE /propertyAdd/:id */

router.delete('/:id',function(req,res,next){
  propertyAdd.findByIdAndRemove(req.params.id,req.body,function(err,post){
      if(err) return next(err);
      res.json(post);
  });
});

module.exports = router;
