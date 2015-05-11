angular.module('AndProcRLData')
    .controller('HomeCtrl', function ($scope, dataService, charClassService, attributeService) {
        $scope.childClassesIndexes = charClassService.getClassesIndexes(undefined);

        $scope.attributes = dataService.data.attributes;
        $scope.traits = dataService.data.traits;
        $scope.links = [];

        _.each($scope.traits, function(trait, index){
            trait.gfx.x = 400;
            trait.gfx.y = 30 * (index + 1);
            $scope.$watch('traits['+index+'].formula', function(newValue) {
                if (newValue) {
                    trait.fn = makeFn(newValue);
                    try {
                        trait.value = trait.fn();
                    } catch (e) {
                        console.log('wrong!!!!!!!!!');
                    }
                }
            });
        });
        _.each($scope.attributes, function(e, index){
            e.gfx.x = 100;
            e.gfx.y = 30 * (index + 1);
            $scope.$watch('attributes['+index+'].value', function() {
                _.each($scope.traits, function(trait) {
                    try {
                        trait.value = trait.fn ? trait.fn() : 0;
                    } catch (e) {
                        console.log('wrong!!!!!!!!!');
                    }
                });
            });
        });

        function makeFn(formula) {
            _.each(dataService.data.attributes, function(attr, attrIndex) {
                formula = formula.replace(attr.id, '(+dataService.data.attributes['+attrIndex+'].value || 0)');
            });
            var fn;
            try {
                fn = eval('(function(){return ' + formula + ';})');
            } catch (err) {
            }
            return fn;
        }

        $scope.refreshLinks = function() {
            $scope.links = attributeService.refreshLinks();
        };
        $scope.refreshLinks();

        $scope.$watch('links', function(newValue) {
            _.each($scope.links, function(link){
                var line = linedraw(
                    $scope.attributes[link.from.index].gfx.x+200,
                    $scope.attributes[link.from.index].gfx.y,
                    $scope.traits[link.to.index].gfx.x,
                    $scope.traits[link.to.index].gfx.y
                );
                link.style = {
                    width: 1,
                    height: line.length,
                    'background-color': 'black',
                    position: 'absolute',
                    left: line.ax + 'px',
                    top: line.ay + 'px',
                    transform: 'rotate('+line.calc+'deg)',
                    'transform-origin': '0% 0%'
                };
                console.log(link.style);
            });
        });

        function linedraw(ax, ay, bx, by) {
            //if (ay > by) {
                var dx = ax - bx;
                var dy = ay - by;
            //}
            return {
                ax: ax,
                ay: ay,
                calc: Math.atan2(dy, dx) * 180 / Math.PI + 90,
                length: Math.sqrt(dx * dx + dy * dy)
                };
        }

        $scope.flush = function () {
            charClassService.flush();
            dataService.flush('data');
        };
    });
