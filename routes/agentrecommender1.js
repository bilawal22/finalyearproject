var express = require('express');
var router = express.Router();

var modelUser = require('../models/User.js');
var modelRating = require('../models/rating.js');
var modelProperty = require('../models/property.js');
var ne = require('node-each');
var mongoose = require('mongoose');
var async = require('async');





//console.log(process.versions);

function getAreas(cityName){
   var promise = modelProperty.find({city:cityName}).exec();
   return promise;
}

var recommenderArray=[];

router.get('/', function(req, res, next) {
       
       'use strict' 
       let area=[];
       var promise = getAreas('Karachi');
      
        promise.then(function(properties){
        properties.forEach(function(property){
          
            area.push(property.area);
        });

        area = uniqueArray(area);
        //console.log(area);

        AgentsRatingList(area,res);
        
       });   
});


function uniqueArray(needles){
    var uniq = needles
            .map((needles) => {
            return {count: 1, needles: needles}
            })
            .reduce((a, b) => {
            a[b.needles] = (a[b.needles] || 0) + b.count
            return a
            }, {})
            needles =[];
            needles =Object.keys(uniq).sort((a, b) => uniq[a] < uniq[b]);
    return needles;
}

function AgentsRatingList(area,res){
'use strict' 
  class Rating{  
            
        constructor(userID,rating){
                this.userID = userID;
                this.rating =rating;      
        }

        get userID(){
            return this._userID
        }
        set userID(_userID){
            this._userID = _userID
        }
        get Rating(){
            return _rating;
        }

        set Rating(_rating){
            this._rating = _rating;
        }


 }  

 class ratingAgent{
            
        constructor(area,agentRating){
            this._area = area;
            this._agentRating = agentRating;
        }
        get area(){
            return this._area;
        }
        set area(_area){
            this._area = _area;
        }

        get agentRating(){
            return this._agentRating;
        }
        set agentRating(_agentRating){
            this._agentRating = _agentRating;
        }
 }
            
          
var AgentRatings = [];
var areasAgentRating = [];  

async.forEach(area, function (ar, callback){ 
  //  console.log(ar);
    modelProperty.find({'area': ar }, function(err, areaAgent) {
    var agentsID=[];

    areaAgent.forEach(function(agent){
        agentsID.push(agent['userID']);
    });

    agentsID = uniqueArray(agentsID);
    
    async.forEach(agentsID, function (item, callback){ 
            
        modelRating.aggregate([                           
            {$group: {_id:item , average: {$avg: '$rating'}}}
        ], function (err, result) {              
            if(err)
                console.log(err);
            else{
               result.forEach(function(agentRate){
                   AgentRatings.push(new Rating(agentRate['_id'],agentRate['average']));
               })
              
               console.log(AgentRatings);
               callback(AgentRatings);  
            }                             
                                  
        });       
    }, function(AgentRatings) {
                
            
            var areaAgents= new ratingAgent(ar,AgentRatings);
            areasAgentRating.push(areaAgents);
         
           console.log(areasAgentRating);
           callback(areasAgentRating);
           
    });  
   
});

 }, function(result) {
    console.log('a');
    res.json(result);
 }); 



}

module.exports = router;
