/**
 * Custom directive voor voorstellen van een waarschuwing
 */

(function() {
    angular.module('quizApp')
        .directive('wrongInput', wrongInput)
        .directive('checkUserNameAsync', checkUserNameAsync);

    function wrongInput() {
        return {
            template:'<div class="alert alert-danger directiveWarning">Enkel cijfers en letters zijn toegelaten als gebruikersnaam en paswoord!</div>',
            replace: 'true',
            restrict : 'AE'
        };
    };

    checkUserNameAsync.$inject = ['gebruikerService'];
    
    function checkUserNameAsync(gebruikerService) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ngModel) {
                scope.myForm.$invalid = false;
                ngModel.$asyncValidators.username = function(modelValue, viewValue) {
                    return gebruikerService.checkNaam(viewValue).then(
                        function(response) {
                            if(response.data.response == 'nok') {
                                scope.myForm.username.$error = true;
                            }
                            else {
                                scope.myForm.username.$error = false;
                            }
                        }
                    )
                };
            }
        }
    };

})();
