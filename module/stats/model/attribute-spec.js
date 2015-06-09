describe('Attributes TEST', function () {

    beforeEach(module('stats'));

    it('should get name', inject(function (ATTR, Attribute) {
        var STR = Attribute.STR.new();
        var AGI = Attribute.AGI.new();
        expect(STR.name).toEqual('STR');
        expect(AGI.name).toEqual('AGI');
    }));

    it('should get/set value', inject(function (Attribute) {
        var STR = Attribute.STR.new();
        var AGI = Attribute.AGI.new();
        expect(STR.value()).toEqual(0);
        STR.value(1);
        expect(STR.value()).toEqual(1);
        expect(AGI.value()).toEqual(0);
    }));

    it('should link/unlink children', inject(function (Attribute) {
        var STR1 = Attribute.STR.new();
        var STR2 = Attribute.STR.new();
        var STR3 = Attribute.STR.new();
        var STR31 = Attribute.STR.new();
        var STR32 = Attribute.STR.new();
        var STR4 = Attribute.STR.new();
        var STR41 = Attribute.STR.new();
        var STR42 = Attribute.STR.new();
        STR2.$linkTo(STR1);
        STR3.$linkTo(STR2);
        STR4.$linkTo(STR3);

        STR31.$linkTo(STR3);
        STR32.$linkTo(STR3);

        STR41.$linkTo(STR4);
        STR42.$linkTo(STR4);

        STR1.value(1);
        expect(STR1.value()).toEqual(1);
        expect(STR2.value()).toEqual(1);
        expect(STR3.value()).toEqual(1);
        expect(STR4.value()).toEqual(1);
        expect(STR31.value()).toEqual(1);
        expect(STR32.value()).toEqual(1);
        expect(STR41.value()).toEqual(1);
        expect(STR42.value()).toEqual(1);
        STR3.value(1);
        STR4.value(1);
        expect(STR1.value()).toEqual(1);
        expect(STR2.value()).toEqual(1);
        expect(STR3.value()).toEqual(2);
        expect(STR31.value()).toEqual(2);
        expect(STR32.value()).toEqual(2);
        expect(STR4.value()).toEqual(3);
        expect(STR41.value()).toEqual(3);
        expect(STR42.value()).toEqual(3);
        STR4.$unlinkFrom(STR3);
        expect(STR4.value()).toEqual(1);
        expect(STR41.value()).toEqual(1);
        expect(STR42.value()).toEqual(1);
        STR42.$unlinkFrom(STR4);
        expect(STR41.value()).toEqual(1);
        expect(STR42.value()).toEqual(0);
        STR42.$linkTo(STR4);
        STR4.$linkTo(STR3);
        expect(STR4.value()).toEqual(3);
        expect(STR41.value()).toEqual(3);
        expect(STR42.value()).toEqual(3);
    }));
});
