(function (angular) {
    "use strict";

    angular.module("capability")
        .directive("crudTraining", crudTraining);
    //CrudTraining.$inject = ["$location", "HomeService"];
    function crudTraining() {
        var directive = {
            restrict: "EA",
            scope: {
                action: "="
            },
            templateUrl: "app/trainings/directives/crud-training.html"
        };
        return directive;


    }

})(angular);