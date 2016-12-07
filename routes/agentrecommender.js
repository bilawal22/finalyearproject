var express = require('express');
var router = express.Router();

var modelUser = require('../models/User.js');
var modelRating = require('../models/rating.js');
var modelProperty = require('../models/property.js');
var mongoose = require('mongoose');
var async = require('async');
var LINQ = require('node-linq').LINQ;


var agentRecommendation = [];
var areasAgentRating=[];

function getAreas(cityName){
   var promise = modelProperty.find({city:cityName}).exec();
   return promise;
}

    function Recommendation(area, agentRating){
       
        this._area = area;
        this._agentRating = agentRating;
        
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
       // console.log(area);    
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

function AgentsRatingList(areas,res){
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
var functions = [];  

  async.forEach(areas, function (area, callback){ 
   modelProperty.find({'area': area }, function(err, areaAgent) {
                            var agentsID=[];
                          
                            areaAgent.forEach(function(agent){
                                agentsID.push(agent['userID']);
                            });

                            agentsID = uniqueArray(agentsID);
                          
                            async.forEach(agentsID, function (item, callback){ 
            
                            modelRating.aggregate(
                                [                           
                                    {$group: {
                                        _id:item , average: {$avg: '$rating'}
                                    }
                                }

                                ], function (err, result) {              
                                    if(err)
                                        console.log(err);
                                    else{
                                    result.forEach(function(agentRate){
                                       
                                        AgentRatings = [];
                                        AgentRatings.push(new Rating(agentRate['_id'],agentRate['average']));
                                    })
                                                                       
                                   callback(null,null);  
                                    }                             
                                                        
                                });       
                            }, function(err,result) {
                                        
                                    
                                var areaAgents= new ratingAgent(area,AgentRatings);
                               
                                areasAgentRating.push(areaAgents);

                             
                               
                                callback(null,null);                                
                                
                            });  
                
                    });
                },function(err,result) {

                    var areaAgentRating = areasAgentRating[0];
                    topMatches(areaAgentRating.area,areasAgentRating);
                    var rating;
                     
                    function topMatches(area, areasAgentRating){
                        //var sortedList = areasAgentRating
                    
                        areasAgentRating.forEach(function (areaAgent){
                            agentRecommendation[areaAgent['area']]=areaAgent['agentRating'];
                        });
                      
                        
                        var sortedList = new LINQ(areasAgentRating)
                            .Where(row => row.area != area)
                            .OrderBy(row=>row)
                            .ToArray();

                        var recommendations = [];
                    
                        sortedList.forEach(function(property){
                                CalculatePearsonCorrelation(area, property.area);
                               // console.log(rating);
                                recommendations.push(new Recommendation(property.area,rating));
                        });

                        recommendations = new LINQ(recommendations).OrderByDescending(x=>x.rating).ToArray();
                        recommendations = recommendations.slice(0,3);
                      //  res.json(areasAgentRating);
                       
                        var agentsRecommendation = [];
                         
                         recommendations.forEach(function(recom){
                            //console.log(recom);
                            agentsRecommendation.push( new LINQ(areasAgentRating).
                                Where(x=>x._area==recom._area).ToArray());
                        });
                       // console.log(agentsRecommendation);
                       var _agentRating =[];
                       var agentList = [];
                        agentsRecommendation.forEach(function(agents){
                            agents.forEach(function(agent){
                                //console.log();
                                _agentRating =agent['_agentRating'];
                               // console.log(_agentRating[0]['_userID']); 
                                _agentRating.forEach(function(userID){
                                   agentList.push(userID['_userID']);
                                });
                                
                            });
                           
                        });
                        recommendedAgent(agentList);
                        //console.log(agentList);
                    }

                    function CalculatePearsonCorrelation(product1, product2){
                        var sharedItem =[];
                        agentRecommendation[product1].forEach(function(recommend){
                    
                            var isMatch = (new LINQ(agentRecommendation[product2])
                                .Where(x=>x._userID==recommend._userID).Count() !=0);
                           
                            if (isMatch)
                            {
                            sharedItem.Add(item);
                            }                
                            
                            if(sharedItem.length==0)
                            {                                                               
                                rating = sharedItem.length;
                                return sharedItem.length;
                            }
                        
                            var product1_review_sum = 0.00;
                        
                            for (item in sharedItem)
                            {
                                product1_review_sum += new LINQ(agentRecommendation[product1]).Where(x => x.area == item.area).FirstOrDefault().rating;
                            }

                            var product2_review_sum = 0.00;
                            for (item in sharedItem)
                            {
                                product2_review_sum += new LINQ(agentRecommendation[product2]).Where(x => x.area == item.area).FirstOrDefault().Rating;
                            }

                            // sum up the squares
                            var product1_rating = 0;
                            var product2_rating = 0;
                            for (item in sharedItem)
                            {
                                product1_rating += Math.Pow( new LINQ(agentRecommendation[product1]).Where(x => x.area == item.area).FirstOrDefault().Rating, 2);
                                product2_rating += Math.Pow(new LINQ(agentRecommendation[product2]).Where(x => x.area == item.area).FirstOrDefault().Rating, 2);
                            }

                            //sum up the products
                            var critics_sum = 0;
                            for (item in sharedItem)
                            {
                                critics_sum += new LINQ(agentRecommendation[product1]).Where(x => x.area == item.area).FirstOrDefault().Rating *
                                                new LINQ(agentRecommendation[product2]).Where(x => x.area == item.area).FirstOrDefault().Rating;

                            }

                            //calculate pearson score
                            var num = critics_sum - (product1_review_sum * product2_review_sum / sharedItem.length);

                            var density = Math.Sqrt((product1_rating - Math.Pow(product1_review_sum, 2) / sharedItem.length) 
                                * ((product2_rating - Math.Pow(product2_review_sum, 2) / sharedItem.length)));

                            if (density == 0){
                                rating = 0;
                                return 0;
                            }                                
                            rating = num / density; 
                            return num / density;              
                         });                
                
                    }    

                    function recommendedAgent(agentList){
                        var agentRecommendedName = [];
                        async.forEach(agentList, function (agent, callback){
                            console.log(agent);
                                modelUser.findById( agent, function(err, areaAgent) {
                                        console.log(areaAgent);
                                        agentRecommendedName.push(areaAgent);
                                        callback(err,null);
                                });
                        },function(err,result){

                            console.log(agentRecommendedName);
                        });
                    }                                                                                                               
             }); 





}
module.exports = router;