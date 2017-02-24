(function (angular) {
    "use strict";

    angular.module("capability")
        .controller("DashboardController", DashboardController);

    DashboardController.$inject = ["$location", "DashboardService"];

    function DashboardController($location, DashboardService) {
        var vm = this;


        vm.dashboard = "Angular in Action Dashboard is in progress";



    }


})(angular);