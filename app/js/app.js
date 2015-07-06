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
          url: "/",
          templateUrl: "views/chart2.html"
        })
        .state('chart3', {
          url: "/",
          templateUrl: "views/chart3.html"
        })
        .state('chart4', {
          url: "/",
          templateUrl: "views/chart4.html"
        })
    });

})();
