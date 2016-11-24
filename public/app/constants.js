/**
 * Configuratie van de REST routes
 */

(function() {
    angular.module('quizApp')
        .constant('GLOBALS', {
            alleLandenURL: 'http://localhost:3000/api/landen',
            reeksURL: 'http://localhost:3000/api/reeks/'
        })
})();
