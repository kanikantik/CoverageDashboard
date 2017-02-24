(function (angular) {

    angular.module('capability').service('dashboardService',
        ['$http', '$q', '$location', 'baseApiService', function ($http, $q, $location, baseApiService) {

            function GetCount(data) {
                return "Count from Service " + data;

            }

            return {
                GetCount: GetCount
            };
        }]);
})
(angular);