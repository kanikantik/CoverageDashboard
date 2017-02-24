(function (angular) {
    "use strict";

    angular.module("capability")
        .controller("DashboardController", DashboardController);

    DashboardController.$inject = ["$location", "dashboardService"];

    function DashboardController($location, dashboardService) {
        var vm = this;


        vm.dashboard = "Angular in Action Dashboard is in progress";



    }


})(angular);