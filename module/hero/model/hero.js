angular.module('hero').factory('Hero',function(CLASS) {
    function Hero() {
        this.guid = _.uniqueId('hero_');
        this._class = CLASS.Adventurer;
    }
    _.assign(Hero.prototype, {
        class: function(newClass) {
            if (newClass == void 0) {
                return this._class;
            } else if (newClass instanceof Class) {

            }
        }
    });

	return Hero;
});
