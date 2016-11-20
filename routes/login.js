
var express = require('express');
var router = express.Router();

var user = require('../models/User.js');
var jwt    = require('jsonwebtoken');
router.post('/', function(req, res) {

	// find the user
 //var Email = user.contact.email;
	user.findOne({
		'contact.email': req.body.email
  }
	, function(err, user) {

		if (err) throw err;

		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' +JSON.stringify( req.body)});
		} else if (user) {

			// check if password matches
			if (user.password != req.body.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.'+JSON.stringify(user)});
			} else {

				// if user is found and password is right
				// create a token
				// var token = jwt.sign(user
				// , {
				// 	expiresIn: 86400 // expires in 24 hours
				// });

				res.json({
					success: true,
					//message: 'Enjoy your token!',
					//token: token
				});
			}		

		}

	});
});


router.use(function(req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];

	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, function(err, decoded) {			
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });		
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;	
				next();
			}
		});

	} else {

		// if there is no token
		// return an error
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});
		
	}
	
});
module.exports = router;