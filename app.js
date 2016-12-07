var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var property = require('./routes/Property');
var propAdd = require('./routes/PropertyAddress');
var Utility = require('./routes/Utility');
var UtilityProp = require('./routes/UtilityProperty');
//var Sold = require('./routes/Sold');
var Rating = require('./routes/Rating');
var recommender = require('./routes/agentrecommender');
var register = require('./routes/register');
var login = require('./routes/login');
var propertyDetail = require('./routes/propertyDetail');
var sendemail = require('./routes/sendemail');
<<<<<<< HEAD
var testingRoute = require('./routes/testingroute');
var ratingDialog = require('./routes/ratingdailog');
var uploadImage = require('./routes/uploadImage');
var adminDashboard = require('./routes/adminDash');
var adminInbox = require('./routes/admin_Inbox');
var propertystate = require('./routes/propertyStatus');
=======
var testingRoute = require('./routes/testasync');
>>>>>>> 3db6ed06e77c9d04546db647285474b6bb8d558e


var app = express();

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/realestate')
.then(()=> console.log('connection successful'))
.catch((err)=>console.error(err));

app.set('superSecret', 'realscenerio')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/property', property);
app.use('/propertyaddress', propAdd);
app.use('/utility', Utility);
app.use('/utilityproperty', UtilityProp);
app.use('/rating', Rating);
app.use('/recommender', recommender);
app.use('/register', register);
app.use('/login',login);
app.use('/property-detail',propertyDetail);
app.use('/sendemail',sendemail);
app.use('/testing',testingRoute);
<<<<<<< HEAD
app.use('/ratingdialog',ratingDialog);
app.use('/uploadImage',uploadImage);
app.use('/adminDash',adminDashboard);
app.use('/adminInbox',adminInbox);
app.use('/propertyStatus',propertystate);

=======
>>>>>>> 3db6ed06e77c9d04546db647285474b6bb8d558e
 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
