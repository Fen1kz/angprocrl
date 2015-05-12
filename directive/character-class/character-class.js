angular.module('AndProcRLData').directive('characterClass', function($rootScope, $document, $compile, charClassService, $modal) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
            //model: '='
            index: '='
		},
		templateUrl: 'directive/character-class/character-class.html',
		link: function($scope, $e, attrs, fn) {
            $scope.model = charClassService.data[$scope.index];
            $scope.model.id = $scope.index;

            $scope.$watch('model.id', function(newValue, oldValue) {
                _.each(charClassService.data, function(e){
                    if (e.parent === oldValue) {
                        e.parent = newValue;
                    }
                });
            });

            $scope.childClassesIndexes = charClassService.getClassesIndexes($scope.model.id);

            var compileChildren = function() {
                if ($scope.childClassesIndexes.length > 0) {
                    $compile('<div class="character-class-children"><character-class ng-repeat="index in childClassesIndexes" index="index"/></div>')($scope, function (cloned, scope) {
                        $e.append(cloned);
                    });
                }
            };
            compileChildren();

            $scope.$on('classes:update', function(event, $id){
                if ($scope.$id !== $id) {
                    $scope.childClassesIndexes = charClassService.getClassesIndexes($scope.model.id);
                    if ($e.find('.character-class-children').length === 0) {
                        compileChildren();
                    }
                }
            });

            $scope.$on('$destroy', function() {
                console.log('im destroyd', $scope.model.id);
                //var $parent = $e.parent('.character-class-children');
                //$e.remove();
                //if ($parent.children('.character-class-wrapper').length === 0) {
                //    $parent.remove();
                //}
            });

            //var droptarget;
            //$e.find('.position').on('mousedown', function(e) {
            //    var $characterClass = $(e.currentTarget).parents('.character-class');
            //    var $target = $(e.target).clone();
            //    $target.css('position', 'absolute');
            //    $target.css('pointer-events', 'none');
            //    $('body').append($target);
            //
            //    var tw = $target.width()/2;
            //    var th = $target.height()/2;
            //
            //    $document.on('mouseenter.class.position', '.character-class', function(e) {
            //        console.log('mouseenter', $characterClass, $(e.currentTarget));
            //        if (!$(e.currentTarget).is($characterClass)) {
            //            $(e.currentTarget).addClass('dropzone');
            //        }
            //    });
            //    $document.on('mouseleave.class.position', '.character-class', function(e){
            //        console.log('mouseleave', $(e.currentTarget));
            //        $(e.currentTarget).removeClass('dropzone');
            //    });
            //
            //    $document.on('mousemove.class.position', function(e){
            //        $target.css('left', event.x - tw);
            //        $target.css('top', event.y - th);
            //    });
            //    $document.on('mouseup.class.position', function(){
            //        $document.off('.class.position');
            //        var targetClass = $('.dropzone').attr('data-character-class');
            //        $('.dropzone').removeClass('dropzone');
            //        $target.remove();
            //
            //        if (targetClass) {
            //            $scope.model.parent = targetClass;
            //            $scope.$apply();
            //            $rootScope.$broadcast('classes:update', $scope.$id);
            //            $scope.$apply();
            //        }
            //    });
            //});

            $scope.add = function(){
                charClassService.addClass($scope.model);
            };

            $scope.remove = function(){
                if (!confirm('rly?')) return;
                charClassService.removeClass($scope.model);
            };

            $scope.edit = function($event) {
                var modalInstance = $modal.open({
                    animation: false,
                    templateUrl: 'directive/character-class/modal-class-edit.html',
                    resolve: {
                        model: function() {return $scope.model}
                    },
                    controller: 'ModalClassEditCtrl'
                });

                modalInstance.result.then(function(){
                    console.log('closed');
                },function(){
                    //$(".modal").modal("hide");
                    console.log('dismissed');
                });
            };

            //$scope.edit = function($event) {
            //    $event.preventDefault();
            //    $event.stopPropagation();
            //
            //    $scope.editing = true;
            //
            //    $scope.editModel = angular.extend({}, $scope.model);
            //    //$scope.editModel = $scope.model;
            //
            //    var listener = function(e) {
            //        var keyCode = (e.keyCode ? e.keyCode : e.which);
            //        if (
            //            (
            //                keyCode == 13
            //                || $(e.target).parents('.element').length === 0
            //            )
            //            && $e.find('input[ng-model*=".id"]').is('.ng-valid')
            //        ) {
            //            $document.off('click', listener);
            //            $document.off('keyup', listener);
            //            $scope.$apply(function() {
            //                $scope.editing = false;
            //                var oldIndex = $scope.index;
            //                $scope.index = $scope.editModel.id;
            //                charClassService.data[$scope.index] = $scope.editModel;
            //                $scope.model = charClassService.data[$scope.index];
            //                delete $scope.editModel;
            //                delete charClassService.data[oldIndex];
            //            });
            //        }
            //    };
            //
            //    $document.on('click', listener);
            //    $document.on('keyup', listener);
            //};
		}
	};
})
.controller('ModalClassEditCtrl', function($scope, $modalInstance, model){
        $scope.model = model;

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $(".modal").modal("hide");
            $modalInstance.dismiss('cancel');
        };
    });
