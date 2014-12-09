/*As usual, bring in mongoose and make a schema */

// Jason, Secia, Mayra worked on this

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var eventComment = new Schema({
    subject: String,
    body: String
})
    
var studentEvent = new Schema({
    name: String,
    type: String,
    description: String,
    comments: [eventComment]
});
    
//defining a photo document/collection
var studentSchema = new Schema({
    // idNumber field
    idnumber: {type: String, index: 1, require: true},
    // firstname field
    firstname: { type: String, index: 1, required: true },
    // the last name field
    lastname: { type: String, index: 1, required: true },
    // phone
    phone: {type: String, index: 1, required: false},
    // the email field
    email: { type: String, index: 1, required: false},
    // the classification field
    classification: { type: String, index: 1, required: true }, // HS, JC, Freshman, Sophmore, Junior, Senior, Graduate
    //status
    status: { type: String, index: 1, required: true }, // Prospect, Current, Alumni
    //portfolio repository
    portfolio: {type: String, index: 1, required: false},
    //linkedin link
    linkedin: {type: String, index: 1, required: false},
    //events array
    events: [studentEvent]
});



mongoose.model('Student', studentSchema);
mongoose.model('StudentEvent', studentEvent);