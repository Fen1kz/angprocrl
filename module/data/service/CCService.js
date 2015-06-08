angular.module('data')
.run(function(CCService){
        //console.log('run phase')
        CCService.importData([
            {name: 'Fighter', parent: 'Adventurer'}
            ,{name: 'Adventurer'}
        ]);
    //CCService.start();
})
.service('CCService', function ($rootScope, $window, dataService,
                                       charClassSet, CharClass) {
    var recursiveImport = function(seed) {
    };
    var service = {
        $: charClassSet
        ,get data () {
            return this.$.$data;
        }
        , start: function() {
            this.importData(dataService.data.seeds_classes);
        }
        , flush: function() {
            charClassSet.flush();
        }
        , update: function () {
            console.log('classes:update')
            $rootScope.$broadcast('classes:update');
        }
        , importData: function(seeds) {
            this.flush();
            console.debug('imported')

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
            if (seeds.length > 0) throw new Error("Invalid seed, not all matched", "CCService");

            service.update();
        }
        , exportData: function(seedArray) {
            //_.each(seedArray, function (){
            //
            //})
        }
    };
    window.CCService = service;
    return service;
});
