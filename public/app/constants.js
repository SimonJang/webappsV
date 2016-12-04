/**
 * Configuratie van de REST routes
 */

(function() {
    angular.module('quizApp')
        .constant('GLOBALS', {
            alleLandenURL: 'http://localhost:3000/api/landen',
            reeksURL: 'http://localhost:3000/api/reeks/',
            loginUrl: 'http://localhost:3000/api/login',
            registreerUrl: 'http://localhost:3000/api/registreer',
            quizUrl: 'http://localhost:3000/api/quiz/'
        })
})();
