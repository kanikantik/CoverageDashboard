(function (angular) {
    "use strict";

    angular.module("capability")
        .controller("TrainingController", TrainingController);

    TrainingController.$inject = ["$scope", "TrainingService"];

    function TrainingController($scope, TrainingService) {
        var vm = $scope;
        var trainingResponseCreateEndPoint = "training/create", trainingResponseGetAllEndPoint="training";
        vm.addDetails = {};
        vm.addDetails.training = {};
        vm.addDetails.training.header = "Add student details";
        vm.addDetails.submitDetails = submitDetails;
        vm.trainings = [];
        getTrainings();

        function HandleSaveSuccess(result) {
           // ResetForm();
            var data=JSON.stringify(result.data);
            
            vm.trainings = data;
            //alert(JSON.stringify(vm.trainings));
            //return result;



        }
        function HandleSaveFailure(result) {
            alert("error" + result);
        }
       // alert(JSON.stringify(vm.trainings));
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
            //var a = vm.addDetails.training;
            // var b = TrainingService.AddTrainings(a);
            return TrainingService.AddTrainings(trainingResponseCreateEndPoint, vm.addDetails.training)
                .then(HandleSaveSuccess, HandleSaveFailure);


        };
    }


})(angular);