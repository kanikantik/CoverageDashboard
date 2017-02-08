(function (angular) {
    'use strict';

    angular.module('capability')
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/home/partial-home.html'
            })
         .state('dashboard', {
             url: '/dashboard',
             templateUrl: 'app/dashboard/partial-dashboard.html',
             controller: 'DashboardController'
         })
        .state('associate', {
            url: '/associate',
            templateUrl: 'app/associates/partial-associate.html',
            controller: 'AssociateController'
        })
         .state('training', {
             url: '/training',
             templateUrl: 'app/trainings/partial-training.html',
             controller: 'TrainingController'
         })
         .state('settings', {
             url: '/settings',
             templateUrl: 'app/settings/partial-settings.html',
             controller: 'SettingsController'
         })
         .state('export', {
             url: '/export',
             templateUrl: 'app/exports/partial-export.html',
             controller: 'ExportController'
         });



    });
})(angular);