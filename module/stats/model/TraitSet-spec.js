describe('TraitsSet', function () {

    beforeEach(module('stats'));

    it('should not duplicate', inject(function (Trait, TraitSet) {
        var traits = new TraitSet();
        expect(function(){traits.addTrait(new Trait({name: 'HP'}))}).toThrow(new Error("TraitSet::duplicate"));
    }));
    it('should get things done', inject(function (AttributeSet, Trait, TraitSet) {
        var attributes1 = new AttributeSet(1, 2, 3);
        var attributes2 = new AttributeSet(4, 4, 4);
        var traits = new TraitSet(true);
        traits
            .addTrait(new Trait({
                name: 'HP',
                formula: 'STR'
            }));

        expect(traits.byName('HP').value()).toEqual(0);

        traits
            .attributeSet(attributes1)
            .addTrait(new Trait({
                name: 'ATK',
                formula: '(STR + AGI + VIT) / 2'
            }));

        expect(traits.byName('HP').value()).toEqual(1);
        expect(traits.byName('ATK').value()).toEqual(3);

        traits
            .attributeSet(attributes2);

        expect(traits.byName('HP').value()).toEqual(4);
        expect(traits.byName('ATK').value()).toEqual(6);


    }));

});
