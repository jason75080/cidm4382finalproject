

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/comments');
require('./models/users_model.js');
require('./models/students_model.js');
require('./models/comments_model.js');
var CommentThread = mongoose.model('CommentThread');
var Reply = mongoose.model('Reply');
var Student = mongoose.model('Student');

function addStudent(title, filename) {
        Student.save(function() {
            console.log(title + " Saved.");
        });
}

CommentThread.remove().exec(function() {
    Student.remove().exec(function() {
            addStudent('Strength', 'arch.jpg');
            addStudent('Power', 'pyramid.jpg');
            addStudent('Beauty', 'flower.jpg');
            addStudent('Thoughtful', 'lake.jpg');
            addStudent('Summer Fun', 'volcano.jpg');
            addStudent('Sunsets', 'jump.jpg');
        });
});