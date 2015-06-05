angular.module('AndProcRLData')
    //.controller('HomeCtrl', function ($scope, ClassAttribute, Attribute, dataService, CCService, attributeService) {
    .controller('HomeCtrl', function ($scope, Hero, Trait, Attribute, AttributeSet, storageService, CharClass, CCService, TraitSet) {

        var seeds = [
            {name: 'Fighter', parent: 'Adventurer'}
            ,{name: 'Adventurer'}
        ];

        CCService.import(seeds);


        //window.char1 = new CharClass('char1').addById();
        //window.child1 = new CharClass('child1').addById(char1.id);
        //window.child2 = new CharClass('child2').addByName('char1');

        //CCService.import([
        //    {name: 'Adventurer'}
        //    ,{name: 'Fighter', parent: 'Adventurer'}
        //    ,{name: 'Wizard', parent: 'Adventurer'}
        //]);
        //
        //adventurer = CCService.$.byName('Adventurer');
        //fighter = CCService.$.byName('Fighter');
        //hero = new Hero();
        //adventurer.attributes(1,2,3);
        //fighter.attributes(1,2,3);
        //hero.attributes(1,2,3,1,1,1,1,1);

        hero = new Hero();


        //debugger;

    });
