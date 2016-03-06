/// <amd-dependency path="./controllers/index" />
/// <amd-dependency path="./factories/index" />
/// <reference path="./lib/angular.d.ts" />
/// <reference path="./lib/cordova.d.ts" />
/// <reference path="./lib/cordova-statusbar.d.ts" />
/// <reference path="./lib/ionic.d.ts" />

import ng = require("angular");

export = ng
	.module("myApp", ["ionic", "myApp.controllers", "myApp.factories"])
	.run(($ionicPlatform: ionic.platform.IonicPlatformService) => {
		$ionicPlatform.ready(() => {
			var cordova = window.cordova;
			if (cordova && cordova.plugins.Keyboard) {
				// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

				// Don't remove this line unless you know what you are doing. It stops the viewport from snapping when text inputs
				// are focused. Ionic handles this internally for a much nicer keyboard experience.
				cordova.plugins.Keyboard.disableScroll(true);
			}
			var statusBar = window.StatusBar;
			if (statusBar) {
				statusBar.styleDefault();
			}
		});
	});
