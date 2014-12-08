//this is like the using/import/include statement from other languages
//it just allows express to be "visible" within this file
var express = require('express');

//again we export the routing function anonymously
module.exports = function(app) {
    //here are our controllers - these have been created seperately
    //in order to handle the database/mongoose transactions
    var photos = require('./controllers/photos_controller');
    var comments = require('./controllers/comments_controller');
    var pages = require('./controllers/pages_controller');

    //statis routing
    app.use('/static', express.static('./static')).
    use('/images', express.static('./static/images')).
    use('/lib', express.static('../lib'));
    app.get('/', function(req, res) {
        //when the "index" is requested, the photos page is rendered
        //automatically
        res.render('photos');
    });
    //setup get routes
    app.get('/photos', photos.getPhotos);
    app.get('/photo', photos.getPhoto);
    app.get('/page', pages.getPage);
    app.get('/comments/get', comments.getComment);

    //setup post routes
    app.post('/comments/add', comments.addComment);
}