angular.module('AndProcRLData').service('dataService',function($rootScope) {
	var dataService = {
        name: 'dataService'
        , data: {}
        ,get defaultData() {
            var defaultData = {};
            defaultData.attributes = _.map([
                {id:'STR'},
                {id:'AGI'},
                {id:'VIT'},
                {id:'CON'},
                {id:'LUK'},
                {id:'SPD'},
                {id:'INT'},
                {id:'WIZ'}
            ], function(e, id){
                if (!e.gfx) e.gfx = {};
                return e;
            });
            defaultData.traits = _.map([
                {id:'HP', formula: 'STR + VIT * 2'},
                {id:'ATK'},
                {id:'BLOCK'},
                {id:'DEF'},
                {id:'MVSPD'},
                {id:'HIT'},
                {id:'ATSPD'},
                {id:'CRIT'},
                {id:'EVA'},
                {id:'SPELL'},
                {id:'SIGHT'},
                {id:'MP'},
                {id:'SOCIO'},
                {id:'CRAFT'},
                {id:'SMTH1'},
                {id:'SMTH2'}
            ], function(e, id){
                if (!e.gfx) e.gfx = {};
                return e;
            });
            return defaultData;
        }
        ,init: function(){
            dataService.data = dataService.load('data', dataService.defaultData);
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
