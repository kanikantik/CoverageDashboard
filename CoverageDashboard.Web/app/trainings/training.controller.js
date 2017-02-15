(function (angular) {
    "use strict";

    angular.module("capability")
        .controller("TrainingController", TrainingController);

    TrainingController.$inject = ["$scope", "TrainingService"];

    function TrainingController($scope, TrainingService) {
        var vm = $scope;
        var trainingResponseCreateEndPoint = "training/create", trainingResponseGetAllEndPoint = "training";
        vm.addDetails = {};
        vm.addDetails.training = {};
        vm.addDetails.training.header = "Add student details";
        vm.addDetails.submitDetails = submitDetails;
        vm.trainings = [];
        getTrainings();

        function HandleSaveSuccess(result) {
            // ResetForm();
            vm.trainings = result.data;
            //return result.data;



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

        function getTrainings() {
            return TrainingService.GetTrainings(trainingResponseGetAllEndPoint)
               .then(HandleSaveSuccess, HandleSaveFailure);

        }

        function submitDetails() {

            return TrainingService.AddTrainings(trainingResponseCreateEndPoint, vm.addDetails.training)
                .then(HandleSaveSuccess, HandleSaveFailure);


        };
    }


})(angular);