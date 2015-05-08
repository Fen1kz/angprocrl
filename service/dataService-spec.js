describe('dataService', function () {

    beforeEach(module('AndProcRLData'));

    it('should return undefined when test non-existing', inject(function (dataService) {
        expect(dataService.load('test')).toEqual(undefined);
        expect(dataService.load('test2', 'test2')).toEqual('test2');
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

    it('should getClassesIndexes', inject(function (dataService) {
        dataService.flush();
        console.log(dataService.getClassesIndexes(undefined));
        expect(dataService.getClassesIndexes(undefined).length).toEqual(2);
    }));
});
