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

  chartDirectiveController.$inject = ['$scope','highChartDataService', '$q'];

  function chartDirectiveController($scope, highChartDataService, $q) {
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
    }

    var fetchData = function(urlMTD, urlQTD, urlYTD){
      var data1 = highChartDataService.getData(urlMTD),
      data2 = highChartDataService.getData(urlQTD),
      data3 = highChartDataService.getData(urlYTD);
      $q.all([data1, data2,data3]).then(function(arrayOfResults) {
        vm.dataMTD = arrayOfResults[0];
        vm.dataQTD = arrayOfResults[1];
        vm.dataYTD = arrayOfResults[2];
        displayGraph(vm.elementResult, vm.dataMTD, vm.dataQTD, vm.dataYTD, vm.originalGraph, vm.drillDownGraph, vm.drillDownIdIndex, vm.drillDownValueIndex);
      });
    }

    var displayGraph =  function(elementResult, dataMTD, dataQTD, dataYTD, originalGraph, drillDownGraph, drillDownIdIndex, drillDownValueIndex) {
      $(elementResult).highcharts({
        chart: {
          type: drillDownGraph,
          zoomType: 'x',
          panning: true,
          panKey: 'shift'
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
              easing: 'easeOutBounce',
              shadow: true
            },
            cursor: 'pointer'
            // point: {
            //   events: {
            //     click: function () {
            //       drillUp();
            //     }
            //   }
            // }
          },
          pie: {
            showInLegend: true,
            allowPointSelect: true,
            slicedOffset: 20,
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
