
(function(){

    var app = angular.module('gitbub.directives', ['gitbub.service_git']);

    app.directive('githubUrl', function() {
        return {
            templateUrl: 'static/app/githubUrl-parser.html',
            scope:{},
            replace:'True',
            controller:['$scope','gitFactory', function($scope,gitFactory){
                var diver = 86400000;
                $scope.var = diver;
                $scope.stats = {};
                $scope.issues = [];
                $scope.table = false;

                var getData = function(){

                    var re = /^(http[s]?:\/\/){0,1}([www]\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;


                    //URL check
                    if (re.test($scope.url) && $scope.url.indexOf('github.com') >-1 && $scope.url.split('github.com/')[1]){
                        var projectname = $scope.url.split('github.com')[1];
                        var gitapiURL = 'http://api.github.com/repos' + projectname + "/issues";
                        //Converting project URL to github API URL

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
                                days = (now - temp)/diver;
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

                            console.log($scope.issues)


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

        
            }],
        };
    });

    app.directive('issues', [function () {
        return {
            templateUrl: 'static/app/issues.html',   
            scope:{
                issues:'=data'
            },
            replace:'True'
        };
    }])


})();