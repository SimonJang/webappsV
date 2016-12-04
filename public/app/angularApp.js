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
            .state('spelenQuiz', {
                url: '/spelen/quiz',
                templateUrl: 'html/quizConfig.html',
                controller: 'quizController',
                controllerAs: 'quizCtrl'
            })
            .state('SpelenQuizId', {
                url:'/spelen/quiz/:id',
                templateUrl: 'html/quiz.html',
                controller: 'quizController',
                controllerAs: 'quizCtrl'
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
