//GitHub api is free to use
//No need of authentication
//reponds with JSON

var app = angular.module('app', []);

app.controller('MainController', function ($scope, github, $interval,
	$log, $anchorScroll, $location) {

	var onUserComplete = function (data) {
		$scope.user = data;
		//$http.get($scope.user.repos_url)
		github.getRepos($scope.user.repos_url)
			.then(onRepos, onError);
	};

	var onRepos = function (data) {
		$scope.repos = data;
		$log.info("Found data for " + $scope.username + " streaming data now");
		
		//set the fragment identifier # to the id of userDetails <div> 
		//then instantiate the anchorScroll service
		$location.hash("userDetails");
		$anchorScroll();
	};
	var onError = function (reason) {
		$scope.error = " Could n ot fetch the data";
	};

	var decrementCountDown = function () {
		$scope.countDown -= 1;
		if ($scope.countDown < 1) {
			$scope.search($scope.username);
		}
	};

	var countdownInterval = null;
	var startCountDown = function () {
		countdownInterval = $interval(decrementCountDown,
			1000, $scope.countDown);
	};

	$scope.search = function () {
		$log.info("Searching for " + $scope.username);
		//$http.get("https://api.github.com/users/" + $scope.username)
		github.getUser($scope.username)
			.then(onUserComplete, onError);
		if (countdownInterval) {
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