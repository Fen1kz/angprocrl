describe('dataService', function () {

    beforeEach(module('AndProcRLData'));

    it('should return undefined when test non-existing', inject(function (dataService) {
        expect(dataService.load('test')).toEqual(undefined);
    }));

    it('should save/load', inject(function (dataService) {
        var data = {
            int: 1,
            string: "str",
            obj: {
                x: 1
            },
            noll: null,
            arr: [1,2,3]
        };

        dataService.save('test-save', data);

        expect(dataService.load('test-save')).toEqual(data);
    }));
});
