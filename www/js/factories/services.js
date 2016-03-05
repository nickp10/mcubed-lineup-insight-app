define(['./module'], function (factories) {
	factories.factory("services", ["$http", function($http) {
		var baseURL = "http://mCubed.ddns.net/mCubedServices/";
		var data = { };

		return {
			getContests: function() {
				if (!data.contests) {
					data.contests = $http.get(baseURL + "LineupAggregator");
				}
				return data.contests;
			},
			getPlayerCard: function(contestID, playerID) {
				return $http.get(baseURL + "LineupAggregator/" + contestID + "/" + playerID)
			}
		};
	}]);
});
