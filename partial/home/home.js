angular.module('AndProcRLData')
    .controller('HomeCtrl', function ($scope, charClassService) {
        $scope.childClassesIndexes = charClassService.getClassesIndexes(undefined);

        $scope.flush = function () {
            charClassService.flush();
        };
    });
