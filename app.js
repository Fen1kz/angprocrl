console.clear();

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
    $scope.dataService = dataService;
});





















