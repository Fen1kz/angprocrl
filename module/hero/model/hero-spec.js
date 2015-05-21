describe('hero', function() {

  beforeEach(module('hero'));

  it('should have defaults!', inject(function(Hero) {
      var hero = new Hero();
      expect(hero.class()).toEqual(CLASS.Adventurer);
      expect(hero.attributes()).to
          .class(Adventurer)
          .attributes(0,0,0,0,0,0,0)
          .equip(nwe Weapon(1d6))
      .strike(hero1)

      strike = function(target){
          this.atk = this.getTrait(TRAITS.ATK);
      }

      hero.getTrait(traitID){

      }

	//expect(hero.doSomething()).toEqual('something');

  }));

});
