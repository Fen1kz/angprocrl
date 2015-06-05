angular.module('AndProcRLData')
.controller('DebugDisplayCtrl',function($scope, dataService, CCService) {
    $scope.$watch(function () {
        return CCService.data;
    }, function() {
        var cache = [];
        console.log('watching CCService.data');
        $scope.jsonData = JSON.stringify(CCService.data, function(key, value) {
            if (key.match(/^\$\$/)) {
                return;
            }
            if (key === '$attributes') {
                return '<attrs>';
            }
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    // Circular reference found, discard key
                    return '<circular>';
                }
                // Store value in our collection
                cache.push(value);
            }
            return value;
        }, '  ');
    }, true);
    //$scope.services = {
    //    dataService: dataService
    //    ,CCService:CCService
    //};
    //    $scope.selectedService = $scope.services.CCService;
    //    $scope.selectService = function(service) {
    //        $scope.selectedService = service;
    //    };
});
