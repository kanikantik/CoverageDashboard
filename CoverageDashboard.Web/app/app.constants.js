
(function (angular) {
    'use strict';
    angular.module('capability').factory('capabilityConfig', ['$window', function ($window) {
        return {
            //'webApiUrl': angular.element($window.document.getElementsByTagName('base')[0]).attr('href'),
            'webApiUrl':"http://localhost:59962",
            'sessionTimeoutCheckMin': 5,
            'sessionTimeoutMin': 30
        };
    }]);
})(angular);
