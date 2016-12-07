var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');
/* GET register page. */

router.get('/', function(req, res, next) {
  res.render('adminInbox');
});
router.post('/', function(req, res, next) {
  sendEmail(req,res);
});


function sendEmail(req, res) {
      
    
  //  var name = req.body.name;
    //var fromEmail = req.body.emailFrom;
    //var number = req.body.number;
    var body = req.body.emailbody;

    console.log(body);
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'saadaslam237@gmail.com', // Your email id
            pass: 'saadbaba' // Your password
        }
    });
    
    var text = body+ '\n\n  http://localhost:3000/ratingdialog';

    var mailOptions = {
    from: 'bilawal225@gmail.com', // sender address
    to: 'tahirnisar8@gmail.com', // list of receivers
    subject: 'Property Query', // Subject line
    text: text
   };


   transporter.sendMail(mailOptions, function(error, info){
       
        if(error){
            console.log(error);
            res.json({yo: 'error'});
        }else{
            console.log('Message sent: ' + info.response);
            res.json({yo: info.response});
        }
    });
}


module.exports = router;