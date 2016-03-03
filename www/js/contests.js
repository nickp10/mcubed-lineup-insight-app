angular
	.module("myApp.controllers")
	.controller("contests", ["$scope", "$http", function($scope, $http) {
		$scope.contests = [{label: "main", id: "123"}, {label: "bob", id: "456"}];
		/*$http.get("http://mcubed.ddns.net/mCubedServices/LineupAggregator")
			.then(function(response) {
				$scope.contests = response.data;
			});*/
	}]);
