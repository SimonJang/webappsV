/**
 * Angular JS main
 */

(function () {
    angular.module('quizApp', ['ui.router']).config(moduleConfig);

    moduleConfig.$inject = ['$stateProvider','$urlRouterProvider'];

    function moduleConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('/', {
            url: '/',
            templateUrl: 'html/homeView.html',
            controller: 'homeController',
            controllerAs: 'homeCtrl'
            })
            .state('home', {
                url: '/home',
                templateUrl: 'html/homeView.html',
                controller: 'homeController',
                controllerAs: 'homeCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'html/login.html',
                controller: 'authController',
                controllerAs: 'authCtrl',
                onEnter: ['$state', 'authFactory', function($state, authFactory) {
                    if(authFactory.isLoggedIn()) {
                        $state.go('home');
                    }
                }]
            })
            .state('registreer', {
                url: '/registreer',
                templateUrl: 'html/register.html',
                controller: 'authController',
                controllerAs: 'authCtrl',
                onEnter: ['$state', 'authFactory', function($state, authFactory) {
                    if(authFactory.isLoggedIn()) {
                        $state.go('home');
                    }
                }]
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'html/contactView.html',
                controller: 'homeController',
                controllerAs: 'homeCtrl'
            })
            .state ('about', {
                url: '/about',
                templateUrl: 'html/aboutView.html',
                controller: 'homeController',
                controllerAs: 'homeCtrl'
            })
            .state('spelen', {
                url: '/spelen',
                templateUrl: 'html/spelOverzicht.html',
                controller: 'spelController',
                controllerAs: 'spelCtrl'
            })
            .state('spelenReeks', {
                url: '/spelen/reeks',
                templateUrl: 'html/spelReeksConfig.html',
                controller: 'spelController',
                controllerAs: 'spelCtrl'
            })
            .state('spelenReeksId', {
                url: '/spelen/reeks/:id',
                templateUrl: 'html/spelReeks.html',
                controller: 'reeksController',
                controllerAs: 'reeksCtrl'
            })
            .state('landen', {
                url: '/landen',
                templateUrl: 'html/landen.html',
                controller: 'landenController',
                controllerAs: 'landenCtrl'
            });

        $urlRouterProvider.otherwise('home')

    }
})();
