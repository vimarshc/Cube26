/* web module is defined here */
/* Define all states here using angular-ui router */
/* Do not define any controllers/services/utilities here, all controllers/services/utilities must go in their specific modules */

(function(){
	
	angular.module('gitbub', [
		'ngCookies',
		'gitbub.controllers',
		'gitbub.service_git',
		'gitbub.commentservice',
		'ui.bootstrap',
	])

	// Changing interpolation start/end symbols.
	// .config(function($interpolateProvider, $httpProvider){
		
//      	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

 // 	})

 	.config(function ($httpProvider, $interpolateProvider) {
	  $httpProvider.defaults.headers.common = {};
	  //$httpProvider.defaults.headers.post = {};
	  $httpProvider.defaults.headers.put = {};
	  $httpProvider.defaults.headers.patch = {};
	  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
	  $interpolateProvider.startSymbol('[[').endSymbol(']]');
 
	})

	// CSRF token setting
	.run(function($http, $cookies){
		
		$http.defaults.headers.common['X-CSRFToken'] = $cookies['csrftoken'];
		$http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
	})


	// urls with constant SERVER are used, by default set to development urls
	// changed to production urls while ansible deployment

	// Add development/testing/staging server domains
	// do not modify these patterns
	// if modifying, also make corresponding changes in app_js_settings.sh in ops as well
	.constant("DOMAIN", {
		server: "http://localhost:8000/dbsave/",
	})

	.constant("GITHUB", {
		API: "https://api.github.com/repos/",
	})

	// All crm api urls go here
	// DO NOT hard code these urls anywhere in the project
	// .constant("API_URLS", {	 
	// 	dbsave: "dbsave/", 
	// })

;})();
