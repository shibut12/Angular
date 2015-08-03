//GitHub api is free to use
//No need of authentication
//reponds with JSON

var app = angular.module('app',[]);

app.controller('MainController',function($scope, $http, $interval, $log){

	var onUserComplete = function(response){
		$scope.user = response.data;
		$http.get($scope.user.repos_url)
		.then(onRepos, onError);
	};
	
	var onRepos = function(response){
		$scope.repos = response.data;
		$log.info("Found data for " + $scope.username + " streaming data now");
	};
	var onError = function(reason){
		$scope.error = " Could not fetch the data";
	};
	
	var decrementCountDown = function(){
		$scope.countDown -= 1;
		if($scope.countDown < 1){
			$scope.search($scope.username);
		}
	};
	
	var countdownInterval = null;
	var startCountDown = function(){
		countdownInterval = $interval(decrementCountDown,
			 1000, $scope.countDown);
	};
	
	$scope.search = function(){
		$log.info("Searching for " + $scope.username);
		$http.get("https://api.github.com/users/" + $scope.username)
		.then(onUserComplete, onError);
		if(countdownInterval){
			$interval.cancel(countdownInterval);
			$scope.countDown = null;
		}
	};
	
	$scope.username = "Angular";
	$scope.message = "GitHub Viewer";
	$scope.repoSortOrder = "-stargazers_count"
	$scope.countDown = 5;
	startCountDown();
})