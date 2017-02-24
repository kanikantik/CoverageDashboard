/*
 * angular base HTTP Verbs
 *
 
 */
(function (angular) {

    angular.module('capability').service('baseApiService', baseApiService);
    baseApiService.$inject = ['$http', '$q', '$location', 'APIConnectFactory'];

    function baseApiService($http, $q, $location, APIConnectFactory) {
        ////////////////////////////////////////////////////////
        var enableCache = false;
        var configGETHeader = function () { return { cache: enableCache, withCredentials: false }; };
        var configPOSTHeader = function () { return { cache: enableCache, withCredentials: false }; };
        var configPUTHeader = function () { return { cache: enableCache, withCredentials: true }; };
        var configDELETEHeader = function () { return { cache: enableCache, withCredentials: true }; };

        var baseService =
        {
            // "PUBLIC" functions go here 
            PostAction: PostAction,
            GetAction: GetAction,
            GetAllAction: GetAllAction,
            GetQueryAction: GetQueryAction,
            PutAction: PutAction,
            DeleteAction: DeleteAction
        };
        return baseService;


        ////////////////////////////////////////////////////////
        // Define The Private Methods

        ///////////////////////////////////////////////////////////////////////////////////
        // Callback Functions That Are Routed From The API Back To The Calling Object
        function APISuccess(result) {
            return result;
        }
        function APIFailure(result) {
            return $q.reject(result);
        }
        //////////////////////////////////////////////////////////////////////////////////

        //////////////////////////////////////////////////////////////////////////////////

        function GetAction(apiController, getId) {
            // Call Get With An ID To Get A Specific Record
            var defer = $http.get(APIConnectFactory.url(apiController + '/' + getId), configGETHeader()).then(APISuccess, APIFailure);
            // Return The API Promise To Resolve Later
            return defer;
        }
        function GetAllAction(apiController) {
            // Get All The Records Related To The Calling Controller Action
            var defer = $http.get(APIConnectFactory.url(apiController), configGETHeader()).then(APISuccess, APIFailure);
            // Return The API Promise To Resolve Later
            return defer;
        }
        function GetQueryAction(apiController, queryString) {
            // Get All The Records Related To The Calling Controller Action
            var defer = $http.get(APIConnectFactory.url(apiController + '/' + queryString), configGETHeader()).then(APISuccess, APIFailure);
            // Return The API Promise To Resolve Later
            return defer;
        }
        function PostAction(apiController, newObject) {
            // Call Get With An ID To Get A Specific Record
            var defer = $http.post(APIConnectFactory.url(apiController), newObject, configPOSTHeader()).then(APISuccess, APIFailure);
            // Return The API Promise To Resolve Later
            return defer;
        }
        function PutAction(apiController, updateId, updateObject) {
            // Call Get With An ID To Get A Specific Record
            var defer = $http.put(APIConnectFactory.url(apiController + '/' + updateId), updateObject, configPUTHeader()).then(APISuccess, APIFailure);

            // Return The API Promise To Resolve Later
            return defer;
        }
        function DeleteAction(apiController, deleteId) {
            // Call Get With An ID To Get A Specific Record
            var defer = $http.delete(APIConnectFactory.url(apiController + '/' + deleteId), configDELETEHeader()).then(APISuccess, APIFailure);
            // Return The API Promise To Resolve Later
            return defer;
        }

    };
})
(angular);