angular.module('AndProcRLData')
    .controller('HomeCtrl', function ($scope, dataService, charClassService, attributeService) {
        $scope.childClassesIndexes = charClassService.getClassesIndexes(undefined);

        $scope.flush = function () {
            charClassService.flush();
            dataService.flush('data');
        };

        $scope.hero = {
            class: charClassService.data['Adventurer'],
            level: 1
        };
        $scope.classes = charClassService.data;
        $scope.attributes = dataService.data.attributes;
        $scope.traits = dataService.data.traits;
    });
