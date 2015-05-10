console.clear();

angular.module('AndProcRLData', ['ui.bootstrap','ui.utils','ui.router','ngAnimate']);

angular.module('AndProcRLData').config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('root', {
            abstract: true,
            views: {
                'left': {
                    templateUrl: "partial/debug-display/debug-display.html"
                }
            }
        })
        .state('home', {
            url: '/home',
            parent: 'root',
                views: {
                '@': {
                    templateUrl: "partial/home/home.html",
                    controller: 'HomeCtrl'
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
