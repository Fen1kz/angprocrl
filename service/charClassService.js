angular.module('AndProcRLData').service('charClassService', function ($rootScope, dataService) {
    var service = {
        name: 'charClassService'
        , data: dataService.data.classes
        , update: function () {
            console.log('classes:update')
            $rootScope.$broadcast('classes:update');
        }

        , getClassesIndexes: function (parent) {
            console.log('getClassesIndexes called by ', parent);
            var a = _.reduce(service.data, function (memo, e, id) {
                if (e.parent == parent) {
                    memo.push(id);
                }
                return memo;
            }, []);
            return a;
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
    window.charClassService = service;
    return service;
});
