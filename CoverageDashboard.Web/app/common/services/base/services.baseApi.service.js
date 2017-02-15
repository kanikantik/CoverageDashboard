/*
 * angular base HTTP Verbs
 *
 
 */

(function (angular) {

    angular.module('capability').service('baseApiService',
        ['$http', '$q', '$location', 'APIConnectFactory', function ($http, $q, $location, APIConnectFactory) {

            ////////////////////////////////////////////////////////
            var enableCache = false;
            var configGETHeader = function () { return { cache: enableCache, withCredentials: false }; };
            var configPOSTHeader = function () { return { cache: enableCache, withCredentials: false }; };
            var configPUTHeader = function () { return { cache: enableCache, withCredentials: true }; };
            var configDELETEHeader = function () { return { cache: enableCache, withCredentials: true }; };

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


            //////////////////////start need to delete////////////////////////////////////////////////////////////
            var _baseUrl = 'api';
            var _pathSeparator = '/';
            var _resource = 'Capability';

            function _buildUrl(action) {
                debugger;
                var loc = $location.absUrl();
                var location = $location.absUrl().split('#')[0].replace(/\/$/, '');
                var url = [location, _baseUrl, _resource, action].join(_pathSeparator);

                return url;
            }

            function sendGetQuery(action, data) {
                return $http({ method: 'GET', url: _buildUrl(action), data: data }).
                     success(function (data) {
                         return data;
                     });
            }

            function sendPostQuery(action, data) {
                //debugger;
                var url = _buildUrl(action)

                debugger;
                return $http({ method: 'POST', url: _buildUrl(action), data: data }).
                    success(function (data) {
                        return data;
                    });
            }

            function sendPutQuery(action, data) {
                return $http({ method: 'PUT', url: this._buildUrl(action), data: data }).
                    success(function (data) {
                        return data;
                    });
            }
            function sendDeleteQuery(action, data) {
                var url = _buildUrl(action)
                return $http({ method: 'DELETE', url: this._buildUrl(action), data: data }).
                    success(function (data) {
                        return data;
                    });
            }
            function loadTemplate(resource) {

                return $location.absUrl().indexOf('/Capability') > -1 ? 'Capability/' + resource : resource;

            }

            //////////////////////end need to delete////////////////////////////////////////////////////////////

            return {
                // "PUBLIC" functions go here               
                sendGetQuery: sendGetQuery,
                sendPostQuery: sendPostQuery,
                sendPutQuery: sendPutQuery,
                sendDeleteQuery: sendDeleteQuery,
                loadTemplate: loadTemplate,
                PostAction: PostAction,
                GetAction: GetAction,
                GetAllAction: GetAllAction,
                GetQueryAction: GetQueryAction,
                PutAction: PutAction,
                DeleteAction: DeleteAction


            };
        }]);
})
(angular);