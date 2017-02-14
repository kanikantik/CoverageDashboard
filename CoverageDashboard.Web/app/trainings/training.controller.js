(function (angular) {
    "use strict";

    angular.module("capability")
        .controller("TrainingController", TrainingController);

    TrainingController.$inject = ["$scope", "TrainingService"];

    function TrainingController($scope, TrainingService) {
        var vm = $scope;
        var trainingResponseCreateEndPoint = "training/create";
        vm.addDetails = {};
        vm.addDetails.training = {};
        vm.addDetails.training.header = "Add student details";
        vm.addDetails.submitDetails = submitDetails;

        function HandleSaveSuccess(result) {
            ResetForm();
            alert(JSON.stringify(result));

            return result;



        }
        function HandleSaveFailure(result) {
            alert("error" + result);
        }

        function ResetForm() {

            vm.addForm = false;
            vm.addDetails.fname = null;
            vm.addDetails.lname = null;
            vm.addDetails.std = null;
        }

        function submitDetails() {
            //var a = vm.addDetails.training;
            // var b = TrainingService.AddTrainings(a);
            return TrainingService.AddTrainings(trainingResponseCreateEndPoint, vm.addDetails.training)
                .then(HandleSaveSuccess, HandleSaveFailure);


        };
    }


})(angular);