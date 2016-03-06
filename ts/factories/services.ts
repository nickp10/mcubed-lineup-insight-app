import module = require("./module");

module.factory("services", ["$http", function($http) {
	var baseURL = "http://mCubed.ddns.net/mCubedServices/";
	var data: any = { };

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
