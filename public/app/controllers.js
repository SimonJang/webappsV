/**
 * Home controller
 */

(function() {
    angular
        .module('quizApp')
        .controller('homeController', homeController)
        .controller('contactController', contactController)
        .controller('aboutController', aboutController)
    
    homeController.$inject = ['$scope'];

    function homeController($scope) {
        var vm = this;
    }

    contactController.$inject = ['$scope']

    function contactController($scope) {
        var vm = this;
    }

    aboutController.$inject = ['$scope']

    function aboutController($scope) {
        var vm = this;
    }

})();
