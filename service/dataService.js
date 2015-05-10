angular.module('AndProcRLData').service('dataService',function($rootScope) {
	var dataService = {
        name: 'dataService'
        , data: {}
        ,get defaultData() {
            return _.mapValues({
            }, function(e, id){
                e.id = id;
                return e;
            });
        }
        ,init: function(){
            dataService.load('data', dataService.defaultData);
            dataService.update();
        }
        ,load: function(key, defaultData) {
            var data = angular.fromJson(localStorage.getItem(key));
            if (!data) {
                data = defaultData;
            }
            return data;
        }
        ,save: function(key, value) {
            localStorage.setItem(key, angular.toJson(value));
        }
        ,flush: function(key) {
            localStorage.removeItem(key);
            dataService.init();
        }
        , update: function () {
            console.log('data:update')
            $rootScope.$broadcast('data:update');
        }
    };
    dataService.init();
    window.dataService = dataService;
	return dataService;
});
