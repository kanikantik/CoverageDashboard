(function (module) {
    "use strict";
    module.controller("AssociateController", AssociateController);
    AssociateController.$inject = ["$location"];
    function AssociateController($location) {
        var vm = this;
        vm.associate = "Angular in Action Associate is in progress";
    }


})(angular.module("capability"));