angular.module('AndProcRLData')
    .controller('HomeCtrl', function ($scope, dataService, charClassService, attributeService) {
        $scope.childClassesIndexes = charClassService.getClassesIndexes(undefined);

        $scope.attributes = dataService.data.attributes;
        $scope.traits = dataService.data.traits;
        $scope.links = [];

        _.each($scope.attributes, function(e, index){
            e.gfx.x = 100;
            e.gfx.y = 20 * (index + 1);
        });
        _.each($scope.traits, function(e, index){
            e.gfx.x = 200;
            e.gfx.y = 30 * (index + 1);
        });

        attributeService.refreshLinks();

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
