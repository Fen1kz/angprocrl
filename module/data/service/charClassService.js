angular.module('AndProcRLData').service('charClassService', function ($rootScope, $window, dataService, CharClass) {
    var service = {
        start: function() {
            this.import(dataService.data.seeds_classes);
        }
        , flush: function() {
            this.$data = {}
            this.cls = {}
        }
        , import: function(seeds) {
            this.flush();
            var seedArray = _.copy(seeds);

            _.each(seedArray, function (seed){
                service.addClass(new CharClass(seed.name, seed.parent));
            }, this)

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
        , getClassesIndexes: function (parent) {
            var a = _.reduce(service.$data, function (memo, e, index) {
                if (e.parent == parent) {
                    memo.push(index);
                }
                return memo;
            }, []);
            return a;
        }
        , getById: function(id){
            return service.$data[id];
        }
        , addClass: function (model) {
            service.$data[model.id] = model;
            Object.defineProperty(service.cls, model.name, {
                get: function() {
                    return model;
                }
            });
        }
        , removeClass: function (model) {
            delete service.$data[model.id];
        }
    };

    service.start();
    window.charClassService = service;
    return service;
});
