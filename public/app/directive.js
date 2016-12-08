/**
 * Custom directive voor voorstellen van een waarschuwing
 */

(function() {
    angular.module('quizApp')
        .directive('wrongInput', wrongInput)

    function wrongInput() {
        return {
            template:'<div class="alert alert-danger directiveWarning">Enkel cijfers en letters zijn toegelaten als gebruikersnaam en paswoord!</div>',
            replace: 'true',
            restrict : 'AE'
        };
    };

})();
