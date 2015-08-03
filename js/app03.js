var app = angular.module('app',[]);

app.controller('MainController',function($scope){
	var person = {
		firstName: "Scott",
		lastName: "Allen",
		imageSrc: "http://odetocode.com/images/scott_allen_2.jpg"
	};
	
	$scope.message="Hello Angular world";
	$scope.person = person;
})