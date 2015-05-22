angular.module('data').factory('storageService',function() {
	var storageService = {
        get data() {
            var data = {};
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
            data.seeds_classes = _.map([
                {name: 'Adventurer'},
                //'Shaman':{},
                {name: 'Fighter', parent: 'Adventurer'},
                  {name: 'Knight', parent: 'Fighter'},
                    {name: 'Baron', parent: 'Knight'},
                      {name: 'Lord', parent: 'Baron'},
                    {name: 'Crusader', parent: 'Knight'},
                      {name: 'Inquisitor', parent: 'Crusader'},
                      {name: 'Paladin', parent: 'Crusader'},
                    {name: 'Death Knight', parent: 'Knight'},
                      {name: 'Death Lord', parent: 'Death Knight'},
                  {name: 'Warrior', parent: 'Fighter'},
                    {name: 'Barbarian', parent: 'Warrior'},
                      {name: 'Berserker', parent: 'Barbarian'},
                    {name: 'Warlord', parent: 'Warrior'},
                      {name: 'Chieftain', parent: 'Warlord'},
                {name: 'Bandit', parent: 'Adventurer'},
                  {name: 'Rogue', parent: 'Bandit'},
                    {name: 'Ninja', parent: 'Rogue'},
                      {name: 'Shadow', parent: 'Ninja'},
                    {name: 'Killer', parent: 'Rogue'},
                      {name: 'Assassin', parent: 'Killer'},
                {name: 'Ranger', parent: 'Bandit'},
                  {name: 'Hunter', parent: 'Ranger'},
                    {name: 'Predator', parent: 'Hunter'},
                    {name: 'Druid', parent: 'Hunter'},
                  {name: 'Marksman', parent: 'Ranger'},
                    {name: 'Sniper', parent: 'Marksman'},
                    {name: 'Artillerist', parent: 'Marksman'},
                {name: 'Wizard', parent: 'Adventurer'},
                  {name: 'Sorcerer', parent: 'Wizard'},
                    {name: 'Mage', parent: 'Sorcerer'},
                      {name: 'Archmage', parent: 'Mage'},
                    {name: 'Necromancer', parent: 'Sorcerer'},
                      {name: 'Lich', parent: 'Necromancer'},
                    {name: 'Witch', parent: 'Sorcerer'},
                      {name: 'Warlock', parent: 'Witch'},
                  {name: 'Acolyte', parent: 'Wizard'},
                    {name: 'Monk', parent: 'Acolyte'},
                      {name: 'Fanatic', parent: 'Monk'},
                      {name: 'Exalted', parent: 'Monk'},
                    {name: 'Priest', parent: 'Acolyte'},
                      {name: 'Bishop', parent: 'Priest'}
            ]);
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
