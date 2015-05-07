angular.module('AndProcRLData').directive('characterClass', function(dataService) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
            index: '='
		},
		templateUrl: 'directive/character-class/character-class.html',
		link: function($scope, $e, attrs, fn) {
            $scope.model = dataService.data.classes[$scope.index];

            $scope.$watch('$scope.model._gfx', function(newValue, oldValue){
                $e.css('left', $scope.model._gfx.x);
                $e.css('top', $scope.model._gfx.y);
            });

            $scope.add = function(){
                dataService.addClass($scope.model);
            };
		}
	};
});
