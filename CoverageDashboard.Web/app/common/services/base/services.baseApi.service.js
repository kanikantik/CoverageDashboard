/*
 * angular base HTTP Verbs
 *
 
 */

(function (angular) {

    angular.module('capability').service('baseApiService',
        ['$http', '$q', '$location', function ($http, $q, $location) {

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

            return {
                // "PUBLIC" functions go here               
                sendGetQuery: sendGetQuery,
                sendPostQuery: sendPostQuery,
                sendPutQuery: sendPutQuery,
                sendDeleteQuery: sendDeleteQuery,
                loadTemplate: loadTemplate

            };
        }]);
})
(angular);