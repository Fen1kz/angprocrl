angular.module('AndProcRLData').controller('ClassesCtrl',function($scope, CCService){
    $scope.childClassesIndexes = CCService.getClassesIndexes(undefined);
    $scope.CCService = CCService;

    $scope.isParentUndefined = function(item) {
        return item.parent === void 0;
    };

    $scope.flush = function () {
        CCService.flush();
    };
});
