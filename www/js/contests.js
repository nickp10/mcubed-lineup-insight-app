angular
	.module("myApp.controllers")
	.controller("contests", ["$scope", "services", function($scope, services) {
		$scope.contests = [];
		services.getContests()
			.success(function(data) {
				$scope.contests = data;
			});
	}]);
