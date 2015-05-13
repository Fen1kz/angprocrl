angular.module('AndProcRLData')
.directive('characterClass', function($rootScope, $document, $compile, dataService, charClassService, $modal, $templateCache, $templateRequest) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
            model: '=',
            siblings: '=',
            classes: '='
            //index: '='
		},
		templateUrl: 'directive/character-class/character-class.html',
		link: function($scope, $e, attrs, fn) {

            /*
            ===== Initial Scope Setup =====
            */

            $scope.parentFilter = function(item) {
                return item.parent === $scope.model.id;
            };

            /*
             ===== Compiling Children Leafs =====
             */

            $scope.compileChildren = function() {
                if (charClassService.getClassesIndexes($scope.model.id).length > 0) {
                    $compile(template)($scope, function (cloned, scope) {
                        $e.append(cloned);
                    });
                }
            };
            var template = $templateCache.get('directive/character-class/character-class-children.html');
            if (!template) {
                $templateRequest('directive/character-class/character-class-children.html')
                    .then(function () {
                        template = $templateCache.get('directive/character-class/character-class-children.html');
                        $scope.compileChildren();
                    });
            } else {
                $scope.compileChildren();
            }

            /*
             ===== Setup Watchers =====
             */

            $scope.$watch('model.id', function(newValue, oldValue) {
                _.each($scope.classes, function(e){
                    if (e.parent === oldValue) {
                        e.parent = newValue;
                    }
                });
            });

            /*
             ===== Setup Events =====
             */

            $scope.$on('classes:update', function(event, $id){
                if ($scope.$id !== $id) {
                    if ($e.find('.character-class-children').length === 0) {
                        $scope.compileChildren();
                    }
                }
            });

            /*
             ===== Setup Interaction =====
             */

            $scope.add = function(){
                charClassService.addClass($scope.model);
            };

            $scope.remove = function(){
                if (!confirm('rly?')) return;
                charClassService.removeClass($scope.model);
            };

            $scope.edit = function() {
                var modalInstance = $modal.open({
                    animation: false,
                    templateUrl: 'directive/character-class/modal-class-edit.html',
                    resolve: {
                        model: function() {return $scope.model},
                        data: function() {
                            return {
                                classes: $scope.classes,
                                attributes: dataService.attributes,
                                traits: dataService.traits
                            };
                        }
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
            if ($scope.model.id === 'Fighter') {
                $scope.edit();
            }

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
            //                $scope.classes[$scope.index] = $scope.editModel;
            //                $scope.model = $scope.classes[$scope.index];
            //                delete $scope.editModel;
            //                delete $scope.classes[oldIndex];
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
.controller('ModalClassEditCtrl', function($rootScope, $scope, $modal, $modalInstance, model, data, $timeout){
        $scope.model = model;
        $scope.data = data;
        $scope.$modal = $modal;

        $scope.parentClasses = [];
        var roots = _.filter($scope.data.classes, function(e){return e.parent === void 0;});
        var findParentClasses = function(parents) {
            _.each(parents, function(parent){
                if (parent.id !== $scope.model.id) {
                    $scope.parentClasses.push(parent.id);
                    findParentClasses(_.filter($scope.data.classes, 'parent', parent.id));
                }
            });
        };
        findParentClasses(roots);

        $scope.$watch('model.parent', function(){
            $rootScope.$broadcast('classes:update');
        });

        //$scope.noChildFilter = function(item) {
        //
        //    return item.parent === $scope.model.id;
        //};

        $timeout(function(){
            var element = $('.character-class-form').find('.select-parent')[0];
            element.addEventListener('dragstart', function(e){
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text/html', this.innerHTML);
                debugger;
                    $('.modal').css('display', 'none');
                    $('.modal-backdrop').css('display', 'none');
            });
            //element.addEventListener('dragend', function(){
            //        $('.modal').css('display', 'block');
            //        $('.modal-backdrop').css('display', 'block');
            //});
        });

        //$scope.selectParent = function(){
        //    $('.modal').css('display', 'none');
        //    $('.modal-backdrop').css('display', 'none');
        //};

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $(".modal").modal("hide");
            $modalInstance.dismiss('cancel');
        };
    });
