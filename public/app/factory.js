/**
 * Factory
 * Wordt momenteel niet gebruikt
 */

(function() {
    angular.module('quizApp')
        .factory('authFactory', authFactory);

    authFactory.$inject = ['$http', '$window', 'GLOBALS'];

    function authFactory($http, $window, GLOBALS) {
        var auth = {};

        auth.saveToken = function(token) {
            $window.localStorage['quizapptoken'] = token;
        };

        auth.getToken = function() {
            return $window.localStorage['quizapptoken'];
        };


        auth.isLoggedIn = function() {
            var token = auth.getToken();

            if(token) {
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return payload.exp > Date.now() / 1000;
            }
            else {
                return false;
            }
        };

        auth.currentUser = function() {
            if(auth.isLoggedIn()) {
                var token = auth.getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.username;
            }
        };

        auth.register = function(user) {
            return $http.post(GLOBALS.registreerUrl, user).success(function(data) {
                auth.saveToken(data.token);
            })
        };

        auth.logIn = function(user) {
            return $http.post(GLOBALS.loginUrl, user).success(function(data) {
                auth.saveToken(data.token);
            })
        };

        auth.logOut = function() {
            $window.localStorage.removeItem('quizapptoken');
        };

        return auth;
    }


})();
