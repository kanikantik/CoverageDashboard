(function (angular) {

    function trainingService($http, $q, $location, baseApiService) {

        var service = {
            GetTrainings: GetTrainings,
            AddTrainings: AddTrainings

        };
        return service;

        ///////////////////////////////////////////////////////////////////////////////////
        // Callback Functions That Are Routed From The API Back To The Calling Object
        function HandleSaveSuccess(result) {
            return result;
        }
        function HandleSaveFailure(result) {
            return $q.reject(result);
        }
        //////////////////////////////////////////////////////////////////////////////////

        function GetTrainings(apiController) {
            return baseApiService.GetAllAction(apiController).then(HandleSaveSuccess, HandleSaveFailure);
        }


        function AddTrainings(apiController, data) {
            return baseApiService.PostAction(apiController, data).then(HandleSaveSuccess, HandleSaveFailure);

        }

    };
    angular.module("capability").service("trainingService", trainingService);
    trainingService.$inject = ["$http", "$q", "$location", "baseApiService"];
})
(angular);