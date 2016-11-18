var express = require('express');
var router = express.Router();

var rating = require('../models/rating.js')

/* GET ratings listing. */
router.get('/', function(req, res, next) {
  rating.find(function(err,ratings){
      if(err) return next(err);
      res.json(ratings);
  });
});

router.get('/', function(req, res, next) {
  rating.find({'userID':req.params.id}
,function(err,ratings){
      if(err) return next(err);
      res.json(ratings);
  });
});
/* POST /rating */
router.post('/',function(req, res, next){
  rating.create(req.body,function(err,post){
    if(err) return next(err);
    res.json(post);
  });
});


/* GET /rating/id */
router.get('/:id',function(req,res,next){
 rating.findById(req.params.id,function(err,post){
   if(err) return next(err);
   res.json(post);
 });
});

/* PUT /rating/id */
router.put('/:id',function(req,res,next){
  rating.findByIdAndUpdate(req.params.id,req,body,function (err,post){
    if(err) return next(err);
    res.json(post);
  });
});


/* DELETE /rating/:id */

router.delete('/:id',function(req,res,next){
  rating.findByIdAndRemove(req.params.id,req.body,function(err,post){
      if(err) return next(err);
      res.json(post);
  });
});

module.exports = router;
