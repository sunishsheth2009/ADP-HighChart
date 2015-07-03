(function() {
  'use strict';

  angular
  .module('myApp')
  .directive('chartsDisplay', chartsDisplay);

  function chartsDisplay() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'views/directiveTemplates/chart.html',
      scope: true,
      link: linkFunc,
      controller: chartDirectiveController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function linkFunc(scope, element, attribute, controller) {
      controller.init(attribute.mectricid);
      scope.mectricId = attribute.mectricid;
    }
  }

  chartDirectiveController.$inject = ['$scope','highChartDataService'];

  function chartDirectiveController($scope, highChartDataService) {
    var vm = this;

    vm.init =  function(mectricId) {
      // var myEl = angular.element(document.querySelector( '#some-id' ));
      vm.mectricId = mectricId;
      vm.dataMTD = [];
      vm.dataQTD = [];
      vm.dataYTD = [];
      var urlMTD = 'js/json/'+vm.mectricId+'/timePeriod_MTD'+'.json';
      var urlQTD = 'js/json/'+vm.mectricId+'/timePeriod_QTD'+'.json';
      var urlYTD = 'js/json/'+vm.mectricId+'/timePeriod_YTD'+'.json';

      highChartDataService.getData(urlMTD)
      .then(function(response){
        vm.dataMTD = response;
      }).catch(function(error){
        console.log("Error!!");
      });

      highChartDataService.getData(urlQTD)
      .then(function(response){
        vm.dataQTD = response;
      }).catch(function(error){
        console.log("Error!!");
      });

      highChartDataService.getData(urlYTD)
      .then(function(response){
        vm.dataYTD = response;
      }).catch(function(error){
        console.log("Error!!");
      });

      $scope.$evalAsync(
        function( $scope ) {
          $scope.$watchGroup(['vm.dataYTD', 'vm.dataQTD', 'vm.dataMTD'], function(newValues, oldValues, scope) {
            vm.displayGraph(vm.dataMTD, vm.dataQTD, vm.dataYTD);
          });
        }
      );
    }

    vm.displayGraph =  function(dataMTD, dataQTD, dataYTD) {
      $('.container').each(function() {
        $(this).highcharts({
          chart: {
            type: 'pie'
          },

          credits: {
            text: 'ADP',
            href: 'http://www.adp.com'
          },

          title: {
            text: dataMTD.metricName
          },

          xAxis: {
            title: {
              enabled: true,
              text: dataMTD.xAxisSeriesLabel,
              style: {
                fontWeight: 'normal'
              }
            },
            categories: highChartDataService.convertAdapter(dataMTD.metricValues.rows, 2)
          },

          tooltip: {
            shared: true,
            useHTML: true,
            headerFormat: '<small>{point.key}</small><table>',
            pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td> <td style="text-align: right"><b>{point.y}</b></td></tr>',
            footerFormat: '</table>',
            valueDecimals: 2
          },

          yAxis: {
            title: {
              enabled: true,
              text: dataMTD.yaxisTitle,
              style: {
                fontWeight: 'normal'
              }
            }
          },

          plotOptions: {
            series: {
              animation: {
                duration: 2000,
                easing: 'easeOutBounce'
              }
            }
          },


          series: [{
            name: 'Things',
            colorByPoint: true,
            data: [{
              name: 'Animals',
              y: 5,
              drilldown: 'animals'
            }, {
              name: 'Fruits',
              y: 2,
              drilldown: 'fruits'
            }, {
              name: 'Cars',
              y: 4,
              drilldown: 'cars'
            }],
            type: 'column'
          }],
          drilldown: {
            series: [{
              id: 'animals',
              data: [
                ['Cats', 4],
                ['Dogs', 2],
                ['Cows', 1],
                ['Sheep', 2],
                ['Pigs', 1]
              ]
            }, {
              id: 'fruits',
              data: [
                ['Apples', 4],
                ['Oranges', 2]
              ]
            }, {
              id: 'cars',
              data: [
                ['Toyota', 4],
                ['Opel', 2],
                ['Volkswagen', 2]
              ]
            }]
          }

          // series: [
          //   {
          //     name: data.yaxisTitle,
          //     data: highChartDataService.convertAdapter(data.metricValues.rows, 3),
          //     type: data.chartTypeCodeValue.toLowerCase()
          //   },
          //   {
          //     name: data.metricValues.columns[4].columnName,
          //     data: highChartDataService.convertAdapter(data.metricValues.rows, 4),
          //     // type: data.chartTypeCodeValue.toLowerCase()
          //   }
          // ]
        });
      });
    }

  }
})();
