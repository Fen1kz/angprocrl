angular.module('AndProcRLData').directive('trait', function() {
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
                //console.log('watched');
                try {
                    $scope.trait.value = $scope.trait.fn ? $scope.trait.fn($scope.attributes) : 0;
                } catch (e) {
                    //console.log('Wrong formula');
                }
            };

            _.each($scope.attributes, function(attr, index){
                $scope.$watch('attributes['+index+'].value', updateValue);
            });
            $scope.$watch('trait.formula', updateValue);
            $scope.$watch('trait.base', updateValue);
		}
	};
});
