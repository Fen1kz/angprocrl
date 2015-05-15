angular.module('AndProcRLData').controller('HeroesCtrl',function($scope){
    $scope.classes = charClassService.data;
    $scope.attributes = dataService.data.attributes;
    $scope.traits = dataService.data.traits;

    $scope.hero = {
        class: $scope.classes[0],
        level: 1,
        traits: []
    };
    $scope.$watch('hero.class', function(){
        $scope.hero.attributes = $scope.hero.class.attributes;
    });
    //$scope.$watch('hero.attributes', function() {
    //
    //}, true);
    $scope.hero.traits = _.map($scope.traits, function(trait){
        return trait;
    });
});
