// Loads the neccessary libraries, creates a connection to MongoDB, and
// starts the Express server. This is the main application.

// To run app:
// -run mongod in bash
// -run this file
// -then preview with web server

// all passwords will be: test
//this was imported by jason from the example code, some modifications were added by Jason, Secia, Mayra
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({session: expressSession});
var mongoose = require('mongoose');
require('./models/users_model.js');
require('./models/students_model.js');



var connString = "mongodb://" + process.env.IP + ":27017/";

console.log(connString + 'users');

var conn = mongoose.connect(connString + 'users');
var app = express();
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
  secret: 'SECRET',
  cookie: {maxAge: 60*60*1000},
  store: new mongoStore({
      db: mongoose.connection.db,
      collection: 'sessions'
    })
  }));
require('./routes')(app);
//app.listen(80);
//don't forget, we need to use the C9 variables
app.listen(process.env.PORT, process.env.IP);