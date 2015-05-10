angular.module('AndProcRLData')
.controller('DebugDisplayCtrl',function($scope, dataService, charClassService) {
    $scope.services = {
        dataService: dataService
        ,charClassService:charClassService
    };
        $scope.selectedService = $scope.services.charClassService;
        $scope.selectService = function(service) {
            $scope.selectedService = service;
        };
});
