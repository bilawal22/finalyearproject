var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.post('/', function(req, res, next) {
  sendEmail(req,res);
});


function sendEmail(req, res) {
    // Not the movie transporter!
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'bilawal225@gmail.com', // Your email id
            pass: 'ddbbtt22' // Your password
        }
    });
    
    var text = 'Hello world from \n\n' + req.body.name;

    var mailOptions = {
    from: 'bilawal_22@live.com', // sender address
    to: 'bilawal225@gmail.com', // list of receivers
    subject: 'Email Example', // Subject line
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
