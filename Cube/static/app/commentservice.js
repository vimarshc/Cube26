//Documentation Style: 

    /**
    * @name 
    * @desc 
    * @param {string} INFO
    * @returns {Promise}
    * @memberOf "Location"
    */


(function(){

	angular
	.module('gitbub.commentservice',[])
	.factory('postcomment', ['$http', 'DOMAIN', factory_comment]);

	/**
    * @namespace: factory_comment
    * @returns {Factory}
    * @memberOf gitbub.commentservice
    */

    function factory_comment($http, DOMAIN){
 
    	var factory_comment = {
    		comment: comment
    	};

    	return factory_comment;


    	/**
    	* @name: comment
    	* @desc: Performing http get request to get issues information for URL that is transformed from github project URL to 
    			 URL at which API is hit. 	
    	* @param {Object} Comment Object comprising of user object with username && comment body && created_at
    	* @param {Object} Issue Object that was fetched from github. The comment shall be added in the comment Array and saved in 
    					  the Django DB via AJAX call 
    	* @returns {Nothing}
    	* @memberOf gitbub.commentservice.factory_comment
    	*/

    	function comment (issue, comment){

    		issue.commentsArray.push(comment);

    		var request = $http({
    			method: 'post',
    			url: DOMAIN.server,
    			data: comment
    		});

    		return (request.then(handleSuccess, handleError));


    		// $http.post(DOMAIN.server, comment)
      //       .success(function(data, status, headers, config){
      //           if (status===200){
      //               console.log("Saved in DB");
      //           }                    
      //       })
      //       .error(function(data, status, headers, config){
      //           console.log("Error in Saving");
      //       });

    	}



    	//PRIVATE METHODS

    	/**
    	* @name: handleSuccess, handleError
    	* @desc: fucntions to handle promises from $http 	
    	* @param {Object} Response object from $http request
    	* @returns {Array} [Status and Data]
    	* @memberOf gitbub.service_git.gitFactory
    	*/

    	function handleSuccess(response){
			console.log(response);
			return [response.status, response.data];
		}

		function handleError (response) {
			return [response.status, response.data];
		}
    }



})();