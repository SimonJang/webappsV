/**
 * Home controller
 */

(function() {
    angular
        .module('quizApp')
        .controller('homeController', homeController)
        .controller('landenController', landenController)
        .controller('spelController', spelController)
        .controller('reeksController', reeksController);
    
    homeController.$inject = ['$scope', '$location'];

    function homeController($scope, $location) {
        var vm = this;

        vm.onSpelen = function() {
            $location.path('/spelen/');
        }
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

        vm.onSpeelReeks = function() {
            $location.path('/spelen/reeks');
        };

        vm.onSpeelQuiz = function() {
            $location.path('/spelen/quiz');
        };

        vm.onStartReeks = function() {
            
        }
    }

    reeksController.$inject = ['$scope', '$location','$routeParams','reeksService', 'GLOBALS','landenService'];

    function reeksController($scope, $location, $routeParams, reeksService, GLOBALS) {
        var vm = this;
        vm.aantal = $routeParams.id;
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
