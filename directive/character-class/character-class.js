angular.module('AndProcRLData')
.directive('characterClass', function($rootScope,
                                      $document, $timeout, $compile,
                                      dataService, charClassService,
                                      $modal, $templateCache, $templateRequest) {
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

            $scope.$watch('model.parent', function(newValue, oldValue) {
                $scope.parent = charClassService.findClassById($scope.model.parent);
            });
            $scope.$watch('model.id', function(newValue, oldValue) {
                _.each($scope.classes, function(e){
                    if (e.parent === oldValue) {
                        e.parent = newValue;
                    }
                });
            });
            $scope.$watch('parent.attributes', function(newValue) {
                if ($scope.parent) {
                    _.each($scope.model.attributes, function (attr, i) {
                        $scope.model.attributes[i].base = 0 + (+newValue[i].base || 0) + (+newValue[i].value || 0);
                    });
                }
            }, true);
            $scope.$watch('model.attributes', function(newAttributes) {
                $scope._attributes_diff = _.reduce(newAttributes, function(memo, attr){
                    return memo + (+attr.value || 0);
                }, 0)
            }, true);

            /*
             ===== Setup jQuery =====
             */

            //$scope.$evalAsync(function(){
            $timeout(function(){
                var p = $e.popover({
                    content: $scope.model.id
                    //,trigger: 'hover'
                    ,trigger: 'manual'
                    ,container: 'body'
                    //,container: '#child-class-container'
                });
                p.popover('show')
            }, 200);

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

            $scope.$on('$destroy', function() {
                console.log('im destroyd', $scope.model.id);
                var $parent = $e.parent('.character-class-children');
                $e.remove();
                if ($parent.children('.character-class-wrapper').length === 0) {
                    $parent.remove();
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
            //if ($scope.model.id === 'Fighter') {
            //    $scope.edit();
            //}
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

        /*
         ===== Buttons =====
         */

        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $(".modal").modal("hide");
            $modalInstance.dismiss('cancel');
        };

        /*
         ===== Drag And Drop =====
         */

        $scope.$on('$destroy', function(){
            $('.character-class-form').find('.select-parent').off('.dnd');
            $(parentsSelector).off('.dnd');
        });

        var parentsSelector = '.character-class > .element';
        $timeout(function(){
            var $parentsAll = $(parentsSelector);

            var $parents = $parentsAll.filter(function (i, e) {
                return _.indexOf($scope.parentClasses, $(e).attr('data-character-class')) > -1;
            });

            $parents.on('drop.dnd', function (e) {
                e.preventDefault();
                e.stopPropagation();

                var targetClass = $(e.target).attr('data-character-class');
                $scope.model.parent = targetClass;
                $scope.$apply();
                return false;
            });

            $parents.on('dragenter.dnd', function (e) {
                e.preventDefault();
                e.stopPropagation();
                ///e.originalEvent.dataTransfer.dropEffect = "move";
                this.classList.add('over');
            });

            $parents.on('dragover.dnd', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });

            $parents.on('dragleave.dnd', function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.classList.remove('over');
            });

            var $element = $('.character-class-form').find('.select-parent');
            $element.on('dragstart.dnd', function (e) {
                e.originalEvent.dataTransfer.effectAllowed = 'move';
                e.originalEvent.dataTransfer.dropEffect = "move";
                $timeout(function () {
                    $('.modal').css('visibility', 'hidden');
                    $('.modal-backdrop').css('visibility', 'hidden');
                });
            });
            $element.on('dragend.dnd', function () {
                $timeout(function () {
                    $('.modal').css('visibility', 'visible');
                    $('.modal-backdrop').css('visibility', 'visible');
                });
                $parents.removeClass('over');
            });
        });
    });
