//Documentation Style: 

    /**
    * @name 
    * @desc 
    * @param {string} INFO
    * @returns {Promise}
    * @memberOf "Location"
    */

(function(){
//Angular factory to perform HTTP GET requests
	angular
	.module('gitbub.service_git', [])
	.factory('gitFactory', ['$http', '$q', gitFactory]);


    /**
    * @namespace: gitFactory
    * @returns {Factory}
    * @memberOf gitbub.service_git
    */

	function gitFactory($http, $q){

		var gitFactory = {
			data: {},
			gitAPI: gitAPI
		};
		return gitFactory;



		/**
    	* @name: gitAPI
    	* @desc: Performing http get request to get issues information for URL that is transformed from github project URL to 
    			 URL at which API is hit. 	
    	* @param {string} Transformed URL. Project URL -> API URL
    	* @returns {Promise}
    	* @memberOf gitbub.service_git.gitFactory
    	*/
		function gitAPI(url){
				// console.info('gitFactory', url);
			

			var request = $http({
				method: "get", 
				url: url,
				params: {
					action:"get"
				},
			});

			return (request.then(handleSuccess, handleError));
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



