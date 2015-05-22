describe('Attributes TEST', function () {

    beforeEach(module('stats'));

    it('should get ID', inject(function (ATTR, Attribute) {
        var STR = Attribute.STR.new();
        var AGI = Attribute.AGI.new();
        expect(STR.id()).toEqual('STR');
        expect(AGI.id()).toEqual('AGI');
    }));

    it('should get/set value', inject(function (Attribute) {
        var STR = Attribute.STR.new();
        var AGI = Attribute.AGI.new();
        expect(STR.value()).toEqual(0);
        STR.value(1);
        expect(STR.value()).toEqual(1);
        expect(AGI.value()).toEqual(0);
    }));

    //it('should get/set value', inject(function (ClassAttribute, CharClass) {
        //var STR = ClassAttribute.STR.new(CharClass.Adventurer);
        //var AGI = Attribute.AGI.new();
        //expect(STR.value()).toEqual(0);
        //STR.value(1);
        //expect(STR.value()).toEqual(1);
        //expect(AGI.value()).toEqual(0);
    //}));

    //it('should inherit id', inject(function (Attribute, ClassAttribute, HeroAttribute) {
    //    var classSTR = new ClassAttribute('STR');
    //    expect(classSTR.id()).toEqual('STR');
    //}));
    //
    //it('should inherit', inject(function (Attribute, ClassAttribute, HeroAttribute) {
    //
    //}));

});
