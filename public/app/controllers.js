/**
 * Home controller
 */

(function() {
    angular
        .module('quizApp')
        .controller('homeController', homeController)
        .controller('quizController', quizController)
        .controller('navController', navController)
        .controller('authController', authController)
        .controller('landenController', landenController)
        .controller('spelController', spelController)
        .controller('reeksController', reeksController);

    authController.$inject = ['$scope', '$state', 'authFactory'];

    function authController($scope, $state, authFactory) {
        $scope.user = {};

        $scope.register = function() {
            authFactory.register($scope.user).error(function(error) {
                $scope.error = true;
            }).then(function() {
                $state.go('home');
            });
        };

        $scope.logIn = function() {
            authFactory.logIn($scope.user).error(function(error) {
                $scope.error = true;
            }).then(function() {
                $state.go('home');
            })
        }
    }

    navController.$inject = ['$scope', 'authFactory'];

    function navController($scope, authFactory) {
        $scope.isLoggedIn = authFactory.isLoggedIn;
        $scope.currentUser = authFactory.currentUser;
        $scope.logOut = authFactory.logOut;
    }
    
    homeController.$inject = ['$scope', '$state'];

    function homeController($scope, $state) {
        var vm = this;

        vm.onSpelen = function() {
            $state.go('spelen');
        };

        vm.onSpeelReeks = function() {
            $state.go('spelenReeks');
        };

        vm.onSpeelQuiz = function() {
            $state.go('spelenQuiz');
        };
    }

    landenController.$inject = ['$scope','GLOBALS','landenService'];

    function landenController($scope,GLOBALS,landenService) {
        var vm = this;
        vm.landen = {};
        landenService.getAlleLanden(GLOBALS)
            .then(function(landen, err) {
                if(err) {console.log(err)}
                vm.landen = landen;
                vm.land = landen[0];
            })
    }

    spelController.$inject = ['$scope','$location', 'reeksService'];

    function spelController($scope, $location, reeksService) {
        var vm = this;
        vm.keuzes = [{id: 5, tekst: "5"}, {id: 10, tekst: "10"}];
        $scope.selectedOption = vm.keuzes[0];
        vm.keuze = $scope.selectedOption.id;

    }

    quizController.$inject = ['$scope', '$state', '$stateParams', 'quizService', 'GLOBALS'];

    function quizController($scope, $state, $stateParams, quizService, GLOBALS) {
        var vm = this;
        
    }

    reeksController.$inject = ['$scope', '$location','$stateParams','reeksService', 'GLOBALS','landenService'];

    function reeksController($scope, $location, $stateParams, reeksService, GLOBALS) {
        var vm = this;
        vm.aantal = $stateParams.id;
        $scope.reeks = [];
        vm.opties = [];
        $scope.showForm = true;
        $scope.showResult = false;

        reeksService.geefReeks(GLOBALS, vm.aantal)
            .then(function(reeks,err) {
                if(err) {
                    console.log(err);
                }
                vm.reeks = reeks;
                for(var x = 0; x < $scope.aantal; x++) {
                    vm.opties[x] = reeks[x].options;
                }
            });

        vm.reset = function() {
            vm.opties = [];
            vm.reeks = [];
            $scope.showForm = true;
            $scope.showResult = false;

            reeksService.geefReeks(GLOBALS, vm.aantal)
                .then(function(reeks,err) {
                    if(err) {
                        console.log(err);
                    }
                    vm.reeks = reeks;
                    for(var x = 0; x < vm.aantal; x++) {
                        vm.opties[x] = reeks[x].options;
                    }
                });

        };

        vm.controleer = function() {
            $scope.uitslag = {};
            $scope.uitslag.juist = 0;
            $scope.uitslag.fout = 0;
            for(var x = 0; x < vm.reeks.length; x++) {
                if(vm.reeks[x].keuze.toLowerCase() !== vm.reeks[x].hoofdstad.toLowerCase()) {
                    $scope.uitslag.fout += 1;
                }
                else
                    $scope.uitslag.juist += 1;
            }
            $scope.showForm = false;
            $scope.showResult = true;
        };

        vm.nieuwSpel = function() {
            vm.reset(GLOBALS, vm.aantal);
            $location.path('/spelen/reeks/' + vm.aantal);

        };

        vm.reeksCfg = function() {
            $location.path('/spelen/');
        }
    }
})();
