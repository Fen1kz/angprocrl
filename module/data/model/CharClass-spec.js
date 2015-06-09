describe('CharClassTEST', function () {

    beforeEach(module('data'));

    beforeEach(function () {
        inject(function (CCService) {
            CCService.flush();
        });
    });

    it('CharClass should have attributes', inject(function (CharClass) {
        var char1 = new CharClass('char1');
        var char2 = new CharClass('char2')
            .link(char1);
        var char3 = char2
            .linkChild(new CharClass('char3'));
        expect(char1.attributes()).toBeDefined();
        expect(char1).not.toBe(char2);
        expect(char2).not.toBe(char3);
        expect(char3).not.toBe(char1);
        char1.attributes(1, 2, 3, 4, 5, 6, 7, 8);
        char2.attributes(1, 2, 3, 4, 5, 6, 7, 8);
        char3.attributes(1, 2, 3, 4, 5, 6, 7, 8);
        expect(char1.attributes().STR.value()).toEqual(1);
        expect(char2.attributes().STR.value()).toEqual(2);
        expect(char3.attributes().STR.value()).toEqual(3);
    }));

    it('charClassSet should be valid', inject(function (CharClass) {
        // initially empty:
        expect(charClassSet.$data).toEqual({});

        expect(charClassSet.byId(null)).toBeUndefined();

        var char1 = new CharClass('char1');
        var char2 = new CharClass('char2');

        charClassSet.addClass(char1);
        charClassSet.addClass(char2);
        expect(charClassSet.byId(char1.id)).toEqual(char1);
        expect(charClassSet.byId(char2.id)).toEqual(char2);
        expect(charClassSet.byName('char1')).toEqual(char1);
        expect(charClassSet.byName('char2')).toEqual(char2);

        char1.name = 'newChar1';
        char2.name = 'newChar2';
        expect(charClassSet.byName('char1')).toBeUndefined();
        expect(charClassSet.byName('char2')).toBeUndefined();
        expect(charClassSet.byName('newChar1')).toEqual(char1);
        expect(charClassSet.byName('newChar2')).toEqual(char2);
        expect(charClassSet.byId(char1.id).name).toEqual('newChar1');
        expect(charClassSet.byId(char2.id).name).toEqual('newChar2');

        charClassSet.flush();

        expect(charClassSet.$data).toEqual({});
        expect(charClassSet.byId(char1.id)).toBeUndefined();
        expect(charClassSet.byName('char2')).toBeUndefined();
        expect(charClassSet.byName('newChar2')).toBeUndefined();
    }));

    it('CharClass should operate charClassSet', inject(function (charClassSet, CharClass) {
        expect(charClassSet.$data).toEqual({});

        var char1 = new CharClass('char1').addById();
        var child1 = new CharClass('child1').addById(char1.id);
        var child2 = new CharClass('child2').addByName('char1');
        var child3 = CharClass.add('child3', char1.id);

        expect(_.keys(charClassSet.$data).length).toEqual(4);
        expect(charClassSet.byId(child1.id)).toEqual(child1);
        expect(charClassSet.byId(child2.id)).toEqual(child2);
        expect(charClassSet.byId(child3.id)).toEqual(child3);
        expect(charClassSet.byId(char1.id).name).toEqual('char1');
        expect(charClassSet.byId(child1.id).name).toEqual('child1');
        expect(charClassSet.byId(child2.id).name).toEqual('child2');
        expect(charClassSet.byId(child1.id).parentID).toEqual(char1.id);
        expect(charClassSet.byId(child2.id).parentID).toEqual(char1.id);
        expect(charClassSet.byId(child3.id).parentID).toEqual(char1.id);
        expect(charClassSet.byId(char1.id)).not.toEqual(child1);
        expect(charClassSet.byId(char1.id)).not.toEqual(child2);
        expect(charClassSet.byId(child1.id)).not.toEqual(child2);
    }));

    it('CharClass should get parent/children', inject(function (charClassSet, CharClass) {
        var char1 = new CharClass('char1').addById();
        var child1 = new CharClass('child1').addById(char1.id);
        var child2 = new CharClass('child2').addByName('char1');

        expect(char1.parent()).toBeUndefined();
        expect(child1.parent()).toEqual(char1);
        expect(child2.parent()).toEqual(char1);
        expect(char1.children()).toEqual([child1, child2]);
        expect(child1.children()).toEqual([]);
        expect(child2.children()).toEqual([]);
    }));

});
