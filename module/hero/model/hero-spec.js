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

    it('should have traits', inject(function(Hero) {
        var hero = new Hero()
            .attributes(2,3,4,5,6,7,8,9);

        expect(hero.traits().byName('ATK').value()).toBeGreaterThan(2);
    }));

    it('should have class attributes', inject(function(Hero, charClassService) {
        var adventurer = charClassService.$.byName('Adventurer');
        var fighter = charClassService.$.byName('Fighter');
        var hero = new Hero();
        adventurer.attributes(1,2,3);
        fighter.attributes(1,2,3);
        hero.attributes(1,2,3,1,1,1,1,1);

        expect(hero.attributes().byName('STR').value()).toBe(2);
        expect(hero.attributes().byName('AGI').value()).toBe(4);
        expect(hero.attributes().byName('VIT').value()).toBe(6);

        hero.class('Fighter');

        expect(hero.attributes().byName('STR').value()).toBe(3);
        expect(hero.attributes().byName('AGI').value()).toBe(6);
        expect(hero.attributes().byName('VIT').value()).toBe(9);
    }));

    it('should have hp', inject(function(Hero) {
        var hero = new Hero();
        expect(hero.hp()).toEqual(0);
    }));

    //it('should be able to equip weapons', inject(function(Hero) {
    //    var hero = new Hero();
    //    hero.equip(new Sword(3));
    //    hero.attack(hero);
    //}));

});
