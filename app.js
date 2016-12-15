// Packages die we gebruiken

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Database intialiseren + Configureren van passport

var mongoose = require('mongoose');
var passport = require('passport');

require('./models/landen');
require('./models/quiz');
require('./models/user');

require('./config/passport');

mongoose.connect('mongodb://localhost/quizapp', function() {
  console.log('Mongoose connected. DB connection open');
});


// Routes configureren die REST routes voorstellen


var routes = require('./routes/index');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);

// Serveren van static HTML en geen view templates
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.static(__dirname + '/public'));

// Initialiseren van passport

app.use(passport.initialize());

// catch 404 and forward to error handler
/* app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
}); */

module.exports = app;
