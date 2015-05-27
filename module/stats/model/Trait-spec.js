describe('Trait', function() {

  beforeEach(module('stats'));

  it('should get value', inject(function(AttributeSet, Trait) {
      var attributes = new AttributeSet(1,2,3,4,5,6,7,8);
      var trait1 = new Trait();
      var trait2 = new Trait();
      expect(trait1.value()).toEqual(0);
      expect(trait2.value()).toEqual(0);
      trait1.$traitSet = {
          attributeSet: function() {
              return attributes;
          }
      };
      trait2.$traitSet = trait1.$traitSet;
      trait1.formula('STR');
      trait2.formula('(STR + AGI + VIT) / 2');
      expect(trait1.value(attributes)).toEqual(1);
      expect(trait2.value(attributes)).toEqual(3);
      attributes.fromArray([4,4,4]);
      expect(trait1.value(attributes)).toEqual(4);
      expect(trait2.value(attributes)).toEqual(6);
  }));

});
