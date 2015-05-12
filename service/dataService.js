angular.module('AndProcRLData').service('dataService', function ($rootScope, storageService) {
    var dataService = {
        name: 'dataService'
        , data: {}
        , init: function () {
            dataService.load();
            dataService.update();
        }
        , load: function () {
            dataService.data = storageService.load('data', angular.extend({}, storageService.data));
        }
        , save: function () {
            storageService.save('data', angular.toJson(dataService.data));
        }
        , flush: function () {
            storageService.remove('data');
            dataService.init();
        }
        , update: function () {
            console.log('data:update');
            $rootScope.$broadcast('data:update');
        }
    };
    dataService.init();
    window.dataService = dataService;
    return dataService;
});
