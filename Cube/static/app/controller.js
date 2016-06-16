/* All controllers go in this file 


I have performed three tests to check the authenticity of the given URL. Following that I have created the github API URL
via the username and project name. I have used a  service to perform the http request which gets all issues. I iterate through
all the issues and subtract it from the current time and then incremented different counters which represent the 
number of issues pertaining to each criterion. 

In each iteration I have performed a http request on the comments URL avilable in each issue to obtain all the comments. 

In the end I have an Array of objects, where each object comprises of the issue object and another array which contains all
the comment objects. Each comment object contains a user object which contains all the information pertainig to the user. 
*/

(function(){

    angular.module('gitbub.controllers', ['gitbub.directives'])

    // home controller
    .controller("homeController", function($scope){



        //Function to post comment on the page and perform an API call 
        //to store the comments in a backend DB via AJAX call. 
        $scope.postcomment = function(issue){
            //console.info($scope.meraform.personalcomment);
            var comment = {
                user:{
                    login: $scope.meraform.username
                },
                body: $scope.meraform.personalcomment,
                created_at: new Date(),
            };
            //console.log(issue);
            issue.commentsArray.push(comment);
            //console.log(issue);
            $scope.meraform.username = "";
            $scope.meraform.personalcomment = "";
            console.info('comment', comment);

            //Backend AJAX call to save comment
            $http.post(DOMAIN.server, comment)
            .success(function(data, status, headers, config){
                if (status===200){
                    console.log("Saved in DB");
                }                    
            })
            .error(function(data, status, headers, config){
                console.log("Error in Saving");
            });
        };
    })

;})();