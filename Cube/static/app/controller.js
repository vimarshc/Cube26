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

    angular.module('gitbub.controllers', [])

    // home controller
    .controller("homeController", function($scope, $http, gitFactory, postcomment, DOMAIN, UTIL){

        var UTIL.diver = 86400000;
        //Difference between dates is converted to number of days by dividing by this number. 

        $scope.stats = {};
        //object for the stats pertaining to all the issues. 

        $scope.issues = [];
        //Array of objects where wach object contains the issue object and Array of comment objects. 

        $scope.meraform = {};
        //Object for the information for comments being posted by each user. 


        $scope.table = false;
        //bool object to ng-show the table and some other items. 

        var getData = function(){

            var re = /^(http[s]?:\/\/){0,1}([www]\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;


                //URL check
            if (re.test($scope.url) && $scope.url.indexOf('github.com') >-1 && $scope.url.split('github.com/')[1]){
                var projectname = $scope.url.split('github.com')[1];
                var gitapiURL = 'http://api.github.com/repos' + projectname + "/issues";
                //Converting project URL to github API URL


                // console.log(gitapiURL);


                //Factory to perform HTTP GET request to obtain array of Objects of Issues 
                gitFactory.gitAPI(gitapiURL)
                .then(function(data){
                    var repodetails = data[1];
                    //Array of Issue Objects

                    var now = new Date();
                    var temp;
                    var temp_str;
                    var days;


                    //Counters for Issue stats
                    var twofour = 0;
                    var week = 0;
                    var greater = 0;
                    var total = repodetails.length;
                    for(var i = 0; i < repodetails.length; i++){

                        temp_str = repodetails[i].created_at;
                        temp = new Date(temp_str);
                        days = (now - temp)/UTIL.diver;
                        var item = {};
                        item.issue = repodetails[i];
                        item.commentsArray = [];
                        //Array of Comment objects

                        var commentsurl = repodetails[i].comments_url;

                        if(days < 1){
                            twofour++;
                        }
                        else if(days > 1 && days < 7){
                            week++;
                        }
                        else if(days > 7){
                            greater++;
                        }


                        //HTTP request to obtain Array of Comment objects. 
                        //Each Issue has several comments associated to it. 
                        gitFactory.gitAPI(commentsurl)
                        .then(function(atad){
                            var comments = atad[1];
                            if(comments.length > 0){
                            
                                for(var j = 0; j < comments.length; j++){
                                    item.commentsArray.push(comments[j]);
                                    // console.log(comments[j].body);
                                }
                            }                            

                        }, function(err){
                            console.log("Error in comments URL");
                        });

                        $scope.issues.push(item);
                    }

                    $scope.table = true;

                    // console.log(total);
                    // console.log(twofour);
                    // console.log(week);
                    // console.log(greater);
                    // console.log($scope.issues);

                    $scope.stats.Total = total;
                    $scope.stats.Day = twofour;
                    $scope.stats.Week = week;
                    $scope.stats.MorethanWeek = greater;


                }, function(err){
                    alert('Error','Please enter a valid git url','error');
                });


            }
            else{
                alert("URL is not valid");
            }

        };


        $scope.enter = function(event){
            if(event.which == 13){
                // $scope.validation = true;
                getData();
            }
        };

        //Function to post comment on the page and perform an API call 
        //to store the comments in a backend DB via AJAX call. 
        $scope.postcomment = function(issue){
            //console.info($scope.meraform.personalcomment);
            var comment = {
                user:{
                    login: $scope.meraform.username,
                    avatar_url:'https://avatars.githubusercontent.com/u/14919965?v=3'
                },
                body: $scope.meraform.personalcomment,
                created_at: new Date(),
            };


            postcomment.comment(issue, comment);

            $scope.meraform.username = "";
            $scope.meraform.personalcomment = "";

            //console.log(issue);
            // issue.commentsArray.push(comment);
            //console.log(issue);



            // console.info('comment', comment);

            //Backend AJAX call to save comment
            // $http.post(DOMAIN.server, comment)
            // .success(function(data, status, headers, config){
            //     if (status===200){
            //         console.log("Saved in DB");
            //     }                    
            // })
            // .error(function(data, status, headers, config){
            //     console.log("Error in Saving");
            // }); 
        };
    })

;})();