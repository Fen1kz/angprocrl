angular.module('stats')
.constant('TRAIT_DATA', [
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
])
.factory('TraitsSet', function(TRAIT_DATA, Trait) {
	function TraitsSet() {
        this.$data = {};
        _.each(TRAIT_DATA, function(traitSeed, index){
            this.$data[traitSeed.id] = new Trait({
                index: index,
                formula: traitSeed.formula
            });
        });
    }

	return TraitsSet;
});
