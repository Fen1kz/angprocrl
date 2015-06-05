angular.module('AndProcRLData').controller('ClassesCtrl',function($scope, CCService) {
    $scope.CCService = CCService;
    $scope.filteredClasses = _.filter(CCService.data, function(model) {
        return model.parentID === void 0;
    });

    $scope.flush = function () {
        CCService.flush();
    };
});
