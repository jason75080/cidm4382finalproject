//we need to ensure that Mongoose is visible
//we also need to use each model
var mongoose = require('mongoose'),
    CommentThread = mongoose.model('CommentThread'),
    Reply = mongoose.model('Reply');
    
//this is exported for external use - the routing code will call this
exports.getComment = function(req, res) {
    CommentThread.findOne({
            _id: req.query.commentId
        })
        .exec(function(err, comment) {
            if (!comment) {
                res.json(404, {
                    msg: 'CommentThread Not Found.'
                });
            }
            else {
                res.json(comment);
            }
        });
};
//this is exported for external use - the routing code will call this
exports.addComment = function(req, res) {
    //this finds the document to add a comment to
    CommentThread.findOne({
            _id: req.body.rootCommentId
        })
        //remember that this is the query - exec
        .exec(function(err, commentThread) {
            if (!commentThread) {
                res.json(404, {
                    msg: 'CommentThread Not Found.'
                });
            }
            else {
                //we make a new Reply object - the object was defined
                //in the model
                var newComment = Reply(req.body.newComment);
                newComment.username = generateRandomUsername();
                addComment(req, res, commentThread, commentThread,
                    req.body.parentCommentId, newComment);
            }
        });
};

//this is an internal "private" function used to actually do the database
//work
function addComment(req, res, commentThread, currentComment,
    parentId, newComment) {
    if (commentThread.id == parentId) {
        commentThread.replies.push(newComment);
        updateCommentThread(req, res, commentThread);
    }
    else {
        //search for the correct place to add in the comment
        for (var i = 0; i < currentComment.replies.length; i++) {
            var c = currentComment.replies[i];
            if (c._id == parentId) {
                c.replies.push(newComment);
                var replyThread = commentThread.replies.toObject();
                updateCommentThread(req, res, commentThread);
                //this causes us to leave the loop
                break;
            }
            else {
                addComment(req, res, commentThread, c,
                    parentId, newComment);
            }
        }
    }
};

function updateCommentThread(req, res, commentThread) {
    CommentThread.update({
            _id: commentThread.id
        }, {
            $set: {
                replies: commentThread.replies
            }
        })
        .exec(function(err, savedComment) {
            if (err) {
                res.json(404, {
                    msg: 'Failed to update CommentThread.'
                });
            }
            else {
                res.json({
                    msg: "success"
                });
            }
        });
}

function generateRandomUsername() {
    //typically the username would come from an authenticated session
    //we can work on replacing this with REAL authentication from the previous
    //chapter
    var users = ['DaNae', 'Brad', 'Brendan', 'Caleb', 'Aedan', 'Taeg'];
    return users[Math.floor((Math.random() * 5))];
}