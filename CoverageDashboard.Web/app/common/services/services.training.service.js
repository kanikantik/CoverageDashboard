(function (angular) {

    angular.module("capability").service("TrainingService",
        ["$http", "$q", "$location", "baseApiService", function ($http, $q, $location, baseApiService) {


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

            function RefreshDashboard(data) {
                return baseApiService.sendPostQuery("RefreshDashboard", data);
            }

            function AddTrainings(apiController, data) {
                return baseApiService.PostAction(apiController, data).then(HandleSaveSuccess, HandleSaveFailure);

            }

            return {
                GetTrainings: GetTrainings,
                RefreshDashboard: RefreshDashboard,
                AddTrainings: AddTrainings
            };
        }]);
})
(angular);