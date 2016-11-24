/**
 * Diverse services en factories
 */

(function() {
    angular.module('quizApp')
        .service('landenService', landenService)
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

})();
