(function() {
    'use strict';
    angular
        .module('myApp')
        .controller('DashBoardController', DashBoardController);

    DashBoardController.$inject = ['highChartDataService']
    function DashBoardController(highChartDataService) {
        this.name = "Lets display some graphs";
     }

 })();
