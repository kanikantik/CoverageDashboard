(function (module) {
    "use strict";

    
    module.controller("HomeController", HomeController);

    HomeController.$inject = ["$location", "homeService"];

    function HomeController($location, homeService) {
        var vm = this;
        vm.totalCount = 25;
        vm.getProjectCount = getProjectCount;
        vm.getCountFromService = homeService.GetCount(vm.totalCount);

        vm.names = ["hi", "hello", "world"];

        function getProjectCount() {
            return 10;
        }


    }

})(angular.module("capability"));