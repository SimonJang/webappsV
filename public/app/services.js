/**
 * Diverse services en factories
 */

(function() {
    angular.module('quizApp')
        .service('landenService', landenService);
    
    landenService.$inject = ['$http','GLOBALS', '$q']

    function landenService($http, GLOBALS, $q) {
        var service = {};
        service.landen;

        service.getAlleLandenWithQ = function(GLOBALS) {
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

    
})();
