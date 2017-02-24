(function (angular) {
    "use strict";

    angular.module("capability")
        .controller("SettingsController", SettingsController);

    SettingsController.$inject = ["$location"];

    function SettingsController($location) {
        var vm = this;
        vm.settings = "Angular in Action Settings is in progress";



    }


})(angular);