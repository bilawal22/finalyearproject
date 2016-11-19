var express = require('express');
var router = express.Router();

/* GET register page. */


var user = require('../models/User.js');

router.get('/', function(req, res, next) {
  res.render('register');
});

/* POST /user */
router.post('/',function(req, res, next){
  user.create(req.body,function(err,post){
    if(err) return console.log(err);
    res.json('true');
  });
});


/* GET /user/id */
router.get('/:id',function(req,res,next){
    user.findById(req.params.id,function(err,post){
      if(err) return console.log(err);
      res.json(post);
    });
});



module.exports = router;
