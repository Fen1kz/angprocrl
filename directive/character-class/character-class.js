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
            $scope.model.id = $scope.index;

            $scope.$watch('model.id', function(newValue, oldValue) {
                _.each(dataService.data.classes, function(e){
                    if (e.parent === oldValue) {
                        e.parent = newValue;
                    }
                });
            });

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

            var droptarget;
            $e.find('.position').on('mousedown', function(e) {
                var $characterClass = $(e.currentTarget).parents('.character-class');
                var $target = $(e.target).clone();
                $target.css('position', 'absolute');
                $target.css('pointer-events', 'none');
                $('body').append($target);

                var tw = $target.width()/2;
                var th = $target.height()/2;

                $document.on('mouseenter.class.position', '.character-class', function(e) {
                    console.log('mouseenter', $characterClass, $(e.currentTarget));
                    if (!$(e.currentTarget).is($characterClass)) {
                        $(e.currentTarget).addClass('dropzone');
                    }
                });
                $document.on('mouseleave.class.position', '.character-class', function(e){
                    console.log('mouseleave', $(e.currentTarget));
                    $(e.currentTarget).removeClass('dropzone');
                });

                $document.on('mousemove.class.position', function(e){
                    $target.css('left', event.x - tw);
                    $target.css('top', event.y - th);
                });
                $document.on('mouseup.class.position', function(){
                    $document.off('.class.position');
                    var targetClass = $('.dropzone').attr('data-class');
                    $('.dropzone').removeClass('dropzone');
                    $target.remove();

                    //dataService.data.classes
                    //delete dataService.data.classes[$scope.index];
                    if (targetClass) {
                        $scope.model.parent = targetClass;
                    }
                    //$rootScope('')
                });
            });

            $scope.$on('classes:destroy', function(event, scope){
                if ($scope.$id !== scope.$id) {
                    $scope.$evalAsync(function(){
                        $scope.$destroy();
                    });
                }
            });

            $scope.$on('$destroy', function() {
                var $parent = $e.parent('.character-class-children');
                $e.remove();
                if ($parent.children('.character-class-wrapper').length === 0) {
                    $parent.remove();
                }
            });

            $scope.$on('class:removed', function(e){
                e.stopPropagation();
                recompileChildren();
            });

            $scope.add = function(){
                dataService.addClass($scope.model);
                recompileChildren();
            };

            $scope.remove = function(){
                if (!confirm('rly?')) return;
                dataService.removeClass($scope.model);
                $scope.$parent.$emit('class:removed');
            };

            $scope.edit = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.editing = true;

                $scope.editModel = angular.extend({}, $scope.model);
                //$scope.editModel = $scope.model;

                var listener = function(e) {
                    var keyCode = (e.keyCode ? e.keyCode : e.which);
                    if (
                        (
                            keyCode == 13
                            || $(e.currentTarget).parents('.element').length == 0
                        )
                        && $e.find('input[ng-model*=".id"]').is('.ng-valid')
                    ) {
                        $document.off('click', listener);
                        $document.off('keyup', listener);
                        $scope.$apply(function() {
                            $scope.editing = false;
                            var oldIndex = $scope.index;
                            $scope.index = $scope.editModel.id;
                            dataService.data.classes[$scope.index] = $scope.editModel;
                            $scope.model = dataService.data.classes[$scope.index];
                            delete $scope.editModel;
                            delete dataService.data.classes[oldIndex];
                        });
                    }
                };

                $document.on('click', listener);
                $document.on('keyup', listener);
            }

            /*
            * DEPRECATED
            * */

            $scope.recompile = recompileChildren;
            $scope.custom1 = function(){
                $scope.$broadcast('classes:destroy', $scope);
            };
		}
	};
});
