describe('AttributeSet TEST', function() {

  beforeEach(module('stats'));

  it('should have defaults', inject(function(AttributeSet) {
      var attributes = new AttributeSet();
      expect(attributes.STR.value()).toEqual(0);
      expect(attributes.AGI.value()).toEqual(0);
      expect(attributes.VIT.value()).toEqual(0);
      expect(attributes.CON.value()).toEqual(0);
      expect(attributes.LUK.value()).toEqual(0);
      expect(attributes.SPD.value()).toEqual(0);
      expect(attributes.INT.value()).toEqual(0);
      expect(attributes.WIZ.value()).toEqual(0);
  }));

  it('should have constructor', inject(function(AttributeSet) {
      var attributes = new AttributeSet(1,2,3,4,5,6,7,8);
      expect(attributes.STR.value()).toEqual(1);
      expect(attributes.AGI.value()).toEqual(2);
      expect(attributes.VIT.value()).toEqual(3);
      expect(attributes.CON.value()).toEqual(4);
      expect(attributes.LUK.value()).toEqual(5);
      expect(attributes.SPD.value()).toEqual(6);
      expect(attributes.INT.value()).toEqual(7);
      expect(attributes.WIZ.value()).toEqual(8);
  }));

});
