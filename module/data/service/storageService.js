angular.module('data').factory('storageService',function() {
	var storageService = {
        get data() {
            var data = {};
            data.seeds_classes = [
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
            ];
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
