angular.module('AndProcRLData').directive('rlUnique', function(dataService) {
	return {
		restrict: 'A',
        require: '^ngModel',
		link: function($scope, element, attrs, ngModel) {
            if (!ngModel) {
                return;
            }
            var keyProperty = $scope.$eval(attrs.rlUnique);
            var currentValue = element.val();

            $scope.$watch('model.id', function(nVal) {
                ngModel.$setValidity('unique', !_.some(dataService.data.classes, function(e, index) {
                    return (keyProperty.index != index && e.id == element.val())
                }));
            });
		}
	};
});
