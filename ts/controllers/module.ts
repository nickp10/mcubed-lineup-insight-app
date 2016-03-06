/// <amd-dependency path="../factories/index" />
/// <reference path="../lib/angular.d.ts" />

import ng = require("angular");

export = ng.module("myApp.controllers", ["ionic", "myApp.factories"]);
