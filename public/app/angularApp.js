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
            .state('profiel', {
                url: '/profiel',
                templateUrl: 'html/profiel.html',
                controller: 'profielController',
                controllerAs: 'profielCtrl',
                onEnter: ['$state', 'authFactory', function($state, authFactory) {
                    if(!authFactory.isLoggedIn()) {
                        $state.go('login');
                    }
                }]
            })
            .state('scorebord', {
                url: '/scorebord',
                templateUrl: 'html/score.html',
                controller: 'scoreController',
                controllerAs: 'scoreCtrl',
                onEnter:['$state', 'authFactory', function($state, authFactory) {
                    if(!authFactory.isLoggedIn()) {
                        $state.go('login');
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
                controllerAs: 'spelCtrl',
                onEnter: ['$state', 'authFactory', function($state, authFactory) {
                    if(!authFactory.isLoggedIn()) {
                        $state.go('login');
                    }
                }]
            })
            .state('spelenReeksId', {
                url: '/spelen/reeks/:id',
                templateUrl: 'html/spel.html',
                controller: 'reeksController',
                controllerAs: 'reeksCtrl',
                onEnter: ['$state', 'authFactory', function($state, authFactory) {
                    if(!authFactory.isLoggedIn()) {
                        $state.go('login');
                    }
                }]
            })
            .state('spelenQuiz', {
                url: '/spelen/quiz',
                templateUrl: 'html/quizConfig.html',
                controller: 'quizController',
                controllerAs: 'quizCtrl',
                onEnter: ['$state', 'authFactory', function($state, authFactory) {
                    if(!authFactory.isLoggedIn()) {
                        $state.go('login');
                    }
                }]
            })
            .state('SpelenQuizId', {
                url:'/spelen/quiz/:id',
                templateUrl: 'html/spel.html',
                controller: 'quizController',
                controllerAs: 'quizCtrl',
                onEnter: ['$state', 'authFactory', function($state, authFactory) {
                    if(!authFactory.isLoggedIn()) {
                        $state.go('login');
                    }
                }]
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
