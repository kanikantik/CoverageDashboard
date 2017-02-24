(function (angular) {
    "use strict";

    angular.module("capability")
        .controller("AssociateController", AssociateController);

    AssociateController.$inject = ["$location"];

    function AssociateController($location) {
        var vm = this;


        vm.associate = "Angular in Action Associate is in progress";



    }


})(angular);