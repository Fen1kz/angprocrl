angular.module('hero').factory('Hero',function() {
    function Hero() {
        this.guid = _.uniqueId('hero_');
        this.charClass = 'Adventurer';
    }

	return Hero;
});
