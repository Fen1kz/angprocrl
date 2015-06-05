angular.module('stats')
.factory('Trait',function(ATTR_DATA) {
	function Trait(config) {
        config = _.defaults(config || {}, {
            name: 'trait',
            formula: void 0,
            index: 0
        });
        this.name = config.name.toLowerCase();
        this.$formula = config.formula;
        this.$index = config.index;

        this.id = _.uniqueId('Trait_');
        this.$fn = function () { return 0; };
        this.$traitSet = null;
    }

    _.assign(Trait.prototype, {
        value: function() {
            return this.$fn();
        }
        , refreshFormula: function() {
            return this.formula(this.formula());
        }
        , formula: function(newFormula) {
            if (newFormula === void 0) {
                return this.$formula;
            } else {
                this.$formula = newFormula;
                if (this.$traitSet.attributeSet()) this.$makeFn(this.$traitSet.attributeSet());
                else throw new Error("this.$traitSet in undefined");
                return this;
            }
        }
        , $makeFn: function (attributeSet) {
            var formula = this.formula();
            if (formula) {
                _.each(ATTR_DATA, function (attr) {
                    formula = formula.replace(attr.id, '(+attributeSet.$data["' + attr.id + '"].value())');
                    //formula = formula.replace(attr.id, '+attributes['+attrIndex+'].getValue()');
                });
                try {
                    this.$fn = eval('(function(){return ' + formula + ';})'); // jshint ignore:line
                } catch (e) {
                    console.debug('Wrong formula');
                    this.$fn = function () { return 0; }
                }
            } else {
                this.$fn = function () { return 0; }
            }
        }
    });

	return Trait;
});
