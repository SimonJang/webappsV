/**
 * Diverse services en factories
 */

(function() {
    angular.module('quizApp')
        .service('landenService', landenService)
        .service('quizService', quizService)
        .service('reeksService', reeksService);
    
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
            $http({
                url: GLOBALS.quizUrl(),
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
                })
            return deferred.promise;
        };

        return service;
    }

})();
