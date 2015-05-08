angular.module('AndProcRLData').factory('dataService',function($rootScope) {
	var dataService = {
        data: {}
        ,get defaultData() {
            return  {
                classes: {
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
                    },
                    'Secret': {},
                    'SecretChild': {
                        parent: 'Secret'
                    }
                }
            };
        }
        ,init: function(){
            dataService.load('data', dataService.defaultData);
            dataService.update();
        }
        ,save: function(key, value) {
            dataService.data = value;
            localStorage.setItem(key, angular.toJson(value));
        }
        ,load: function(key, defaultData) {
            var data = angular.fromJson(localStorage.getItem(key));
            if (!data) {
                data = defaultData;
            }
            dataService.data = data;
            return data;
        }
        ,flush: function() {
            localStorage.removeItem('data');
            dataService.init();
        }
        ,update: function() {
            console.log('classes:update')
            $rootScope.$broadcast('classes:update');
            dataService.save('data', dataService.data);
        }
        ,getClassesIndexes: function(parent) {
            return _.reduce(dataService.data.classes, function(memo, e, id) {
                if (e.parent == parent) {
                    memo.push(id);
                }
                return memo;
            }, []);
        }
        ,getClasses: function(parent) {
            var _fn = (parent === void 0) ? _.reject : _.filter;
            console.log('asked for', parent, 'got', _fn(dataService.data.classes, 'parent', parent));
            return _fn(dataService.data.classes, 'parent', parent);
        }
        ,addClass: function(model) {
            if (_.some(dataService.data.classes, 'newClass')) {
                alert('dupe!');
                return;
            }
            dataService.data.classes['newClass'] = {
                parent: model.id
            };

            dataService.update();
        }
        ,removeClass: function(model) {
            //_.remove(dataService.data.classes, 'id', model.id);
            delete dataService.data.classes[model.id];

            dataService.update();
        }
    };
    dataService.init();
    window.dataService = dataService;
	return dataService;
});
