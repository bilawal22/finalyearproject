var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('active_property');
});

module.exports = router;