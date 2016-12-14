/**
 * Tests met Karma
 * Lukt niet
 */

describe('Test met Karma', function() {
    it('Dummy test', function() {
        expect(5).toEqual(5);
    })
});

// Lukt niet

describe('Test met QuizService', function() {

    var quizService;
    beforeEach(function() {
        angular.module('ui.router', []);
        angular.module('ngAnimate', []);
        angular.module('quizApp');

        var landenService;
        inject(function($injector) {
            landenService = $injector.get('landenService');
            spyOn(landenService,['getAlleLanden'].and.returnValue('test'));
        })
    });

    it('Testen van Quizservice', function() {
        expect(landenService).toBeDefined();
        expect(landenService.getAlleLanden()).toHaveBeenCalled();
        var value = landenService.getAlleLanden();
        expect(value).toBeDefined();
        expect(value).toBe('test');
    })
})
