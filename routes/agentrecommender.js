var express = require('express');
var router = express.Router();

var modelUser = require('../models/User.js');
var modelRating = require('../models/rating.js');
var modelProperty = require('../models/property.js');
var ne = require('node-each');
var mongoose = require('mongoose');



var rating = function(propertyID,rating){
      this.propertyID = propertyID;
      this.rating =rating;      
}

var users=[];

var recommenderArray=[];

router.get('/', function(req, res, next) {     
 rating.find(function(err,ratings){           
  if(err) return next(err);
      ratings.forEach(function(rating){
                  var userID = rating.userID;          
                  console.log(userID);                                             
                  users.push(userID);                  
            });
  });
       
});

function recommendedAgent(res,Agents){
      res.json(Agents);            
}

module.exports = router;
