describe('CharClassTEST', function() {

  beforeEach(module('AndProcRLData'));

  it('CharClassBase should be valid', inject(function(CharClassBase) {
      var char1 = new CharClassBase('char1');
      expect(char1.name).toEqual('char1');
      expect( function(){ new CharClassBase() } ).toThrow(new Error('[name] is undefined'));
  }));

  it('charClassSet should be valid', inject(function(CharClassBase, charClassSet) {
      // initially empty:
      expect(charClassSet.$data).toEqual({});

      // flushing
      charClassSet.$data.test = 123;
      charClassSet.flush();

      // can add class
      var char1 = new CharClassBase('char1');
      charClassSet.addClass(char1);
      expect(_.keys(charClassSet.$data).length).toEqual(1);
      expect(charClassSet.id(char1.id)).toEqual(char1);
      expect(charClassSet.id(null)).toBeUndefined();
  }));

});
