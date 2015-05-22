angular.module('data')
    .service('charClassSet', function () {
        var set = {
            $data: {},
            flush: function() {
                this.$data = {};
            }
            ,id: function(id) {
                return this.$data[id];
            }
            ,addClass: function(model) {
                this.$data[model.id] = model;
            }
        };
        return set;
    })
    .factory('CharClassBase', function (charClassSet, AttributeSet) {
        function CharClassBase(name) {
            if (!name) throw new Error('[name] is undefined', 'CharClassException');

            this.id = _.uniqueId('charClass_');
            this.name = name;
        }
        return CharClassBase;
    })
    .factory('CharClass', function (CharClassBase, charClassSet, AttributeSet) {
        function CharClass(charClassBase, parentID) {
            if (parentID && !charClassSet.id(parentID)) throw new Error('Parent doesn\'t exist', 'CharClassException');
            CharClassBase.apply(this, arguments);

            this.parentID = parentID;
            charClassSet.addClass(this);
        }

        _.inherit(CharClassBase, CharClass, {
            addChild: function(charClassBase) {
                return new CharClass(charClassBase, this.id);
            }
        });

        //_.assign(CharClass.prototype, {
        //    $classes: {},
        //    $updateClasses: function () {
        //        _.each(dataService.data.classesSeed, function (seed) {
        //            this.$classes[seed.id] = new CharClass(seed.id, seed.parent);
        //        }, this);
        //    }
        //});
        //
        //Object.defineProperty(CharClass, 'get', {
        //    get: function() {
        //        return this.prototype.$classes;
        //    }
        //})
        //
        //CharClass.prototype.$updateClasses();

        return CharClass;
    })
;
