angular.module('AndProcRLData')
    //.controller('HomeCtrl', function ($scope, ClassAttribute, Attribute, dataService, charClassService, attributeService) {
    .controller('HomeCtrl', function ($scope, Hero, Trait, Attribute, AttributeSet, storageService, CharClass, charClassService, TraitSet) {
    //
    //var seeds = [
    //    {name: 'Fighter', parent: 'Adventurer'}
    //    ,{name: 'Adventurer'}
    //];
    //
    //    charClassService.import(seeds);
    //
    //    var hero = new Hero();
    //
    //
    //    window.char1 = new CharClass('char1').addById();
    //    window.child1 = new CharClass('child1').addById(char1.id);
    //    window.child2 = new CharClass('child2').addByName('char1');
    //


        var attributes1 = new AttributeSet(1, 2, 3);
        var attributes2 = new AttributeSet(4, 4, 4);
        var traits = new TraitSet();
        traits
            .addTrait(new Trait({
                name: 'HP',
                formula: 'STR'
            }));

        traits
            .attributeSet(attributes1)
            //.addTrait(new Trait({
            //    name: 'ATK',
            //    formula: '(STR + AGI + VIT) / 2'
            //}));

        //expect(traits.byName('HP').value()).toEqual(1);


        debugger;

        //STR1 = Attribute.STR.new();
        //STR2 = Attribute.STR.new();
        //STR3 = Attribute.STR.new();
        //STR1.$linkChild(STR2);
        //STR2.$linkChild(STR3);

    });
