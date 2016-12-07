var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.post('/', function(req, res, next) {
  sendEmail(req,res);
});


function sendEmail(req, res) {
    // Not the movie transporter!


    //   name:$("#emailFullName").val(),
    //     emailTo:$("#emailEmail").val(),  
    //   number:$("#emailNumber").val(),
    //   emailbody: $("#EmailBody").val()  
    
    var name = req.body.name;
    var fromEmail = req.body.emailFrom;
    var number = req.body.number;
    var body = req.body.emailbody;


    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'saadaslam237@gmail.com', // Your email id
            pass: 'saadbaba' // Your password
        }
    });
    
    var text = body+ '\n\n  http://localhost:3000/property-detail \nClient Name: '+  name + '\n\n Client Number: ' + number;

    var mailOptions = {
    from: fromEmail, // sender address
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
