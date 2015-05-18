describe('Attributes tests', function () {

    beforeEach(module('stats'));

    it('should get ID', inject(function (Attribute) {
        var STR = new Attribute('STR');
        expect(STR.id).toEqual('STR');
    }));

    it('should get different ID', inject(function (Attribute) {
        var STR = new Attribute('STR');
        var AGI = new Attribute('AGI');
        expect(STR.id).toEqual('STR');
        expect(AGI.id).toEqual('AGI');
    }));

    it('should inherit id', inject(function (Attribute, ClassAttribute, HeroAttribute) {
        var classSTR = new ClassAttribute('STR');
        expect(classSTR.id).toEqual('STR');
    }));

    it('should inherit', inject(function (Attribute, ClassAttribute, HeroAttribute) {

    }));

});
