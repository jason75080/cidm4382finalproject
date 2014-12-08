/*  The idea of comments is to nest one type of document - a comment - within
    another document - a page.  This leaves us with two choices:
    Faced with two choices:
    - store the comments within a single document
    - store comments as seperate documents
    
    This mongoose model takes the approach where a CommentThread document
    keeps track of Reply documents.  Notice that we have an array of 
    ReplySchema in each document type.  This means that comments can be
    nested.
    
    As you consider this example for your own work, you won't have to nest
    as this example does.
*/
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ReplySchema = new Schema({
    username: String,
    subject: String,
    timestamp: {
        type: Date,
        default: Date.now
    },
    body: String,
    replies: [ReplySchema]
}, {
    _id: true
});
var CommentThreadSchema = new Schema({
    title: String,
    replies: [ReplySchema]
});
//create both models in mongoose
mongoose.model('Reply', ReplySchema);
mongoose.model('CommentThread', CommentThreadSchema);