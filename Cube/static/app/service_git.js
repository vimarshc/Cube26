
(function(){

	angular.module('gitbub.service_git', [])
	//Angular factory to perform HTTP GET requests
	.factory('gitFactory', ['$http', '$q', function($http, $q){

		var gitFactory = {
			data: {},
			gitAPI: function(url){
				// console.info('gitFactory', url);
				var deferred = $q.defer();
				
				$http({method: "get", url: url})
				.then(function(response) {
			          // console.info(response.data);
			          deferred.resolve([response.status, response.data]);
			        }, function(response) {
			          // console.info(response.status);
			          deferred.resolve([response.status, response.data]);
			      });
				return deferred.promise;
			}
		};
		return gitFactory;
	}]);

})();