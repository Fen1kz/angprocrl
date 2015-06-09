describe('AttributeSet TEST', function () {

    beforeEach(module('stats'));

    it('should have constructor', inject(function (AttributeSet) {
        var attributes = new AttributeSet(1, 2, 3, 4, 5, 6, 7, 8);
        expect(attributes.STR.value()).toEqual(1);
        expect(attributes.AGI.value()).toEqual(2);
        expect(attributes.VIT.value()).toEqual(3);
        expect(attributes.CON.value()).toEqual(4);
        expect(attributes.LUK.value()).toEqual(5);
        expect(attributes.SPD.value()).toEqual(6);
        expect(attributes.INT.value()).toEqual(7);
        expect(attributes.WIZ.value()).toEqual(8);
    }));

    it('should to array', inject(function (AttributeSet) {
        var attributes = new AttributeSet(1, 3, 5, 2, 4, 6, 7, 8);
        expect(attributes.toArray()).toEqual([1, 3, 5, 2, 4, 6, 7, 8]);
    }));

    it('should have defaults', inject(function (AttributeSet) {
        var attributes = new AttributeSet();
        expect(attributes.toArray()).toEqual([0,0,0,0,0,0,0,0]);
        var attributes = new AttributeSet(1, 2, 3);
        expect(attributes.toArray()).toEqual([1, 2, 3, 0,0,0,0,0]);
    }));

    it('should applyArray/fromArray', inject(function (AttributeSet) {
        var attributes = new AttributeSet(1, 2, 3, 4, 5, 6, 7, 8)
            .fromArray([8, 7, 6, 5, 4, 3])
            .applyArray([11, 12]);
        expect(attributes.toArray()).toEqual([11, 12, 6, 5, 4, 3, 0, 0]);
    }));

    it('should link/unlink children', inject(function (AttributeSet) {
        var attributes1 = new AttributeSet (1, 2);
        var attributes2 = new AttributeSet (1, 2);
        var attributes3 = new AttributeSet (1, 2);
        var attributes31 = new AttributeSet(1, 2);
        var attributes32 = new AttributeSet(1, 2);
        var attributes32child = new AttributeSet(2, 1);
        attributes2 .$linkTo(attributes1);
        attributes3 .$linkTo(attributes2);
        attributes31.$linkTo(attributes3);
        attributes32.$linkTo(attributes3);
        expect(attributes1.toArray()).toEqual ([1, 2, 0,0,0,0,0,0]);
        expect(attributes2.toArray()).toEqual ([2, 4, 0,0,0,0,0,0]);
        expect(attributes3.toArray()).toEqual ([3, 6, 0,0,0,0,0,0]);
        expect(attributes31.toArray()).toEqual([4, 8, 0,0,0,0,0,0]);
        expect(attributes32.toArray()).toEqual([4, 8, 0,0,0,0,0,0]);
        attributes1.applyArray([1,1,1]);
        attributes2.applyArray([2,2,2]);
        attributes3.applyArray([2,2,2]);
        expect(attributes1.toArray()).toEqual ([1, 1, 1,0,0,0,0,0]);
        expect(attributes2.toArray()).toEqual ([3, 3, 3,0,0,0,0,0]);
        expect(attributes3.toArray()).toEqual ([5, 5, 5,0,0,0,0,0]);
        expect(attributes31.toArray()).toEqual([6, 7, 5,0,0,0,0,0]);

        attributes32.$unlinkFrom(attributes3);
        expect(attributes32.toArray()).toEqual([1, 2, 0,0,0,0,0,0]);

        attributes32child.$linkTo(attributes32);
        expect(attributes32child.toArray()).toEqual([3, 3, 0,0,0,0,0,0]);

        attributes32.$linkTo(attributes3);
        expect(attributes32.toArray()).toEqual([6, 7, 5,0,0,0,0,0]);
        expect(attributes32child.toArray()).toEqual([8, 8, 5,0,0,0,0,0]);
    }));

});
