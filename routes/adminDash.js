var express = require('express');
var router = express.Router();
var fs = require("fs");
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });

/* GET Admin Dashboard page. */

var property = require('../models/property.js');

router.get('/', function(req, res, next) {
  res.render('adminIndex');
});

  //router.post('/', upload.any(), function (req, res) {
  //console.log(req.files);
  //  var file = __dirname + "/" + req.files.filename;
  //  fs.readFile( req.file.path, function (err, data) {
  //       fs.writeFile(file, data, function (err) {
  //        if( err ){
  //             console.error( err );
  //             response = {
  //                  message: 'Sorry, file couldn\'t be uploaded.',
  //                  filename: req.file.filename
  //             };
  //        }else{
  //              response = {
  //                  message: 'File uploaded successfully',
  //                  filename: req.file.originalname
  //             };
  //         }
  //         res.end( JSON.stringify( response ) );
  //      });
  //  });
//});




//router.post('/', upload.any(),function(req, res, next) {
// res.send(req.files);
  //req.files;
//});


router.post('/',function(req, res, next){


  property.create(req.body,function(err,post){
    if(err) return console.log(err);
     console.log(req.body.area);
     res.render('adminIndex');
  });
});


module.exports = router;