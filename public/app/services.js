/**
 * Diverse services en factories
 */

(function() {
    angular.module('quizApp')
        .service('gebruikerService', gebruikerService)
        .service('landenService', landenService)
        .service('quizService', quizService)
        .service('reeksService', reeksService);

    gebruikerService.$inject = ['$http', '$q', 'GLOBALS','authFactory'];

    function gebruikerService($http, $q, GLOBALS, authFactory) {
        var service = {};

        service.getGebruiker = function() {
            var deferred = $q.defer();
            return $http.post(GLOBALS.userUrl, null, {headers: {Authorization: 'Bearer '+ authFactory.getToken()}})
                .success(function(data) {
                    deferred.resolve(data)
                });
            return deferred.promise;
        };
        
        service.getHighScores = function() {
            var deferred = $q.defer();
            return $http.post(GLOBALS.highscoreURL, null, {headers: {Authorization: 'Bearer ' + authFactory.getToken()}})
                .success(function(data) {
                    deferred.resolve(data)
                });
            return deferred.promise;
        };
        
        service.getGebruikerNamen = function() {
            var deferred = $q.defer();
            return $http.get(GLOBALS.usernamesUrl)
                .success(function(data) {
                    deferred.resolve(data);
                });
            return deferred.promise;
        };

        service.checkNaam = function(naam) {
            var deferred = $q.defer();
            var check = {};
            check.naam = naam;
            return $http.post(GLOBALS.usernamesUrl, check)
                .success(function(data) {
                    deferred.resolve(data);
                });
            return deferred.promise;
        };

        return service;
    }

    
    landenService.$inject = ['$http','$q'];

    function landenService($http, $q) {
        var service = {};

        service.getAlleLanden = function(GLOBALS) {
            var deferred = $q.defer();
            $http({
                url: GLOBALS.alleLandenURL,
                method: 'GET'
            })
                .success(function(data) {
                    deferred.resolve(data)
                });
            return deferred.promise;
        };

        return service;
    }

    reeksService.$inject = ['$http','$q'];
    
    function reeksService($http, $q) {
        var service = {};
        service.temp = {};
        service.geefReeks = function(GLOBALS, grootte) {
            var deferred = $q.defer();
            $http({
                url: GLOBALS.reeksURL + grootte,
                method: 'GET'
            })
                .success(function(data) {
                    deferred.resolve(data);
                });
            return deferred.promise;
        };
        
        return service;
    }

    quizService.$inject = ['$http', '$q', 'GLOBALS'];

    function quizService($http, $q, GLOBALS) {
        var service = {};
        service.temp = {};
        
        service.geefQuizes = function() {
            var deferred = $q.defer();
            $http({
                url: GLOBALS.quizUrl,
                method: 'GET'
            })
                .success(function(data) {
                    deferred.resolve(data)
                });
            return deferred.promise;
        };

        service.geefQuiz = function(id) {
            $http({
                url: GLOBALS.quizUrl + id,
                method: 'GET'
            })
                .success(function(data) {
                    deferred.resolve(data);
                });
            return deferred.promise;
        };

        return service;
    }

})();
