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
                {id: 'STR', color:'#F00', value:1},
                {id: 'AGI', color:'#0F0', value:1},
                {id: 'VIT', color:'#0FF', value:1},
                {id: 'CON', color:'#080', value:1},
                {id: 'LUK', color:'#A0A', value:1},
                {id: 'SPD', color:'#000', value:1},
                {id: 'INT', color:'#00F', value:1},
                {id: 'WIZ', color:'#F90', value:1}
            ], function (e, id) {
                if (!e.gfx) e.gfx = {};
                return e;
            });
            data.traits = _.map([
                {id: 'HP',    formula: 'VIT * 4 + STR * 2'},
                {id: 'MP',    formula: 'WIZ * 4 + CON * 2'},
                {id: 'ATK',   formula: 'STR + AGI'},
                {id: 'DEF',   formula: 'VIT + CON'},
                {id: 'BLOCK', formula: '(STR + CON) / 2'},
                {id: 'HIT',   formula: '(AGI + LUK) / 2'},
                {id: 'EVA',   formula: '(LUK + SPD) / 2'},
                {id: 'CRIT',  formula: '(LUK + INT) / 2'},
                {id: 'SPELL', formula: '(INT + WIZ) / 2'},
                {id: 'RES',   formula: 'VIT + AGI'},
                {id: 'MVSPD', formula: '((SPD - 1) * .66 + (AGI - 1) * .34) / 20'},
                {id: 'ATSPD', formula: '((SPD - 1) * .66 + (VIT - 1) * .34) / 10'},
                {id: 'SIGHT', formula: 'INT + WIZ'},
                {id: 'SOCIO', formula: '(WIZ + LUK) / 2'},
                {id: 'CRAFT', formula: '(INT + CON) / 2'},
                {id: 'SMTH1', formula: '(STR + SPD) / 2'}
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
