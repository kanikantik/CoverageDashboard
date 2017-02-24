(function (angular) {

    function homeService($http, $q, $location, baseApiService) {
        var service = {
            GetCount: GetCount
        };
        return service;


        function GetCount(data) {
            return "Count from Service " + data;

        }

    };
    angular.module('capability').service('homeService', homeService);
    homeService.$inject = ['$http', '$q', '$location', 'baseApiService'];
})
(angular);