/**
 * Configuratie van de REST routes
 */

(function() {
    angular.module('quizApp')
        .constant('GLOBALS', {
            alleLandenURL: 'https://landenquizapp.herokuapp.com/api/landen',
            reeksURL: 'https://landenquizapp.herokuapp.com/api/reeks/',
            loginUrl: 'https://landenquizapp.herokuapp.com/api/login',
            registreerUrl: 'https://landenquizapp.herokuapp.com/api/registreer',
            quizUrl: 'https://landenquizapp.herokuapp.com/api/quiz/',
            usernamesUrl: 'https://landenquizapp.herokuapp.com/api/names',
            userUrl: 'https://landenquizapp.herokuapp.com/api/user',
            highscoreURL: 'https://landenquizapp.herokuapp.com/api/highscore',
            updateScoreURL: 'https://landenquizapp.herokuapp.com/api/score/'
        })
})();
