var express = require('express');
var router = express.Router();

var modelUser = require('../models/User.js');
var modelRating = require('../models/rating.js');
var modelProperty = require('../models/property.js');
var ne = require('node-each');
var mongoose = require('mongoose');


var recommendAgent = function(ID,propertyArea,propertyStatus
,propertyCity,propertyState,propertyCountry,rating,name){

      this.ID = ID;
      this.propertyArea = propertyArea;
      this.propertyCity = propertyCity;      
      this.propertyState = propertyState;
      this.propertyCountry = propertyCountry;
      this.rating = rating;
      this.name = name;
};
 

var recommenderArray=[];

router.get('/', function(req, res, next) {     
      // modelProperty.find(function(err,dbproperty){
      //       var recommenderObject;     
      //             /// console.log(attributename+": "+myobject[attributename]);
      //             ne.each(dbproperty,function(property,i){
      //             recommenderObject = new recommendAgent();
                  
      //             recommenderObject.ID = property.userID;      
      //             recommenderObject.propertyArea = property.address.area;
      //             recommenderObject.propertyCity = property.address.city;
      //             recommenderObject.propertyState = property.address.state;
      //             recommenderObject.propertyCountry = property.address.country;
            
      //             modelUser.find({'_id':recommenderObject.ID},function(err,dbuser){
                  
                        
      //                   //console.log(dbuser);
      //                   recommenderObject.rating = dbuser[0]['rating'];
      //                   recommenderObject.name = dbuser[0]['name']; 
      //                  // console.log(dbuser);  
      //                    recommenderArray.push(recommenderObject);                             
      //             });
      //             // console.log(dbproperty[property].userID);
      //             console.log(recommenderArray);
      //             res.json(recommenderArray); 
      //       });
            
      // });

      //recommendedAgent(res);
     var area = 'Landhi';   

     modelProperty
      .find()                 
      .populate({path:'userID',})      
      .exec(function (err, property) {
            if (err) return res.json(err);
                  property.forEach(function(record){
                  var area = record.area;
                  //console.log(record['area']);
                  var agent = record.userID[0];                         
                  recommenderArray.push({ key:area,value:agent});
            });
           
           recommendedAgent(res,recommenderArray);
            
      });        
});

function recommendedAgent(res,Agents){
      res.json(Agents);            
}

module.exports = router;
