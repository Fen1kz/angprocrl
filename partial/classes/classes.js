angular.module('AndProcRLData').controller('ClassesCtrl',function($scope, charClassService){
    $scope.childClassesIndexes = charClassService.getClassesIndexes(undefined);
    $scope.charClassService = charClassService;

    $scope.isParentUndefined = function(item) {
        return item.parent === void 0;
    };

    $scope.flush = function () {
        charClassService.flush();
    };
});
