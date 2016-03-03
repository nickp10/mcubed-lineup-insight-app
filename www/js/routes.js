angular
	.module("myApp.routes", ["ionic", "myApp.controllers"])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state("contests", {
				templateUrl: "pages/contests.html",
				url: "/",
				controller: "contests"
			})
			.state("players", {
				templateUrl: "pages/players.html",
				url: "/players/:contestId",
				controller: "players"
			});
		$urlRouterProvider.otherwise("/");
	});
