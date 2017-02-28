(function (module) {
    "use strict";

    module.controller("DashboardController", DashboardController);

    DashboardController.$inject = ["$location", "dashboardService"];

    function DashboardController($location, dashboardService) {
        var vm = this;


        vm.dashboard = "Angular in Action Dashboard is in progress";



    }


})(angular.module("capability"));