angular.module('AndProcRLData').factory('storageService',function() {
	var storageService = {
        get data() {
            var data = {};
            data.classes = _.mapValues({
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
            data.attributes = _.map([
                {id: 'STR'},
                {id: 'AGI'},
                {id: 'VIT'},
                {id: 'CON'},
                {id: 'LUK'},
                {id: 'SPD'},
                {id: 'INT'},
                {id: 'WIZ'}
            ], function (e, id) {
                if (!e.gfx) e.gfx = {};
                return e;
            });
            data.traits = _.map([
                {id: 'HP', formula: 'STR + VIT * 2'},
                {id: 'ATK'},
                {id: 'BLOCK'},
                {id: 'DEF'},
                {id: 'MVSPD'},
                {id: 'HIT'},
                {id: 'ATSPD'},
                {id: 'CRIT'},
                {id: 'EVA'},
                {id: 'SPELL'},
                {id: 'SIGHT'},
                {id: 'MP'},
                {id: 'SOCIO'},
                {id: 'CRAFT'},
                {id: 'SMTH1'},
                {id: 'SMTH2'}
            ], function (e, id) {
                if (!e.gfx) e.gfx = {};
                return e;
            });
            return data;
        }
        , load: function (key, defaultData) {
            var data = angular.fromJson(localStorage.getItem(key));
            if (!data) {
                data = defaultData;
            }
            return data;
        }
        , save: function (key, value) {
            localStorage.setItem(key, value);
        }
        , remove: function (key) {
            localStorage.removeItem(key);
        }
    };

	return storageService;
});
