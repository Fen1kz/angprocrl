angular.module('stats')
.factory('Trait',function() {
	function Trait(config) {
        this.$fn = function () { return 0; };
        this.$formula = config.formula || '';
        this.$index = config.index || 0;
    }

    _.assign(Trait.prototype, {
        formula: function(newFormula) {
            if (newFormula === void 0) {
                return this.$formula;
            } else {
                this.$formula = newFormula;
                if (this.$attributeSetLink) this.$makeFn(this.$attributeSetLink);
            }
        }
        , $makeFn: function (attributeSet) {
            var formula = this.formula();
            if (formula) {
                _.forIn(attributeSet.$data, function (attr, attrID) {
                    formula = formula.replace(attr.id, '(+attributeSet.$data[' + attrID + '].value || 0)');
                    //formula = formula.replace(attr.id, '+attributes['+attrIndex+'].getValue()');
                });
                try {
                    this.$fn = eval('(function(attributeSet){return ' + formula + ';})'); // jshint ignore:line
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
