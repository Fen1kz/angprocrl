angular.module('hero').factory('Hero',function(charClassService, CharClass, AttributeSet, TraitSet) {
    function Hero() {
        this.guid = _.uniqueId('hero_');
        this.$attributes = new AttributeSet();
        this.class('Adventurer');
        this.$traitSet = new TraitSet()
            .attributeSet(this.$attributes);

        this.$hp = this.traits('hp');
    }

    _.assign(Hero.prototype, {
        hp: function(change) {
            if (change === void 0) {
                return this.$hp.value()
            }
            this.$hp += change;
            return this.$hp;
        }
        ,class: function(newClass) {
            if (newClass == void 0) {
                return this.$class;
            } else if (newClass instanceof CharClass) {
                this.$setClass(newClass);
                return this;
            } else if (typeof newClass === 'string') {
                var _class = charClassService.$.byName(newClass);
                if (!_class) throw new Error("Hero::class(byName) error.");
                this.class(_class);
                return this;
            }
            throw new Error("Hero::class error");
        }
        ,$setClass: function(newClass) {
            if (!(newClass instanceof CharClass)) throw new Error("Hero::$setClass error.");
            if (this.$class) this.$class.attributes().$unlinkChild(this.$attributes);
            this.$class = newClass;
            this.$class.attributes().$linkChild(this.$attributes);
        }
        ,attributes: function() {
            if (arguments.length === 0) {
                return this.$attributes;
            } else {
                this.$attributes.fromArray(arguments);
                return this;
            }
            throw new Error("Hero::attributes error");
        }
        ,traits: function(name) {
            if (name === void 0) {
                return this.$traitSet;
            } else {
                return this.$traitSet.byName(name);
            }
        }
    });

	return Hero;
});
