(function (angular) {
    "use strict";

    angular.module("capability")
        .controller("HomeController", HomeController);

    HomeController.$inject = ["$location", "HomeService"];

    function HomeController($location, HomeService) {
        var vm = this;
        vm.totalCount = 25;
        vm.getProjectCount = getProjectCount;
        vm.getCountFromService = HomeService.GetCount(vm.totalCount);

        vm.names = ["hi", "hello", "world"];

        function getProjectCount() {
            return 10;
        }


    }

})(angular);