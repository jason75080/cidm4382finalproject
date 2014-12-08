/* We've buried the AngularJS controller/module down in the static area of the
   site.  We use the http middleware to handle a get to the user profile.
   This was set up in the routes.js Express module.
*/
var finalapp = angular.module('myApp', []);
    //sets up the controller on this module
    finalapp.controller('myController', ['$scope', '$http',
        function($scope, $http) {
            $http.get('/user/profile')
            .success(function(data, status, headers, config) {
                $scope.user = data;
                $scope.error = "";
            }).
            error(function(data, status, headers, config) {
                $scope.user = {};
                $scope.error = data;
            });
        }
]);

    
finalapp.controller('otherController', ['$scope', '$http',
    function($scope, $http) {
        
        $http.get('/students/list')
        .success(function(data, status, headers, config) {
            $scope.students = data;
            $scope.error = "";
        }).
        error(function(data, status, headers, config) {
            $scope.user = {};
            $scope.error = data;
        });
        
        $http.get('/student/firstname')
        
        .success(function(data, status, headers, config) {
            $scope.students = data;
            $scope.error = "";
        }).
        error(function(data, status, headers, config) {
            $scope.user = {};
            $scope.error = data;
        });
    }
    
]);

function CommentObj($http) {
    this.getComment = function(commentId, callback) {
        $http.get('/comments/get', {
                params: {
                    commentId: commentId
                }
            })
            .success(function(data, status, headers, config) {
                callback(null, data);
            })
            .error(function(data, status, headers, config) {
                callback(data, {});
            });
    };
    this.addComment = function(rootCommentId, parentId,
        newComment, callback) {
        $http.post('/comments/add', {
                rootCommentId: rootCommentId,
                parentCommentId: parentId,
                newComment: newComment
            })
            .success(function(data, status, headers, config) {
                callback(null, data);
            })
            .error(function(data, status, headers, config) {});
    };
}

//here is where the above object is used as a service
finalapp.service('commentSrv', ['$http', CommentObj]);

//create the photo controller
finalapp.controller('photoController', ['$scope', '$http', 'commentSrv',
    function($scope, $http, commentSrv) {
        $http.get('/photos')
            .success(function(data, status, headers, config) {
                $scope.photos = data;
                $scope.photo = $scope.photos[0];
                $scope.loadComments();
            })
            .error(function(data, status, headers, config) {
                $scope.photos = [];
            });
        $scope.loadComments = function() {
            commentSrv.getComment($scope.photo.commentId,
                function(err, comment) {
                    if (err) {
                        $srope.commentThread = {};
                    }
                    else {
                        $scope.commentThread = comment;
                    }
                });
        };
        $scope.addReply = function(parentCommentId, subject, body) {
            var newComment = {
                subject: subject,
                body: body
            };
            commentSrv.addComment($scope.commentThread._id,
                parentCommentId,
                newComment,
                function(err, comment) {
                    $scope.loadComments();
                });
        };
        $scope.setPhoto = function(photoId) {
            $http.get('/photo', {
                    params: {
                        photoId: photoId
                    }
                })
                .success(function(data, status, headers, config) {
                    $scope.photo = data;
                    $scope.loadComments();
                })
                .error(function(data, status, headers, config) {
                    $scope.photo = {};
                });
        };
    }
]);

//create the page controller
finalapp.controller('pageController', ['$scope', '$http', 'commentSrv',
    function($scope, $http, commentSrv) {
        $http.get('/page', {
                params: {
                    pageName: "Photos Page"
                }
            })
            .success(function(data, status, headers, config) {
                $scope.page = data;
                $scope.loadComments();
            })
            .error(function(data, status, headers, config) {
                $scope.Page = {};
            });
        $scope.addReply = function(parentCommentId, subject, body) {
            var newComment = {
                subject: subject,
                body: body
            };
            commentSrv.addComment($scope.commentThread._id,
                parentCommentId,
                newComment,
                function(err, comment) {
                    $scope.loadComments();
                });
        };
        $scope.loadComments = function() {
            commentSrv.getComment($scope.page.commentId,
                function(err, comment) {
                    if (err) {
                        $scope.commentThread = {};
                    }
                    else {
                        $scope.commentThread = comment;
                    }
                });
        };
    }
]);
