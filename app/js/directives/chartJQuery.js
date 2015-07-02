(function() {
    'use strict';

    angular
        .module('module')
        .directive('directive', directive);

    function directive() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'templateUrl',
            scope: {
            },
            link: linkFunc,
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {

        }
    }

    Controller.$inject = ['dependencies'];

    function Controller(dependencies) {
        var vm = this;

        activate();

        function activate() {

        }
    }
})();
