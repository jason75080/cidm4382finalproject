//so we bring in mongoose here
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
//his defines the schema for the document/collection

//Jason worked on this


var UserSchema = new Schema({
    //the username field
    username: { type: String, index: 1, required: true, unique: true },
    // the password field
    hashed_password: String,
    // the firstname field
    firstname: { type: String, index: 1, required: true },
    // the last name field
    lastname: { type: String, index: 1, required: true },
    // phone
    phone: {type: String, index: 1, required: false},
    // the email field
    email: { type: String, index: 1, required: false}
});
//tell mongoose that this is going to be a collection/document called 'User'
mongoose.model('User', UserSchema);