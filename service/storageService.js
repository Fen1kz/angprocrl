angular.module('AndProcRLData').factory('storageService',function() {
	var storageService = {
        get data() {
            var data = {};
            data.classes = _.mapValues({
                'Adventurer': {},
                //'Shaman':{},
                'Fighter': {parent: 'Adventurer'},
                  'Knight': {parent: 'Fighter'},
                    'Baron': {parent: 'Knight'},
                      'Lord': {parent: 'Baron'},
                    'Crusader': {parent: 'Knight'},
                      'Inquisitor': {parent: 'Crusader'},
                      'Paladin': {parent: 'Crusader'},
                    'Death Knight': {parent: 'Knight'},
                      'Death Lord': {parent: 'Death Knight'},
                  'Warrior': {parent: 'Fighter'},
                    'Barbarian': {parent: 'Warrior'},
                      'Berserker': {parent: 'Barbarian'},
                    'Warlord': {parent: 'Warrior'},
                      'Chieftain': {parent: 'Warlord'},
                'Bandit': {parent: 'Adventurer'},
                  'Rogue': {parent: 'Bandit'},
                    'Ninja': {parent: 'Rogue'},
                      'Shadow': {parent: 'Ninja'},
                    'Killer': {parent: 'Rogue'},
                      'Assassin': {parent: 'Killer'},
                'Ranger': {parent: 'Bandit'},
                  'Hunter': {parent: 'Ranger'},
                    'Predator': {parent: 'Hunter'},
                    'Druid': {parent: 'Hunter'},
                  'Marksman': {parent: 'Ranger'},
                    'Sniper': {parent: 'Marksman'},
                    'Artillerist': {parent: 'Marksman'},
                'Wizard': {parent: 'Adventurer'},
                  'Sorcerer': {parent: 'Wizard'},
                    'Mage': {parent: 'Sorcerer'},
                      'Archmage': {parent: 'Mage'},
                    'Necromancer': {parent: 'Sorcerer'},
                      'Lich': {parent: 'Necromancer'},
                    'Witch': {parent: 'Sorcerer'},
                      'Warlock': {parent: 'Witch'},
                  'Acolyte': {parent: 'Wizard'},
                    'Monk': {parent: 'Acolyte'},
                      'Fanatic': {parent: 'Monk'},
                      'Exalted': {parent: 'Monk'},
                    'Priest': {parent: 'Acolyte'},
                      'Bishop': {parent: 'Priest'}
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
