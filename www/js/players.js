angular
	.module("myApp.controllers")
	.controller("players", ["$scope", "$http", "$stateParams", function($scope, $http, $stateParams) {
		$scope.players = [{name: "Westbrook" + $stateParams.contestId}];
	}]);
