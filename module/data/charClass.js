angular.module('data')
    .service('charClassSet', function () {
        var set = {
            $data: {},
            flush: function() {
                this.$data = {};
            }
            ,byId: function(id) {
                return this.$data[id];
            }
            ,byName: function(name) {
                return _.find(this.$data, 'name', name);
            }
            ,addClass: function(model) {
                this.$data[model.id] = model;
            }
            ,removeClass: function(model) {
                delete this.$data[model.id];
            }
        };
        return set;
    })
    .factory('CharClass', function (charClassSet, AttributeSet) {
        function CharClass(name) {
            if (!name) throw new Error('[name] is undefined', 'CharClassException');
            if (typeof name !== 'string') throw new Error('[name] is not String', 'CharClassException');

            this.id = _.uniqueId('charClass_');
            this.name = name;
        }

        _.assign(CharClass.prototype, {
            addById: function (parentID) {
                if (parentID && !charClassSet.byId(parentID)) throw new Error('Parent doesn\'t exist', 'CharClassException');
                this.parentID = parentID;
                charClassSet.addClass(this);
                return this;
            }
            ,addByName: function (parentName) {
                if (parentName) {
                    var parent = charClassSet.byName(parentName);
                    if (!parent) throw new Error('Parent doesn\'t exist', 'CharClassException');
                    this.parentID = parent.id;
                } else {
                    this.parentID = parentName;
                }
                charClassSet.addClass(this);
                return this;
            }
        });

        return CharClass;
    })
;
