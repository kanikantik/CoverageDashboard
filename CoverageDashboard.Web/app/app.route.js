(function (angular) {
    "use strict";

    angular.module("capability")
        .config(config);



    function config($locationProvider, $stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "app/home/partial-home.html",
                controller: "HomeController",
                controllerAs: "vm"
            })
         .state("dashboard", {
             url: "/dashboard",
             templateUrl: "app/dashboard/partial-dashboard.html",
             controller: "DashboardController"
         })
        .state("associate", {
            url: "/associate",
            templateUrl: "app/associates/partial-associate.html",
            controller: "AssociateController"
        })
         .state("training", {
             url: "/training",
             templateUrl: "app/trainings/partial-training.html",
             controller: "TrainingController",
             controllerAs: "vm"
         })
         .state("settings", {
             url: "/settings",
             templateUrl: "app/settings/partial-settings.html",
             controller: "SettingsController"
         })
         .state("export", {
             url: "/export",
             templateUrl: "app/exports/partial-export.html",
             controller: "ExportController"
         });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

    }
})(angular);