//GitHub api is free to use
//No need of authentication
//reponds with JSON

var app = angular.module('app',[]);

app.controller('MainController',function($scope, $http){

	var onUserComplete = function(response){
		$scope.user = response.data;
	};
	
	var onError = function(reason){
		$scope.error = " Could not fetch the user";
	};

	$http.get("https://api.github.com/users/shibut12")
	.then(onUserComplete, onError);
})