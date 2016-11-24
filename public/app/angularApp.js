/**
 * Angular JS main
 */

(function () {
    angular.module('quizApp', ['ngRoute']).config(moduleConfig);

    moduleConfig.$inject = ['$routeProvider'];

    function moduleConfig($routeProvider) {
        $routeProvider
            .when('/', {
            templateUrl: 'html/homeView.html',
            controller: 'homeController',
            controllerAs: 'homeCtrl'
            })
            .when('/contact', {
                templateUrl: 'html/contactView.html',
                controller: 'homeController',
                controllerAs: 'homeCtrl'
            })
            .when ('/about', {
                templateUrl: 'html/aboutView.html',
                controller: 'homeController',
                controllerAs: 'homeCtrl'
            })
            .when('/spelen', {
                templateUrl: 'html/spelOverzicht.html',
                controller: 'spelController',
                controllerAs: 'spelCtrl'
            })
            .when('/spelen/reeks', {
                templateUrl: 'html/spelReeksConfig.html',
                controller: 'spelController',
                controllerAs: 'spelCtrl'
            })
            .when('/spelen/reeks/:id', {
                templateUrl: 'html/spelReeks.html',
                controller: 'reeksController',
                controllerAs: 'reeksCtrl'
            })
            .when('/landen', {
                templateUrl: 'html/landen.html',
                controller: 'landenController',
                controllerAs: 'landenCtrl'
            });

    }
})();
