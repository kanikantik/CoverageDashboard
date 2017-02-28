(function (module) {
    "use strict";

   
    module.controller("ExportController", ExportController);

    ExportController.$inject = ["$location"];

    function ExportController($location) {
        var vm = this;
        vm.export = "Angular in Action Export tp pdf or excel is in progress";



    }


})( angular.module("capability"));