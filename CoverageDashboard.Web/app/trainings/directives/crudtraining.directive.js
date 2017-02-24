/* crudtraining.directive.js */

/**
* @desc crudtraining directive that can be used to crud operations of training
* @example <crud-training action=""></crud-training>
*/
(function (angular) {
    "use strict";

    angular.module("capability")
        .directive("crudTraining", crudTraining);
    //crudTraining.$inject = ["$location", "homeService"];
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