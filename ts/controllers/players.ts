import module = require("./module");

module.controller("players", ["$scope", "$ionicTabsDelegate", "$stateParams", "$timeout", "services", function($scope, $ionicTabsDelegate, $stateParams, $timeout, services) {
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
				var playersGrouped = Object.keys(groups).map(function(key) { return groups[key]; });
				playersGrouped.sort(function(g1, g2) {
					var i1 = contest.positions.indexOf(g1.position);
					var i2 = contest.positions.indexOf(g2.position);
					return i1 - i2;
				});
				$scope.playersGrouped = playersGrouped;
				$timeout(function() {
					if ($ionicTabsDelegate.selectedIndex() < 0) {
						$ionicTabsDelegate.select(0);
					}
				});
			}
		});
}]);
