angular
	.module("myApp.routes", ["ionic", "myApp.controllers"])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state("contests", {
				url: "/",
				templateUrl: "pages/contests.html",
				controller: "contests"
			})
			.state("playerCard", {
				url: "/player/:contestID/:playerID",
				templateUrl: "pages/playerCard.html",
				controller: "playerCard"
			})
			.state("players", {
				url: "/players/:contestID",
				templateUrl: "pages/players.html",
				controller: "players"
			})
			.state("players.list1", {
				url: "/list1/:position",
				views: {
					list1: {
						templateUrl: "pages/playerList.html",
						controller: "playerList"
					}
				}
			})
			.state("players.list2", {
				url: "/list2/:position",
				views: {
					list2: {
						templateUrl: "pages/playerList.html",
						controller: "playerList"
					}
				}
			})
			.state("players.list3", {
				url: "/list3/:position",
				views: {
					list3: {
						templateUrl: "pages/playerList.html",
						controller: "playerList"
					}
				}
			})
			.state("players.list4", {
				url: "/list4/:position",
				views: {
					list4: {
						templateUrl: "pages/playerList.html",
						controller: "playerList"
					}
				}
			})
			.state("players.list5", {
				url: "/list5/:position",
				views: {
					list5: {
						templateUrl: "pages/playerList.html",
						controller: "playerList"
					}
				}
			});
		$urlRouterProvider.otherwise("/");
	});
