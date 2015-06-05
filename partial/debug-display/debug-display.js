angular.module('AndProcRLData')
.controller('DebugDisplayCtrl',function($scope, dataService, CCService) {
        $scope.data = dataService.data;
    //$scope.services = {
    //    dataService: dataService
    //    ,CCService:CCService
    //};
    //    $scope.selectedService = $scope.services.CCService;
    //    $scope.selectService = function(service) {
    //        $scope.selectedService = service;
    //    };
});
