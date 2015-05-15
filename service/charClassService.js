angular.module('AndProcRLData').service('charClassService', function ($rootScope, $window, dataService) {
    var service = {
        name: 'charClassService'
        , data: dataService.data.classes
        , update: function () {
            console.log('classes:update')
            $rootScope.$broadcast('classes:update');
        }

        , getClassesIndexes: function (parent) {
            var a = _.reduce(service.data, function (memo, e, index) {
                if (e.parent == parent) {
                    memo.push(index);
                }
                return memo;
            }, []);
            return a;
        }
        , addClass: function (model) {
            if (_.some(service.data, 'id', 'newClass')) {
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
        , findClassIndexById: function(id){
            return _.findIndex(service.data, function(e) {return e.id === id;});
        }
        , findClassById: function(id){
            return (service.data[service.findClassIndexById(id)]);
        }
    };
    window.charClassService = service;
    return service;
});
