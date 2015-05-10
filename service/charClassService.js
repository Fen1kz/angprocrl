angular.module('AndProcRLData').service('charClassService', function ($rootScope, dataService) {
    var service = {
        name: 'charClassService'
        , data: {}
        , get defaultData() {
            return _.mapValues({
                'Adventurer': {
                    req: null
                },
                'Fighter': {
                    parent: 'Adventurer'
                },
                'Bandit': {
                    parent: 'Adventurer'
                },
                'Rogue': {
                    parent: 'Bandit'
                },
                'Ranger': {
                    parent: 'Bandit'
                }
            }, function (e, id) {
                e.id = id;
                return e;
            });
        }
        , init: function () {
            service.load();
            service.update();
        }
        , load: function () {
            service.data = dataService.load('classes', service.defaultData);
        }
        , save: function () {
            dataService.save('classes', service.data);
        }
        , flush: function () {
            dataService.flush('classes');
            service.init();
        }
        , update: function () {
            console.log('classes:update')
            $rootScope.$broadcast('classes:update');
        }

        , getClassesIndexes: function (parent) {
            console.log('getClassesIndexes called by ', parent);
            return _.reduce(service.data, function (memo, e, id) {
                if (e.parent == parent) {
                    memo.push(id);
                }
                return memo;
            }, []);
        }
        , addClass: function (model) {
            if (_.some(_.keys(service.data), 'newClass')) {
                alert('dupe!');
                return;
            }
            service.data['newClass'] = {
                parent: model.id
            };

            service.update();
        }
        , removeClass: function (model) {
            delete service.data[model.id];

            service.update();
        }
    };
    service.init();
    window.charClassService = service;
    return service;
});
