angular.module('AndProcRLData').factory('storageService',function() {
	var storageService = {
        get data() {
            var data = {};
            data.classes = _.map([
                {id: 'Adventurer'},
                //'Shaman':{},
                {id: 'Fighter', parent: 'Adventurer'},
                  {id: 'Knight', parent: 'Fighter'},
                    {id: 'Baron', parent: 'Knight'},
                      {id: 'Lord', parent: 'Baron'},
                    {id: 'Crusader', parent: 'Knight'},
                      {id: 'Inquisitor', parent: 'Crusader'},
                      {id: 'Paladin', parent: 'Crusader'},
                    {id: 'Death Knight', parent: 'Knight'},
                      {id: 'Death Lord', parent: 'Death Knight'},
                  {id: 'Warrior', parent: 'Fighter'},
                    {id: 'Barbarian', parent: 'Warrior'},
                      {id: 'Berserker', parent: 'Barbarian'},
                    {id: 'Warlord', parent: 'Warrior'},
                      {id: 'Chieftain', parent: 'Warlord'},
                {id: 'Bandit', parent: 'Adventurer'},
                  {id: 'Rogue', parent: 'Bandit'},
                    {id: 'Ninja', parent: 'Rogue'},
                      {id: 'Shadow', parent: 'Ninja'},
                    {id: 'Killer', parent: 'Rogue'},
                      {id: 'Assassin', parent: 'Killer'},
                {id: 'Ranger', parent: 'Bandit'},
                  {id: 'Hunter', parent: 'Ranger'},
                    {id: 'Predator', parent: 'Hunter'},
                    {id: 'Druid', parent: 'Hunter'},
                  {id: 'Marksman', parent: 'Ranger'},
                    {id: 'Sniper', parent: 'Marksman'},
                    {id: 'Artillerist', parent: 'Marksman'},
                {id: 'Wizard', parent: 'Adventurer'},
                  {id: 'Sorcerer', parent: 'Wizard'},
                    {id: 'Mage', parent: 'Sorcerer'},
                      {id: 'Archmage', parent: 'Mage'},
                    {id: 'Necromancer', parent: 'Sorcerer'},
                      {id: 'Lich', parent: 'Necromancer'},
                    {id: 'Witch', parent: 'Sorcerer'},
                      {id: 'Warlock', parent: 'Witch'},
                  {id: 'Acolyte', parent: 'Wizard'},
                    {id: 'Monk', parent: 'Acolyte'},
                      {id: 'Fanatic', parent: 'Monk'},
                      {id: 'Exalted', parent: 'Monk'},
                    {id: 'Priest', parent: 'Acolyte'},
                      {id: 'Bishop', parent: 'Priest'}
            ], function (e, id) {
                //e.id = id;
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
