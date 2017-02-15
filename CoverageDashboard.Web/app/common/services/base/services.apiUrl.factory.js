(function (angular) {
    "use strict";

    angular.module("capability").factory("APIConnectFactory", ["capabilityConfig", function (capabilityConfig) {
        return {
            url: function (params) {
                return capabilityConfig.webApiUrl + '/api/' + params;
            }

        };

    }]);

})(angular);