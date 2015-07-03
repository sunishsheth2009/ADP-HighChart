(function() {
  'use strict';

  angular
  .module('myApp')
  .factory('highChartDataService', highChartDataService);

  highChartDataService.$inject = ['$http', '$q'];

  function highChartDataService($http, $q) {
    var service = {
      getData: getData,
      convertAdapter: convertAdapter
    };

    return service;

    function getData(url) {
      // var settings = {
      //   "async": true,
      //   "url": "http://51.16.66.147:9084/adpi/data-services/metrics/50/large?timePeriod=Current_MTD",
      //   "method": "GET",
      //   "headers": {
      //     "orgoid": "05NSVSS5ZNR00F6N",
      //     "accept": "application/json",
      //     "Access-Control-Allow-Origin": '*',
      //     "rolecode": "Manager",
      //     "associateoid": "G3CRD5MV1KJV3NMT"
      //   }
      // };
      // $.ajax(settings).done(function (response) {
      //   console.log(response);
      // });
      var myDataDeferred;
      if(myDataDeferred) {
        return myDataDeferred.promise;
      }
      myDataDeferred = $q.defer();
      $http.get(url)
      .success(function(data){
        myDataDeferred.resolve(data);
      })
      .error(function(error){
        myDataDeferred.reject(error);
      });
      return myDataDeferred.promise;
    }

    function convertAdapter(objectArray, fieldNumber){
      var returnValue = [];
      for(var i=0; i<objectArray.length; i++){
        returnValue.push(objectArray[i][fieldNumber]);
      }
      return returnValue;
    }
  }
})();
