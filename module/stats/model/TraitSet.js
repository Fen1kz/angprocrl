angular.module('stats')
.constant('TRAIT_DATA', [
    {name: 'HP',    formula: 'VIT * 4 + STR * 2'},
    {name: 'MP',    formula: 'WIZ * 4 + CON * 2'},
    {name: 'ATK',   formula: 'STR + AGI'},
    {name: 'DEF',   formula: 'VIT + CON'},
    {name: 'BLOCK', formula: '(STR + CON) / 2'},
    {name: 'HIT',   formula: '(AGI + LUK) / 2'},
    {name: 'EVA',   formula: '(LUK + SPD) / 2'},
    {name: 'CRIT',  formula: '(LUK + INT) / 2'},
    {name: 'SPELL', formula: '(INT + WIZ) / 2'},
    {name: 'RES',   formula: 'VIT + AGI'},
    {name: 'MVSPD', formula: '((SPD - 1) * .66 + (AGI - 1) * .34) / 20'},
    {name: 'ATSPD', formula: '((SPD - 1) * .66 + (VIT - 1) * .34) / 10'},
    {name: 'SIGHT', formula: 'INT + WIZ'},
    {name: 'SOCIO', formula: '(WIZ + LUK) / 2'},
    {name: 'CRAFT', formula: '(INT + CON) / 2'},
    {name: 'SMTH1', formula: '(STR + SPD) / 2'}
])
.factory('TraitSet', function(TRAIT_DATA, Trait) {
	function TraitSet(custom) {
        this.$data = {};
        if (!custom) {
            _.each(TRAIT_DATA, function (traitSeed, index) {
                this.addTrait(new Trait({
                    name: traitSeed.name,
                    index: index,
                    formula: traitSeed.formula
                }));
            }, this);
        }
    }

    _.assign(TraitSet.prototype, {
        byId: function(id){
            return this.$data[id];
        }
        ,byName: function(name) {
            return _.find(this.$data, 'name', name);
        }
        ,attributeSet: function(attributeSet) {
            if (attributeSet === void 0) {
                return this.$attributeSet;
            } else {
                this.$attributeSet = attributeSet;
                _.forIn(this.$data, function (trait) {
                    trait.refreshFormula();
                }, this);
                return this;
            }
        }
        ,addTrait: function(trait) {
            if (this.byName(trait.name)) throw new Error("TraitSet::duplicate");
            trait.$traitSet = this;
            this.$data[trait.id] = trait;
            if (this.$attributeSet) trait.refreshFormula();
            return this;
        }
    });

	return TraitSet;
});
