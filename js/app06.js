//GitHub api is free to use
//No need of authentication
//reponds with JSON

var app = angular.module('app',[]);

app.controller('MainController',function($scope, $http){

	var onUserComplete = function(response){
		$scope.user = response.data;
		$http.get($scope.user.repos_url)
		.then(onRepos, onError);
	};
	
	var onRepos = function(response){
		$scope.repos = response.data;
	};
	var onError = function(reason){
		$scope.error = " Could not fetch the data";
	};
	
	$scope.search = function(){
		$http.get("https://api.github.com/users/" + $scope.username)
		.then(onUserComplete, onError);
	};
	
	$scope.username = "Angular";
	$scope.message = "GitHub Viewer";
	$scope.repoSortOrder = "-stargazers_count"
})