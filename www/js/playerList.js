angular
	.module("myApp.controllers")
	.controller("playerList", ["$location", "$scope", "$stateParams", "services", function($location, $scope, $stateParams, services) {
		$scope.contestID = $stateParams.contestID;
		$scope.players = [];
		services.getContests()
			.success(function(data) {
				var contest = data.find(function(c) { return c.ID === $scope.contestID; });
				if (contest) {
					var players = contest.players.filter(function(p) { return p.position === $stateParams.position });
					players.sort(function(p1, p2) {
						return p2.salary - p1.salary;
					});
					$scope.players = players;
				}
			});

		$scope.showPlayerCard = function(player) {
			$location.path("/player/" + $scope.contestID + "/" + player.ID);
		};
		$scope.formatName = function(name) {
			return name.replace(" ", "&nbsp;").replace("-", "&#8209;");  
		};
		$scope.formatStartingDisplay = function(player) {
			return player.battingOrder === "NA" ? "S" : player.battingOrder;
		};
	}]);
