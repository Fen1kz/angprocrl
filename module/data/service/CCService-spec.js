describe('CCService TEST', function() {

  beforeEach(module('data'));

  it('should import classes', inject(function(CCService) {
      CCService.import([
          {name: 'Adventurer'}
          ,{name: 'Fighter', parent: 'Adventurer'}
      ]);
      expect(CCService.$.byName('Adventurer').name).toEqual("Adventurer");
      expect(CCService.$.byName('Fighter').name).toEqual("Fighter");
      expect(CCService.$.byName('noclass')).toBeUndefined();
  }));

    it('should import inverse classes', inject(function(CCService) {
        CCService.import([
            {name: 'Fighter', parent: 'Adventurer'}
            ,{name: 'Adventurer'}
        ]);
        expect(CCService.$.byName('Adventurer').name).toEqual("Adventurer");
        expect(CCService.$.byName('Fighter').name).toEqual("Fighter");
    }));
});
