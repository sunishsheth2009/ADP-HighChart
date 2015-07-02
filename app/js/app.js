(function() {

  'use strict';
 angular
   .module('myApp', ['ui.router'])
   .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise("/");
      $stateProvider
        .state('index', {
          url: "",
          templateUrl: "views/index.html"
        })
        .state('description', {
          url: "/description",
          templateUrl: "views/description.html"
        })
    });

})();