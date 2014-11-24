var mongoose = require('mongoose'),
    studentlist = mongoose.model('studentlist');
    
//this is exported for external use - the routing code will call this
exports.getStudent = function(req, res) {
    //using the Photo model, find the photo matching this id
    studentlist.findOne({
            _id: req.query.studentId
        })
        .exec(function(err, student) {
            if (!student) {
                res.json(404, {
                    msg: 'List of Students Not Found.'
                });
            }
            else {
                //send a json object in the response
                res.json(student);
            }
        });
};
exports.getStudents = function(req, res) {
    //this query finds all photos
    studentlist.find()
        .exec(function(err, students) {
            if (!students) {
                res.json(404, {
                    msg: 'List of Students Not Found.'
                });
            }
            else {
                //send back a collection of documents as a json object
                res.json(students);
            }
        });
};