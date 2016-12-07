var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });

/* GET register page. */


router.get('/', function(req, res, next) {
 // res.render('adminIndex');
});

router.post('/', upload.any(),function(req, res, next) {
  res.send(req.files);
});

//router.post('/api/photo',function(req,res){
  //  upload(req,res,function(err) {
        //console.log(req.body);
        //console.log(req.files);
    //    if(err) {
      //      return res.end("Error uploading file.");
       // }
        //res.end("File is uploaded");
   // });
//});



module.exports = router;