//bring our libraries in
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/comments');

//require each mongoose schema/model
require('./models/comments_model.js');
require('./models/photo_model.js');
require('./models/page_model.js');

//create express
var app = express();

//setup EJS
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//this is a call to an exported routine (using the Backbone.js system) 
//this becomes like another library, but we haven't sent it to npmjs
require('./comment_routes')(app);

//app.listen(80);
//don't forget, we need to use the C9 variables
app.listen(process.env.PORT, process.env.IP);