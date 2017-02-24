(function(angular) {
    //Need to delete  this file
    angular.module("capability").controller('TrainingController', ['$scope', function ($scope) {
        var vm = $scope;
        // $scope.students = StudentsJSON;
        vm.addDetails = {};
        vm.addDetails.training = {};
        //$scope.addDetails = {};
        $scope.editDetails = {};
        //vm.training = "Angular in Action training is in progress";
       // $scope.count = $scope.students.length - 1;
        $scope.editDetailsForm = false;
        $scope.editDetails.header = "Edit student details";
        vm.addDetails.training.header = "Add student details";

        $scope.removeFromList = function (i) {
            $scope.students.splice(i, 1);
        };

        $scope.editStudentDetails = function (student, index) {
            $scope.editDetailsForm = !$scope.editDetailsForm;
            if ($scope.editDetailsForm) {
                $scope.editDetails.fname = student.firstName;
                $scope.editDetails.lname = student.lastName;
                $scope.editDetails.std = student.standard;
                $scope.recordIndex = index;
            }
        };

        vm.addDetails.submitDetails = function () {
            var a = vm.addDetails.training;
            alert('hi' +JSON.stringify(a));
            //StudentsJSON.push({
            //    "firstName": $scope.addDetails.fname,
            //    "lastName": $scope.addDetails.lname,
            //    "id": $scope.students[$scope.count].id + 1,
            //    "standard": $scope.addDetails.std,
            //});
            vm.addForm = false;
            vm.addDetails.fname = null;
            vm.addDetails.lname = null;
            vm.addDetails.std = null;
        };

        $scope.editDetails.submitDetails = function () {
           // StudentsJSON[$scope.recordIndex].firstName = $scope.editDetails.fname;
           // StudentsJSON[$scope.recordIndex].lastName = $scope.editDetails.lname;
           // StudentsJSON[$scope.recordIndex].standard = $scope.editDetails.std;
            $scope.editDetailsForm = false;
            $scope.editDetails.fname = null;
            $scope.editDetails.lname = null;
            $scope.editDetails.std = null;
        };
    }]);


    angular.module("capability").factory('dataService', ['$http', function ($http) {
        return {
            getStudents: function () {
                return $http.get('students.json').then(function successCallback(response) {
                    return response.data;
                }, function errorCallback(response) {
                    return "Invalid data";
                });
            }
        };
    }]);


})(angular)


//(function (angular) {
//    "use strict";

//    angular.module("capability")
//        .controller("TrainingController", TrainingController);

//   // TrainingController.$inject = ["$location", "homeService"];

//    function TrainingController() {
//        var vm = this;
//        vm.addDetails = {};
//        vm.addDetails.header = "Add training details here";
//        // vm.totalCount = 25;
//        //vm.addDetails.submitDetails = submitDetails();
//        //vm.getCountFromService = homeService.GetCount(vm.totalCount);

//        vm.training = "Angular in Action training is in progress";
//        vm.addDetails.submitDetails = function () {
//            alert("Call submit called" + vm.addDetails.fname);
//            //StudentsJSON.push({
//            //    "firstName": $scope.addDetails.fname,
//            //    "lastName": $scope.addDetails.lname,
//            //    "id": $scope.students[$scope.count].id + 1,
//            //    "standard": $scope.addDetails.std,
//            //});
//            vm.addForm = false;
//            vm.addDetails.fname = null;
//            vm.addDetails.lname = null;
//            vm.addDetails.std = null;
//        };

//        //function getProjectCount() {
//        //    return 10;
//        //}

//        function submitDetails() {
//            alert("Call submit called" + vm.addDetails.fname);
//            //StudentsJSON.push({
//            //    "firstName": vm.addDetails.fname,
//            //    "lastName": vm.addDetails.lname,
//            //    "id": vm.students[$scope.count].id + 1,
//            //    "standard": vm.addDetails.std,
//            //});
//            vm.addForm = false;
//            vm.addDetails.fname = null;
//            vm.addDetails.lname = null;
//            vm.addDetails.std = null;
//        }


//    }

//})(angular);

