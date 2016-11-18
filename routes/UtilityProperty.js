var express = require('express');
var router = express.Router();

var utilitypro = require('../models/utilityproperty.js')

/* GET utilitypros listing. */
router.get('/', function(req, res, next) {
  utilitypro.find(function(err,utilitypros){
      if(err) return next(err);
      res.json(utilitypros);
  });
});

/* POST /utilitypro */
router.post('/',function(req, res, next){
  utilitypro.create(req.body,function(err,post){
    if(err) return next(err);
    res.json(post);
  });
});


/* GET /utilitypro/id */
router.get('/:id',function(req,res,next){
 utilitypro.findById(req.params.id,function(err,post){
   if(err) return next(err);
   res.json(post);
 });
});

/* PUT /utilitypro/id */
router.put('/:id',function(req,res,next){
  utilitypro.findByIdAndUpdate(req.params.id,req,body,function (err,post){
    if(err) return next(err);
    res.json(post);
  });
});


/* DELETE /utilitypro/:id */

router.delete('/:id',function(req,res,next){
  utilitypro.findByIdAndRemove(req.params.id,req.body,function(err,post){
      if(err) return next(err);
      res.json(post);
  });
});

module.exports = router;
