//describe('charClassService', function() {
//
//  beforeEach(module('AndProcRLData'));
//
//    var seeds = [{name: 'Adventurer'}
//        ,{name: 'Fighter', parent: 'Adventurer'}
//    ];
//
//  it('should hold classes', inject(function(charClassService) {
//      charClassService.import(seeds);
//      expect(_.keys(charClassService.$data).length).toEqual(2);
//      expect(charClassService.cls.Adventurer.name).toEqual("Adventurer");
//      expect(charClassService.cls.Fighter.name).toEqual("Fighter");
//      expect(charClassService.cls.noclass).toBeUndefined();
//  }));
//
//});
