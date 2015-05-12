angular.module('AndProcRLData').controller('HeroesCtrl',function($scope){

    $scope.hero = {
        class: charClassService.data['Adventurer'],
        level: 1
    };
    $scope.classes = charClassService.data;
    $scope.attributes = dataService.data.attributes;
    $scope.traits = dataService.data.traits;
});
