var express = require('express');
var router = express.Router();

var sold = require('../models/sold.js')

/* GET solds listing. */
router.get('/', function(req, res, next) {
  sold.find(function(err,solds){
      if(err) return next(err);
      res.json(solds);
  });
});

/* POST /sold */
router.post('/',function(req, res, next){
  sold.create(req.body,function(err,post){
    if(err) return next(err);
    res.json(post);
  });
});


/* GET /sold/id */
router.get('/:id',function(req,res,next){
 sold.findById(req.params.id,function(err,post){
   if(err) return next(err);
   res.json(post);
 });
});

/* PUT /sold/id */
router.put('/:id',function(req,res,next){
  sold.findByIdAndUpdate(req.params.id,req,body,function (err,post){
    if(err) return next(err);
    res.json(post);
  });
});


/* DELETE /sold/:id */

router.delete('/:id',function(req,res,next){
  sold.findByIdAndRemove(req.params.id,req.body,function(err,post){
      if(err) return next(err);
      res.json(post);
  });
});

module.exports = router;
