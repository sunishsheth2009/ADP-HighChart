(function() {
    'use strict';

    angular
        .module('module')
        .factory('factory', factory);

    factory.$inject = ['dependencies'];

    function factory(dependencies) {
        var service = {
            function: function
        };

        return service;

        function function() {

        }
    }
})();
