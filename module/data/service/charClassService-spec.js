describe('charClassService TEST', function() {

  beforeEach(module('data'));

  it('should import classes', inject(function(charClassService) {
      charClassService.import([
          {name: 'Adventurer'}
          ,{name: 'Fighter', parent: 'Adventurer'}
      ]);
      expect(charClassService.$.byName('Adventurer').name).toEqual("Adventurer");
      expect(charClassService.$.byName('Fighter').name).toEqual("Fighter");
      expect(charClassService.$.byName('noclass')).toBeUndefined();
  }));

    it('should import inverse classes', inject(function(charClassService) {
        charClassService.import([
            {name: 'Fighter', parent: 'Adventurer'}
            ,{name: 'Adventurer'}
        ]);
        expect(charClassService.$.byName('Adventurer').name).toEqual("Adventurer");
        expect(charClassService.$.byName('Fighter').name).toEqual("Fighter");
    }));
});
