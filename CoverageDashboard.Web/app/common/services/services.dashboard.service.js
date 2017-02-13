(function (angular) {

    angular.module('capability').service('DashboardService',
        ['$http', '$q', '$location', 'baseApiService', function ($http, $q, $location, baseApiService) {

            function GetDashboardCount(data) {
                debugger;
                return baseApiService.sendGetQuery("GetDashboardCount", data);
            }

            function RefreshDashboard(data) {
                return baseApiService.sendPostQuery("RefreshDashboard", data);
            }

            function GetCount(data) {
                return "Count from Service " + data;

            }

            return {
                GetDashboardCount: GetDashboardCount,
                RefreshDashboard: RefreshDashboard,
                GetCount: GetCount
            };
        }]);
})
(angular);