angular
	.module("myApp.controllers")
	.controller("contests", ["$location", "$scope", "services", function($location, $scope, services) {
		$scope.contests = [];
		services.getContests()
			.success(function(data) {
				$scope.contests = data;
			});

		$scope.showPlayers = function(contest) {
			$location.path("/players/" + contest.ID);
		};
	}]);
