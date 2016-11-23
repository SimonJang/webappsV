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
                controller: 'contactController',
                controllerAs: 'contactCtrl'
            })
            .when ('/about', {
                templateUrl: 'html/aboutView.html',
                controller: 'aboutController',
                controllerAs: 'aboutCtrl'
            })
            .when('/spelen', {
                templateUrl: 'html/spelOverzicht',
                controller: 'spelController',
                controllerAs: 'spelController'
            })
    }
})();
