angular
	.module("myApp.controllers")
	.controller("playerList", ["$scope", "$stateParams", "services", function($scope, $stateParams, services) {
		$scope.players = [];
		services.getContests()
			.success(function(data) {
				var contest = data.find(function(c) { return c.ID === $stateParams.contestID; });
				if (contest) {
					$scope.players = contest.players.filter(function(p) { return p.position === $stateParams.position });
				}
			});
	}]);
