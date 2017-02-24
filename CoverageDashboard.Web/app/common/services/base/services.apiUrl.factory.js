(function (angular) {
    "use strict";

    angular.module("capability").factory("APIConnectFactory", APIConnectFactory);
    APIConnectFactory.$inject = ["capabilityConfig"];

    function APIConnectFactory(capabilityConfig) {
        var factory = {
            url: function (params) {
                return capabilityConfig.webApiUrl + '/api/' + params;
            }
        }
        return factory;


    };



})(angular);