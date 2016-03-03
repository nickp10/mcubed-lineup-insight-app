angular
	.module("myApp.controllers")
	.controller("playerList", ["$scope", "$stateParams", "services", function($scope, $stateParams, services) {
		$scope.players = [];
		services.getContests()
			.success(function(data) {
				var contest = data.find(function(c) { return c.ID === $stateParams.contestID; });
				if (contest) {
					var players = contest.players.filter(function(p) { return p.position === $stateParams.position });
					players.sort(function(p1, p2) {
						return p2.salary - p1.salary;
					});
					$scope.players = players;
				}
			});
	}]);
