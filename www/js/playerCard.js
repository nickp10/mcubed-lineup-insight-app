angular
	.module("myApp.controllers")
	.controller("playerCard", ["$scope", "$stateParams", "services", function($scope, $stateParams, services) {
		$scope.contestID = $stateParams.contestID;
		$scope.playerID = $stateParams.playerID;
		services.getPlayerCard($scope.contestID, $scope.playerID)
			.success(function(data) {
				$scope.playerCard = data;
			});
	}]);
