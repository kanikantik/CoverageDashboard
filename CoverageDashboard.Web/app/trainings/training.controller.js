(function (angular) {
    "use strict";

    angular.module("capability")
        .controller("TrainingController", TrainingController);

    TrainingController.$inject = ["$scope", "trainingService"];

    function TrainingController($scope, trainingService) {
        var vm = $scope;
        var trainingResponseCreateEndPoint = "training", trainingResponseGetAllEndPoint = "training";
        vm.addDetails = {};
        vm.addDetails.training = {};
        vm.addDetails.training.header = "Add training details";
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
            return trainingService.GetTrainings(trainingResponseGetAllEndPoint)
               .then(HandleSaveSuccess, HandleSaveFailure);

        }

        function submitDetails() {

            return trainingService.AddTrainings(trainingResponseCreateEndPoint, vm.addDetails.training)
                .then(HandleSaveSuccess, HandleSaveFailure);


        };
    }


})(angular);