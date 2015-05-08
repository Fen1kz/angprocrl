angular.module('AndProcRLData').directive('characterClass', function($rootScope, $document, $compile, dataService) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
            //model: '='
            index: '='
		},
		templateUrl: 'directive/character-class/character-class.html',
		link: function($scope, $e, attrs, fn) {
            $scope.model = dataService.data.classes[$scope.index];
            //$scope.service = dataService;


            var recompileChildren = function() {
                $scope.$broadcast('classes:destroy', $scope);

                //$e.find('.character-class-children').remove();
                $scope.childClassesIndexes = dataService.getClassesIndexes($scope.model.id);
                console.log($scope.model.id,'compiling',$scope.childClassesIndexes)
                if ($scope.childClassesIndexes.length > 0) {
                    $compile('<div class="character-class-children"><character-class ng-repeat="index in childClassesIndexes" index="index"/></div>')($scope, function(cloned, scope){
                        $e.append(cloned);
                    });
                }
            };
            recompileChildren();
            //$scope.$on('classes:update', recompileChildren);

            $scope.recompile = recompileChildren;
            $scope.custom1 = function(){
                $scope.$broadcast('classes:destroy', $scope);
            };


            $scope.$on('classes:destroy', function(event, scope){
                console.log('classes:destroy scope for ', $scope.model.id, ': ', $scope.$id !== scope.$id)
                if ($scope.$id !== scope.$id) {
                    $scope.$evalAsync(function(){
                        $scope.$destroy();
                    });
                }
            });

            $scope.$on('$destroy', function(){
                console.log('huh, im destroyed', $scope.model.id)
                dataService.removeClass($scope.model);
                var $parent = $e.parent('.character-class-children');
                $e.remove();
                if ($parent.children('.character-class-wrapper').length === 0) {
                    $parent.remove();
                }
            });

            $scope.$on('class:removed', function(e){
                console.log($scope.model.id, 'my child is removed!');
                e.stopPropagation();
                recompileChildren();
                //console.log($e);
            });

            $scope.$watch('model.id', function(newValue, oldValue) {
                _.each(dataService.data.classes, function(e){
                    if (e.parent === oldValue) {
                        e.parent = newValue;
                    }
                });
            });

            $scope.add = function(){
                console.log($scope.model.id, "ADD")
                dataService.addClass($scope.model);
                recompileChildren();
            };

            $scope.remove = function(){
                console.log("REMOVE")
                if (!confirm('rly?')) {
                    return;
                }
                //$scope.$evalAsync(function(){
                    $scope.$parent.$emit('class:removed')
                //});
                //$scope.$destroy();
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
                        && $e.find('input[ng-model="model.id"]').is('.ng-valid')
                    ) {
                        $document.off('click', listener);
                        $document.off('keyup', listener);
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
