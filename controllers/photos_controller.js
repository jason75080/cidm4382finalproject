var mongoose = require('mongoose'),
    Photo = mongoose.model('Photo');
    
//this is exported for external use - the routing code will call this
exports.getPhoto = function(req, res) {
    //using the Photo model, find the photo matching this id
    Photo.findOne({
            _id: req.query.photoId
        })
        .exec(function(err, photo) {
            if (!photo) {
                res.json(404, {
                    msg: 'Photo Not Found.'
                });
            }
            else {
                //send a json object in the response
                res.json(photo);
            }
        });
};
exports.getPhotos = function(req, res) {
    //this query finds all photos
    Photo.find()
        .exec(function(err, photos) {
            if (!photos) {
                res.json(404, {
                    msg: 'Photos Not Found.'
                });
            }
            else {
                //send back a collection of documents as a json object
                res.json(photos);
            }
        });
};