angular.module('AndProcRLData').directive('characterClass', function($rootScope, $document, dataService) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
            index: '='
		},
		templateUrl: 'directive/character-class/character-class.html',
		link: function($scope, $e, attrs, fn) {
            $scope.model = dataService.data.classes[$scope.index];

            $scope.$watch('model._gfx', function(newValue, oldValue) {
                //console.log($scope.model.id, 'MODEL', newValue, oldValue)
                $e.css('left', $scope.model._gfx.x);
                $e.css('top', $scope.model._gfx.y);
            });

            $scope.$watch('model.id', function(newValue, oldValue) {
                _.each(dataService.data.classes, function(e){
                    if (e.parent === oldValue) {
                        e.parent = newValue;
                    }
                });
            });

            $scope.$watch('model._gfx', function(newValue, oldValue) {
                //console.log($scope.model.id, 'MODEL', newValue, oldValue)
                $e.css('left', $scope.model._gfx.x);
                $e.css('top', $scope.model._gfx.y);
            });

            $scope.add = function(){
                dataService.addClass($scope.model);
            };

            $scope.remove = function(){
                dataService.removeClass($scope.model);
            };

            $scope.edit = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.editing = true;

                var listener = function(e) {
                    var keyCode = (e.keyCode ? e.keyCode : e.which);
                    if (
                        (
                            keyCode == 13
                            || $(e.target).parents('.element').length == 0
                        )
                        && $(e.target).is('.ng-valid')
                    ) {
                        $document.off('click', listener);
                        $scope.$apply(function() {
                            $scope.editing = false;
                        });
                    }
                };

                $document.on('click', listener);
                $document.on('keyup', listener);
            }
		}
	};
});
