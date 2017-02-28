(function (module) {
    "use strict";


    module.controller("SettingsController", SettingsController);

    SettingsController.$inject = ["$location"];

    function SettingsController($location) {
        var vm = this;
        vm.settings = "Angular in Action Settings is in progress";



    }


})(angular.module("capability"));