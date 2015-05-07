angular.module('AndProcRLData')
    .constant('OnRepeatEvents', {
        LAST: 'OnRepeatEvents::LAST'
    })
    .directive('onRepeatEvents', function(OnRepeatEvents) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, fn) {
            if (scope.$last) {
                scope.$evalAsync(function(){
                    scope.$emit(OnRepeatEvents.LAST, element, attrs);
                });
            }
		}
	};
});
