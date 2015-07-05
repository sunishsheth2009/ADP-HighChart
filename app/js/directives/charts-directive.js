(function() {
  'use strict';

  angular
  .module('myApp')
  .directive('chartsDisplay', chartsDisplay);

  function chartsDisplay() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'views/directiveTemplates/chart.html',
      scope: {},
      link: linkFunc,
      controller: chartDirectiveController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function linkFunc(scope, element, attribute, controller) {
      var elementResult = element[0].getElementsByClassName('container');
      controller.init(elementResult, attribute.mectricid, attribute.original, attribute.drilldownto, attribute.drilldownidindex, attribute.drilldownvalueindex);
    }
  }

  chartDirectiveController.$inject = ['$scope','highChartDataService'];

  function chartDirectiveController($scope, highChartDataService) {
    var vm = this;
    vm.dataMTD = [];
    vm.dataQTD = [];
    vm.dataYTD = [];

    vm.init =  function(elementResult, mectricId, originalGraph, drillDownGraph, drillDownIdIndex, drillDownValueIndex) {
      vm.elementResult = elementResult;
      vm.mectricId = mectricId;
      vm.originalGraph = originalGraph;
      vm.drillDownGraph = drillDownGraph;
      vm.drillDownIdIndex = drillDownIdIndex;
      vm.drillDownValueIndex = drillDownValueIndex;
      var urlMTD = 'js/json/'+vm.mectricId+'/timePeriod_MTD'+'.json';
      var urlQTD = 'js/json/'+vm.mectricId+'/timePeriod_QTD'+'.json';
      var urlYTD = 'js/json/'+vm.mectricId+'/timePeriod_YTD'+'.json';

      fetchData(urlMTD, urlQTD, urlYTD);
      callDisplayGraph();
    }

    var fetchData = function(urlMTD, urlQTD, urlYTD){
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
    }

    var callDisplayGraph = function(){
      $scope.$evalAsync(
        function( $scope ) {
          $scope.$watchGroup(['vm.dataMTD', 'vm.dataQTD', 'vm.dataYTD'], function(newValues, oldValues, scope) {
            displayGraph(vm.elementResult, vm.dataMTD, vm.dataQTD, vm.dataYTD, vm.originalGraph, vm.drillDownGraph, vm.drillDownIdIndex, vm.drillDownValueIndex);
          });
        }
      );
    }

    var displayGraph =  function(elementResult, dataMTD, dataQTD, dataYTD, originalGraph, drillDownGraph, drillDownIdIndex, drillDownValueIndex) {
      $(elementResult).highcharts({
        chart: {
          type: drillDownGraph
          // options3d: {
          //   enabled: true,
          //   alpha: 45,
          //   beta: 20
          // }
        },

        exporting: {
          enabled: true
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
            style: {
              fontWeight: 'normal'
            }
          },
          type: 'category'
        },

        tooltip: {
          shared: true,
          useHTML: true,
          headerFormat: '<small>{series.name}</small><table>',
          pointFormat: '<tr><td style="color: {point.color}">{point.name}: </td> <td style="text-align: right"><b>{point.y}</b></td></tr>',
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
          },
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            sliced: true,
            innerSize: 100,
            depth: 45
          }
        },


        series: [{
          name: dataMTD.metricValues.columns[0].columnName,
          colorByPoint: true,
          data: [{
            name: 'Month',
            y: dataMTD.summary.bindings[0].value,
            drilldown: 'month'
          }, {
            name: 'Quarter',
            y: dataQTD.summary.bindings[0].value,
            drilldown: 'quarter'
          }, {
            name: 'Year',
            y: dataYTD.summary.bindings[0].value,
            drilldown: 'year'
          }],
          type: originalGraph
        }],
        drilldown: {
          series: [{
            name: dataMTD.metricValues.columns[drillDownIdIndex].columnName,
            id: 'month',
            data: highChartDataService.convertAdapter(dataMTD.metricValues.rows, drillDownIdIndex, drillDownValueIndex)
          }, {
            name: dataMTD.metricValues.columns[drillDownIdIndex].columnName,
            id: 'quarter',
            data: highChartDataService.convertAdapter(dataQTD.metricValues.rows, drillDownIdIndex, drillDownValueIndex)
          }, {
            name: dataMTD.metricValues.columns[drillDownIdIndex].columnName,
            id: 'year',
            data: highChartDataService.convertAdapter(dataYTD.metricValues.rows, drillDownIdIndex, drillDownValueIndex)
          }]
        }
      },function(chart){
      });
    }

  }
})();
