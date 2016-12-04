/**
 * Tests voor Jasmine
 * Angular testen met Jasmine is wenen
 */

(function() {
    describe('Testen $stateProvider routing', function() {
        var state;

        beforeEach(function() {
            module('quizApp');
        });

        beforeEach(inject(function($state) {
            state = $state.get('/');
        }));

        it("Test $state '/' url", function() {
            expect(state.url).toEqual('/');
        });
        it("Test $state '/' templateUrl", function() {
            expect(state.templateUrl).toEqual("html/homeView.html")
        });
        it("Test $state '/' Controller", function() {
            expect(state.controller).toEqual("homeController")
        })
    });
    describe('Testen van $state functionaliteit', function() {
        var state;
        var scope;
        var httpBackend;
        var http;

        beforeEach(function() {
            module('quizApp');
        });

        beforeEach(inject(function($state,  $rootScope , $httpBackend, $injector, _$http_) {
            state = $state;
            http = _$http_;
            scope = $rootScope.$new();
            httpBackend = $injector.get('$httpBackend');
        }));
        it("Test $state naar about", function() {
            state.transitionTo('about');
            httpBackend.expect('GET','html/aboutView.html').respond(200);
            httpBackend.expect('GET','html/homeView.html').respond(200);
            expect(httpBackend.flush).not.toThrow();
        });
        it('Test $state naar landen', function() {
            state.transitionTo('landen');
            httpBackend.expect('GET','html/landen.html').respond(200);
            httpBackend.expect('GET','html/homeView.html').respond(200);
            expect(httpBackend.flush).not.toThrow();
        })
    });
})();