(function (angular) {
    'use strict';

    angular.module('capability').controller('HomeController',
       ['$scope', function ($scope) {


           $scope.names = ['hi','hello','world'];
       }]);

})(angular);