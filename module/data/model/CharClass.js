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
            this.$attributes = new AttributeSet();
        }

        CharClass.add = function(name, parentID) {
            return new CharClass(name)
                .addById(parentID);
        }

        _.assign(CharClass.prototype, {
            attributes: function() {
                if (arguments.length === 0) {
                    return this.$attributes;
                } else {
                    this.$attributes.applyArray(arguments);
                    return this;
                }
                throw new Error("CharClass::attributes error");
            }
            ,addByName: function (parentName) {
                if (parentName) {
                    var parent = charClassSet.byName(parentName);
                    if (!parent) throw new Error('CharClass::addByName: Parent('+parentName+') doesn\'t exist');
                    return this.addById(parent.id);
                } else {
                    return this.addById(parentName);
                }
            }
            ,addChild: function (childCharClass) {
                return childCharClass.addById(this.id);
            }
            ,addById: function (parentID) {
                var parent = charClassSet.byId(parentID);
                if (parentID && !parent) throw new Error('CharClass::addById: Parent('+parentID+') doesn\'t exist');
                charClassSet.addClass(this);
                if (parent) this.$linkTo(parent);
                return this;
            }
            ,parent: function() {
                return charClassSet.byId(this.parentID);
            }
            ,children: function() {
                return _.filter(charClassSet.$data, 'parentID', this.id);
            }
            ,$linkTo: function(parent) {
                if (typeof parent === 'string') parent = charClassSet.byId(parent);
                this.$unlinkFrom(parent);
                if (parent) {
                    this.parentID = parent.id;
                    this.attributes().$linkTo(parent.attributes());
                }
                return this;
            }
            ,$unlinkFrom: function(parent) {
                if (typeof parent === 'string') parent = charClassSet.byId(parent);
                this.parentID = undefined;
                if (parent) this.attributes().$unlinkFrom(parent.attributes());
                return this;
            }
        });

        return CharClass;
    })
;
