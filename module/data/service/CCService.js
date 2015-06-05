angular.module('data')
.service('charClassService', function ($rootScope, $window, dataService,
                                       charClassSet, CharClass) {
    var recursiveImport = function(seed) {
    };
    var service = {
        $: charClassSet
        ,start: function() {
            this.import(dataService.data.seeds_classes);
        }
        , flush: function() {
            charClassSet.flush();
        }
        , import: function(seeds) {
            this.flush();
            console.log('imported')

            for (var i = 50; i > 0 && seeds.length > 0; --i) {
                seeds = _.filter(seeds, function (seed){
                    if (!seed.parent || charClassSet.byName(seed.parent)) {
                        new CharClass(seed.name)
                            .addByName(seed.parent);
                        return false;
                    }
                    return true;
                }, this);
            }
            if (seeds.length > 0) throw new Error("Invalid seed, not all matched", "charClassService");

            service.update();
        }
        , export: function(seedArray) {
            //_.each(seedArray, function (){
            //
            //})
        }
        , update: function () {
            console.log('classes:update')
            $rootScope.$broadcast('classes:update');
        }
    };

    //service.start();
    window.charClassService = service;
    return service;
});
