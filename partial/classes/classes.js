angular.module('AndProcRLData').controller('ClassesCtrl',function($scope, charClassService){
    $scope.childClassesIndexes = charClassService.getClassesIndexes(undefined);

    $scope.flush = function () {
        charClassService.flush();
    };
});
