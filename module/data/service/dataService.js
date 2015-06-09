angular.module('data')
    .run(function(dataService){
        dataService.init();
    })
    .service('dataService', function ($rootScope, storageService) {
    var DB_VERSION = 'data2';

    var dataService = {
        name: 'dataService'
        , data: {}
        , init: function () {
            dataService.load();
            dataService.update();
        }
        , load: function () {
            dataService.data = storageService.load(DB_VERSION, angular.extend({}, storageService.data));
        }
        , save: function () {
            storageService.save(DB_VERSION, angular.toJson(dataService.data));
        }
        , flush: function () {
            storageService.remove(DB_VERSION);
            dataService.init();
        }
        , update: function () {
            console.log('data:update');
            $rootScope.$broadcast('data:update');
        }
    };
    window.dataService = dataService;
    return dataService;
});
