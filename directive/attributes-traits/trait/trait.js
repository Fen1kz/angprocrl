angular.module('AndProcRLData').directive('trait', function(attributeService) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
            trait: '=',
            attributes: '='
		},
		templateUrl: 'directive/attributes-traits/trait/trait.html',
		link: function($scope, element, attrs, fn) {
            var updateValue = function() {
                if (!$scope.trait.fn) {
                    attributeService.makeTraitFn($scope.trait, $scope.attributes);
                }
                $scope.trait.value = $scope.trait.fn($scope.attributes);
            };

            _.each($scope.attributes, function(attr, index){
                $scope.$watch('attributes['+index+'].value', updateValue);
            });
            $scope.$watch('trait.formula', updateValue);
            $scope.$watch('trait.base', updateValue);
		}
	};
});
