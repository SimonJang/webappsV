/**
 * Home controller
 */

(function() {
    angular
        .module('quizApp')
        .controller('homeController', homeController)
        .controller('spelController', spelController)
        .controller('reeksController', reeksController);
    
    homeController.$inject = ['$scope', '$location'];

    function homeController($scope, $location) {
        var vm = this;

        vm.onSpelen = function() {
            $location.path('/spelen/');
        }
    }

    spelController.$inject = ['$scope','$location'];

    function spelController($scope, $location, landenService, GLOBALS) {
        var vm = this;
        vm.keuzes = [{id: 5, tekst: "5"}, {id: 10, tekst: "10"}, {id: 15, tekst: "15"}, {id: 20, tekst: "20"}];
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

    reeksController.$inject = ['$scope', '$location','$routeParams','reeksBuilder']

    function reeksController($scope, $location, $routeParams, reeksBuilder) {
        var vm = this;
        vm.aantal = $routeParams.id;
        vm.landen = [];
        
        vm.reeks = reeksBuilder.geefReeks(vm.aantal);
    }
})();
