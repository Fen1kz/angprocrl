if (console) {console.clear();}

angular.module('AndProcRLData', ['ui.bootstrap','ui.utils','ui.router','ngAnimate']);

angular.module('AndProcRLData').config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('root', {
            abstract: true,
            views: {
                'left@': {
                    templateUrl: "partial/debug-display/debug-display.html"
                }
            }
        })
        .state('home', {
            url: '/home',
            parent: 'root',
            views: {
                'content@': {
                    templateUrl: "partial/home/home.html"
                }
            }
        })
        .state('classes', {
            url: '/classes',
            parent: 'root',
            views: {
                'content@': {
                    templateUrl: "partial/classes/classes.html"
                }
            }
        })
        .state('attrs', {
            url: '/attrs',
            parent: 'root',
            views: {
                'content@': {
                    templateUrl: "partial/attrs/attrs.html"
                }
            }
        })
        .state('heroes', {
            url: '/heroes',
            parent: 'root',
            views: {
                'content@': {
                    templateUrl: "partial/heroes/heroes.html"
                }
            }
        });


    /* Add New States Above */
    $urlRouterProvider.otherwise('/home');

});

angular.module('AndProcRLData').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});

angular.module('AndProcRLData')
.controller('AppCtrl', function($scope, dataService){
    $scope.menu = [{
        link: 'home',
        name: 'Home'
    },{
        link: 'classes',
        name: 'Classes'
    },{
        link: 'attrs',
        name: 'Attributes'
    },{
        link: 'heroes',
        name: 'Heroes'
    }];
        _.each(['save','load','flush'], function(action) {
            $scope[action] = function($event){
                dataService[action]();
                console.log(action, 'done!');
            }
        });
});

angular.module('AndProcRLData')
    .directive( 'popPopup', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: { title: '@', content: '@', placement: '@', template: '@', animation: '&', isOpen: '&' },
            templateUrl: 'template/popover/popover.html'
        };
    })
    .directive('pop', function($tooltip, $timeout) {
    var tooltip = $tooltip('pop', 'pop', 'event');
    var compile = angular.copy(tooltip.compile);
    tooltip.compile = function (element, attrs) {
        var parentCompile = compile(element, attrs);
        return function(scope, element, attrs ) {
            var first = true;
            attrs.$observe('popShow', function (val) {
                if (JSON.parse(!first || val || false)) {
                    $timeout(function () {
                        element.triggerHandler('event');
                    });
                }
                first = false;
            });
            parentCompile(scope, element, attrs);
        }
    };
    return tooltip;
});



















