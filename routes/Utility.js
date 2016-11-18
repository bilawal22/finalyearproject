var express = require('express');
var router = express.Router();

var utility = require('../models/utility.js')

/* GET utilitys listing. */
router.get('/', function(req, res, next) {
  utility.find(function(err,utilitys){
      if(err) return next(err);
      res.json(utilitys);
  });
});

/* POST /utility */
router.post('/',function(req, res, next){
  utility.create(req.body,function(err,post){
    if(err) return next(err);
    res.json(post);
  });
});


/* GET /utility/id */
router.get('/:id',function(req,res,next){
 utility.findById(req.params.id,function(err,post){
   if(err) return next(err);
   res.json(post);
 });
});

/* PUT /utility/id */
router.put('/:id',function(req,res,next){
  utility.findByIdAndUpdate(req.params.id,req,body,function (err,post){
    if(err) return next(err);
    res.json(post);
  });
});


/* DELETE /utility/:id */

router.delete('/:id',function(req,res,next){
  utility.findByIdAndRemove(req.params.id,req.body,function(err,post){
      if(err) return next(err);
      res.json(post);
  });
});

module.exports = router;
