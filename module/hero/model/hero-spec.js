describe('hero TEST', function () {
    beforeEach(module('hero'));
    beforeEach(function () {
        inject(function (charClassService) {
            charClassService.import([
                {name: 'Adventurer'}
                ,{name: 'Fighter', parent: 'Adventurer'}
                ,{name: 'Wizard', parent: 'Adventurer'}
            ]);
        });
    });
    it('should have class!', inject(function (Hero, charClassService) {
        var hero1 = new Hero();
        var hero2 = new Hero()
            .class(charClassService.$.byName('Fighter'));
        var hero3 = new Hero()
            .class('Wizard');
        expect(hero1.class()).toEqual(charClassService.$.byName('Adventurer'));
        expect(hero2.class()).toEqual(charClassService.$.byName('Fighter'));
        expect(hero3.class()).toEqual(charClassService.$.byName('Wizard'));

        hero3.class().name = "Wizerd";
        expect(charClassService.$.byName('Wizerd')).toBeDefined();
    }));

    it('should have attributes', inject(function(Hero) {
        var hero1 = new Hero();
        var hero2 = new Hero()
            .attributes(2,3,4,5,
                        6,7,8,9);
        var hero3 = new Hero()
            .attributes(1,3,4,5);

        expect(hero1.attributes().STR.value()).toEqual(0);
        expect(hero2.attributes().STR.value()).toEqual(2);
        expect(hero2.attributes().WIZ.value()).toEqual(9);
        expect(hero3.attributes().STR.value()).toEqual(1);
        expect(hero3.attributes().WIZ.value()).toEqual(0);
    }));

    //it('should have traits', inject(function(Hero, CLASS) {
    //    var hero1 = new Hero();
    //    var hero2 = new Hero()
    //        .attributes(2,3,4,5,
    //        6,7,8,9);
    //    var hero3 = new Hero()
    //        .attributes(1,3,4,5);
    //
    //    expect(hero1.attributes().STR).toEqual(0);
    //    expect(hero2.attributes().STR).toEqual(2);
    //    expect(hero2.attributes().WIZ).toEqual(9);
    //    expect(hero3.attributes().STR).toEqual(1);
    //    expect(hero3.attributes().WIZ).toEqual(0);
    //
    //    //    .class(Adventurer)
    //    //    .attributes(0,0,0,0,0,0,0)
    //    //    .equip(nwe Weapon(1d6))
    //    //.strike(hero1)
    //
    //    //strike = function(target){
    //    //    this.atk = this.getTrait(TRAITS.ATK);
    //    //}
    //    //
    //    //hero.getTrait(traitID){
    //    //
    //    //}
    //
    //    //expect(hero.doSomething()).toEqual('something');
    //
    //}));

});
