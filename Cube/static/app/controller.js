/* All controllers go in this file */
/* Keep controllers as slim as possible */
/* Separate out as much as possible and include make services out of them. */ 
/* Naming convention for controllers: 'nameController'. A standard convention will make it easier to search for required controllers. */

(function(){

    angular.module('gitbub.controllers', [])

    // home controller
    .controller("homeController", function($scope, $http){

        var getData = function(){

            var re = /^(http[s]?:\/\/){0,1}([www]\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;

            if (re.test($scope.url) && $scope.url.indexOf('github.com') >-1 && $scope.url.split('github.com/')[1]){
                $scope.validation = true;
                var projectname = $scope.url.split('github.com')[1];
                var gitapiURL = 'http://api.github.com/repos' + projectname + '/issues';
                console.log(gitapiURL);

                // gitFactory.gitAPI()


            }
            else{
                alert("URL is not a valid bobo");
            }

        };


        $scope.enter = function(event){
            if(event.which == 13){
                // $scope.validation = true;
                getData();
            }
        };
    })

;})();