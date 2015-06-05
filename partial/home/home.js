angular.module('AndProcRLData')
    //.controller('HomeCtrl', function ($scope, ClassAttribute, Attribute, dataService, charClassService, attributeService) {
    .controller('HomeCtrl', function ($scope, Hero, Trait, Attribute, AttributeSet, storageService, CharClass, charClassService, TraitSet) {

        var seeds = [
            {name: 'Fighter', parent: 'Adventurer'}
            ,{name: 'Adventurer'}
        ];

        charClassService.import(seeds);


        //window.char1 = new CharClass('char1').addById();
        //window.child1 = new CharClass('child1').addById(char1.id);
        //window.child2 = new CharClass('child2').addByName('char1');

        //charClassService.import([
        //    {name: 'Adventurer'}
        //    ,{name: 'Fighter', parent: 'Adventurer'}
        //    ,{name: 'Wizard', parent: 'Adventurer'}
        //]);
        //
        //adventurer = charClassService.$.byName('Adventurer');
        //fighter = charClassService.$.byName('Fighter');
        //hero = new Hero();
        //adventurer.attributes(1,2,3);
        //fighter.attributes(1,2,3);
        //hero.attributes(1,2,3,1,1,1,1,1);

        hero = new Hero();


        //debugger;

    });
