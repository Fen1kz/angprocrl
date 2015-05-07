angular.module('AndProcRLData').controller('HomeCtrl',function($scope, $timeout, OnRepeatEvents, dataService){
    $scope.dataService = dataService;
    $scope.flush = function(){
        dataService.flush('data');
    };

    $scope.$on(OnRepeatEvents.LAST, function(event, element, attrs){
        dataService.update();
        //$scope.$broadcast('refreshLayout');
    });
});
