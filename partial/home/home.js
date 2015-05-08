angular.module('AndProcRLData').controller('HomeCtrl',function($scope, $timeout, OnRepeatEvents, dataService){
    $scope.dataService = dataService;

    $scope.childClassesIndexes = dataService.getClassesIndexes(undefined);

    //$scope.$on('classes:update', function() {
    //    //$scope.childClassesIndexes = dataService.getClassesIndexes(undefined);
    //    $scope.$broadcast('classes:destroy', $scope);
    //    debugger;
    //    $scope.childClassesIndexes = dataService.getClassesIndexes(undefined);
    //});

    $scope.flush = function(){
        dataService.flush('data');
    };

    $scope.$on(OnRepeatEvents.LAST, function(event, element, attrs){
        //dataService.update();
        //$scope.$broadcast('refreshLayout');
    });
});
