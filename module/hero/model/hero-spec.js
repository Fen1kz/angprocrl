describe('hero TEST', function () {
    beforeEach(module('hero'));
    var class1;
    var class11;
    var class12;
    beforeEach(function () {
        inject(function (CharClass) {
            class1 = CharClass.add('class1');
            class11 = CharClass.add('class11', class1.id);
            class12 = CharClass.add('class12', class1.id);
        });
    });
    it('should have class!', inject(function (Hero) {
        expect(function(){new Hero(function(){})}).toThrowError(/Hero/)
        var hero1 = new Hero(class1);
        var hero2 = new Hero(class1)
            .class(class11);
        var hero3 = new Hero(class1)
            .class(class12);
        expect(hero1.class()).toBe(class1);
        expect(hero2.class()).toBe(class11);
        expect(hero3.class()).toBe(class12);
    }));

    it('should have attributes', inject(function(Hero) {
        var hero1 = new Hero(class1);
        var hero2 = new Hero(class1)
            .attributes(2,3,4,5,
                        6,7,8,9);
        var hero3 = new Hero(class1)
            .attributes(1,3,4,5);

        expect(hero1.attributes().STR.value()).toEqual(0);
        expect(hero2.attributes().STR.value()).toEqual(2);
        expect(hero2.attributes().WIZ.value()).toEqual(9);
        expect(hero3.attributes().STR.value()).toEqual(1);
        expect(hero3.attributes().WIZ.value()).toEqual(0);
    }));

    it('should have traits', inject(function(Hero) {
        var hero = new Hero(class1)
            .attributes(2,3,4,5,6,7,8,9);

        expect(hero.traits().byName('ATK').value()).toBeGreaterThan(2);
    }));

    it('should have class attributes', inject(function(Hero) {
        var hero = new Hero(class1);
        class1.attributes(1,2,3);
        class12.attributes(1,2,3);
        hero.attributes(1,2,3,1,1,1,1,1);

        expect(hero.attributes().byName('STR').value()).toBe(2);
        expect(hero.attributes().byName('AGI').value()).toBe(4);
        expect(hero.attributes().byName('VIT').value()).toBe(6);

        hero.class(class12);

        expect(hero.attributes().byName('STR').value()).toBe(3);
        expect(hero.attributes().byName('AGI').value()).toBe(6);
        expect(hero.attributes().byName('VIT').value()).toBe(9);
    }));

    it('should have hp', inject(function(Hero) {
        var fighter = class12;
        fighter.attributes().STR.value(15);

        var hero = new Hero(class1);
        expect(hero.maxHp()).toEqual(0);
        expect(hero.hp()).toEqual(0);
        expect(hero.hp(+5)).toEqual(0);
        expect(hero.hp(-3)).toEqual(0);

        hero.traits('hp').formula('STR');
        hero.class(fighter);
        expect(hero.maxHp()).toEqual(15);
        hero.hp(hero.maxHp());
        expect(hero.hp()).toEqual(15);
        expect(hero.hp(+5)).toEqual(15);
        expect(hero.hp(-3)).toEqual(12);
        expect(hero.hp(+1)).toEqual(13);
    }));

    it('should be able to equip weapons', inject(function(Hero) {
        var hero = new Hero(class1);
        //hero.equip(new Sword(3));
        //hero.attack(hero);
    }));
});
