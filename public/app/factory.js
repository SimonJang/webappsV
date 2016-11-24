/**
 * Factory
 * Wordt momenteel niet gebruikt
 */

(function() {
    angular.module('quizApp')
        .factory('reeksBuilder', reeksBuilder);

    reeksBuilder.$inject = ['landenService', 'GLOBALS'];

    function reeksBuilder(landenService, GLOBALS) {
        var factory = {};
        var landen = [];

        landenService.getAlleLandenWithQ(GLOBALS)
            .then(function(landenReturn) {
                landen = landenReturn;
            });
        
        factory.geefReeks = function(aantal) {
            var max = landen.length;
            var memory = [];
            var reeks = [];
            var nummer = Math.floor((Math.random() * max) + 0);
            memory.push(nummer)
        };
        
        return factory;
    }

})();
