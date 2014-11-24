/*As usual, bring in mongoose and make a schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
//defining a photo document/collection
var studentSchema = new Schema({
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
    // User Since field
    usersince: { type: Date}
    //commentId: Schema.ObjectId
});

mongoose.model('Student', studentSchema);