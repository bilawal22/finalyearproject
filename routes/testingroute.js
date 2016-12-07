var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {


  'use strict';
    class Rating{
      
      constructor(propertyID,rating){
            this.propertyID = propertyID;
            this.rating =rating;      
      }

      get propertyID(){
         return this._propertyID
      }
      set propertyID(_propertyID){
          this._propertyID = _propertyID
      }
      get Rating(){
          return _rating;
      }

      set Rating(_rating){
          this._rating = _rating;
      }


    }  

    class ratingAgent{
      
        constructor(agent,userRating){
            this._agent = agent;
            this._userRating = userRating;
        }
        get agent(){
            return this._agent;
        }
        set agent(_agent){
            this._agent = _agent;
        }

        get userRating(){
            return this._userRating;
        }
        set userRating(_userRating){
            this._userRating = _userRating;
        }
    }
    class MyArray extends Array {
        static get [Symbol.species]() { return Array; }
    }
  
    var a = new MyArray('Ali','Saleem','Ahmed');        
    var ratingArray = [];
    var AgentPropertyRating = null;  
    var ratingAgentArray = [];
    var ratingAge=null;

    for(var i = 0; i<4; i++)
    {
        AgentPropertyRating =new Rating(i,i+2);
        ratingArray.push(AgentPropertyRating);
        
    }  
    ratingAge = new ratingAgent(a[0],ratingArray);
    ratingAgentArray.push(ratingAge);

    for(var i = 0; i<2; i++)
    {
        AgentPropertyRating =new Rating(4+i,i+3);
        ratingArray.push(AgentPropertyRating);
        
    }  
    ratingAge = new ratingAgent(a[1],ratingArray);
    ratingAgentArray.push(ratingAge);
    res.json(ratingAgentArray);                   
    //AgentPropertyRating = new Rating(2,4);
    

});

module.exports = router;