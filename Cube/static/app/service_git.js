
(function(){

	angular.module('gitbub.service_git')

	.factory('gitFactory', ['$http', '$q', function($http, $q){

		var gitFactory = {
			data: {},
			gitAPI: function(url){
				
				var deferred = $q.defer(),
					request = {
						method: 'GET',
						url: url
					};
				$http(request).then(function(data){
					console.log(data);
					deferred.resolve(data.data);
				},function(error){
					deferred.reject(error);
					obj.data.loading = false;
				});
				return deferred.promise;
			}
		};
		return gitFactory;
	}]);

})();