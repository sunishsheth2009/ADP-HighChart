(function() {

  'use strict';
 angular
   .module('myApp', ['ui.router'])
   .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise("/");
      $stateProvider
        .state('chart1', {
          url: "/",
          templateUrl: "views/chart1.html"
        })
        .state('chart2', {
          url: "",
          templateUrl: "views/chart2.html"
        })
    });

})();
