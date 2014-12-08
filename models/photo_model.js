/*As usual, bring in mongoose and make a schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
//defining a photo document/collection
var PhotoSchema = new Schema({
    title: String,
    filename: String,
    timestamp: {
        type: Date,
        default: Date.now
    },
    commentId: Schema.ObjectId
});
mongoose.model('Photo', PhotoSchema);