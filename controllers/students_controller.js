var mongoose = require('mongoose');
var Student = mongoose.model('Student');
 
 //Jason, Mayra,& Secia all worked on this   
 
 
//this is exported for external use - the routing code will call thisdate
exports.getStudent = function(req, res) {
    //using the student model find student
    
    var uid = req.param("idnumber");
    
    console.log(uid);

    Student.findOne({
            idnumber: uid
        })
        .exec(function(err, student) {
            if (!student) {
                res.json(404, {
                    msg: 'Student Not Found.'
                });
            }
            else {
                //send a json object in the response
                res.json(student);
            }
        });
};

exports.getStudents = function(req, res) {
    
    //this query finds all students
    Student.find()
        .exec(function(err, students) {
            if(err)
            {
                alert(err);
            }
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