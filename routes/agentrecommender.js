var express = require('express');
var router = express.Router();

var modelUser = require('../models/User.js');
var modelRating = require('../models/rating.js');
var modelProperty = require('../models/property.js');
var ne = require('node-each');
var mongoose = require('mongoose');

// class rating{
      
//       constructor(propertyID,rating){
//             this.propertyID = propertyID;
//             this.rating =rating;      
//       }

//      // get
// }






var recommenderArray=[];

router.get('/', function(req, res, next) {
var dbUsers=[] 
 modelRating.find(function(err,ratings){           
  if(err) return next(err);
      dbUsers=[];
      ratings.forEach(function(rating){
                  var userID = rating.userID;          
                       dbUsers.push(userID);         
                                           
            });
            
            var uniq = dbUsers
            .map((dbUsers) => {
            return {count: 1, dbUsers: dbUsers}
            })
            .reduce((a, b) => {
            a[b.dbUsers] = (a[b.dbUsers] || 0) + b.count
            return a
            }, {})
            dbUsers =[];
            dbUsers =Object.keys(uniq).sort((a, b) => uniq[a] < uniq[b])
            //res.json(dbUsers);
            recommendedAgent(res,dbUsers);
  });
       
});

function recommendedAgent(res,Agents){
      res.json(Agents);            
}


var contains= function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};
module.exports = router;
