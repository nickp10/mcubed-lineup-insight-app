angular
	.module("myApp.controllers")
	.controller("players", ["$scope", "$ionicTabsDelegate", "$stateParams", "$timeout", "services", function($scope, $ionicTabsDelegate, $stateParams, $timeout, services) {
		$scope.contestID = $stateParams.contestID;
		$scope.playersGrouped = [];
		services.getContests()
			.success(function(data) {
				var contest = data.find(function(c) { return c.ID === $stateParams.contestID; });
				if (contest) {
					var groups = {};
					contest.players.forEach(function(player) {
						var group = groups[player.position];
						if (!group) {
							group = {
								position: player.position,
								players: []
							};
							groups[player.position] = group;
						}
						group.players.push(player);
					});
					$scope.playersGrouped = Object.keys(groups).map(function(key) { return groups[key]; });
					$timeout(function() { $ionicTabsDelegate.select(0); });
				}
			});
	}]);
