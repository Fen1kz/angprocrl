angular.module('hero').factory('Hero',function(charClassService, CharClass, AttributeSet) {
    function Hero() {
        this.guid = _.uniqueId('hero_');
        this.class('Adventurer');
        this._attributes = new AttributeSet();
    }

    _.assign(Hero.prototype, {
        class: function(newClass) {
            if (newClass == void 0) {
                return this._class;
            } else if (newClass instanceof CharClass) {
                this._class = newClass;
                return this;
            } else if (typeof newClass === 'string') {
                var _class = charClassService.$.byName(newClass);
                if (!_class) throw new Error("Hero::class(byName) error.");
                this._class = _class;
                return this;
            }
            throw new Error("Hero::class error");
        }
        ,attributes: function() {
            if (arguments.length === 0) {
                return this._attributes;
            } else {
                this._attributes.$apply(arguments);
                return this;
            }
            throw new Error("Hero::attributes error");
        }
    });

	return Hero;
});
