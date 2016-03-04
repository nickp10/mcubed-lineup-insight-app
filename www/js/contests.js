angular
	.module("myApp.controllers")
	.controller("contests", ["$location", "$scope", "services", function($location, $scope, services) {
		$scope.contests = [];
		services.getContests()
			.success(function(data) {
				$scope.contests = data;
			});

		$scope.showPlayers = function(contest) {
			$location.path("/players/" + contest.ID + "/list1/" + contest.positions[0]);
		};
		$scope.formatTitle = function(contest) {
			var title = contest.sport + "&nbsp;" + contest.contestType;
			if (contest.label) {
				title += "&nbsp;" + contest.label.replace(/\-/g, "&#8209;");    
			}
			return title;
		}
	}]);
