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
            attributeService.refreshLinks();
        };
        $scope.refreshLinks();


        //$scope.attributes[0].lnks.push({target: 'HP'});

        //_.each($scope.attributes, function(attr){
        //    _.each(attr.lnks, function(link){
        //        var target = _.find($scope.traits, 'id', link.target);
        //        link.x1 = attr.gfx.x+40;
        //        link.x2 = target.gfx.x-10;
        //        link.y1 = attr.gfx.y-5;
        //        link.y2 = target.gfx.y-5;
        //        $scope.links.push(link);
        //    });
        //});

        $scope.flush = function () {
            charClassService.flush();
            dataService.flush('data');
        };
    });
