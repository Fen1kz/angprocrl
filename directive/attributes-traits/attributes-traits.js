angular.module('AndProcRLData').directive('attributesTraits', function($timeout, OnRepeatEvents, dataService, attributeService) {
	return {
		restrict: 'E',
		replace: true,
		scope: {

		},
		templateUrl: 'directive/attributes-traits/attributes-traits.html',
		link: function($scope, element, attrs, fn) {
            $scope.attributes = dataService.data.attributes;
            $scope.traits = dataService.data.traits;
            $scope.links = [];

            var attrsx = 0;
            var attrs_width = 100;
            var traitsx = 200;
            var stepy = 40;

            _.each($scope.traits, function(trait, index){
                trait.gfx.x = traitsx;
                trait.gfx.y = stepy * index;
                $scope.$watch('traits['+index+'].formula', function(formula) {
                    console.log('formula watch');
                    if (formula) {
                        _.each($scope.attributes, function(attr, attrIndex) {
                            formula = formula.replace(attr.id, '(+attributes['+attrIndex+'].value || 0)');
                        });
                        try {
                            trait.fn = eval('(function(attributes){return (+this.base || 0) +' + formula + ';})');
                            trait.value = trait.fn($scope.attributes);
                        } catch (e) {
                            //console.log('Wrong formula');
                        }
                        $scope.refreshLinks();
                    }
                });
            });

            _.each($scope.attributes, function(e, index){
                e.gfx.x = attrsx;
                e.gfx.y = stepy * index;
            });

            //$scope.$on(OnRepeatEvents.LAST, function(event, element, attrs){
            //$scope.$evalAsync(function(event, element, attrs){
            $timeout(function(){
                $scope.$watch('links', function(newValue) {
                    _.each($scope.links, function(link) {
                        var attr = $scope.attributes[link.from.index];
                        var $attr = $('[data-attr="'+attr.id+'"]');
                        var trait =  $scope.traits[link.to.index];
                        var $trait =  $('[data-trait="'+trait.id+'"]');
                        var ax = attr.gfx.x + $attr.outerWidth() + 5,
                            ay = attr.gfx.y + $attr.outerHeight() / 2,
                            bx = trait.gfx.x,
                            by = trait.gfx.y + $trait.outerHeight() / 2,
                            dx = ax - bx,
                            dy = ay - by,
                            angle = Math.atan2(dy, dx) * 180 / Math.PI + 90,
                            length = Math.sqrt(dx * dx + dy * dy);

                        link.style = {
                            width: 1,
                            height: length,
                            'background-color': 'black',
                            position: 'absolute',
                            left: ax + 'px',
                            top: ay + 'px',
                            transform: 'rotate('+angle+'deg)',
                            'transform-origin': '0% 0%'
                        };
                    });
                });
            });

            $scope.refreshLinks = function() {
                $scope.links = attributeService.refreshLinks();
            };
            $scope.refreshLinks();
		}
	};
});
