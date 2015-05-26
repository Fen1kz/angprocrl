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
    //.factory('CharClassAttributeSet', function(AttributeSet) {
    //    function CharClassAttributeSet() {
    //        AttributeSet.apply(this, arguments);
    //        this.$childAttributes = [];
    //    }
    //
    //    return _.inherit(AttributeSet, CharClassAttributeSet, {
    //        $linkToChild: function($childAttributes) {
    //            this.$childAttributes.push($childAttributes);
    //        }
    //    });
    //})
    .factory('CharClass', function (charClassSet, AttributeSet) {
        function CharClass(name) {
            if (!name) throw new Error('[name] is undefined', 'CharClassException');
            if (typeof name !== 'string') throw new Error('[name] is not String', 'CharClassException');

            this.id = _.uniqueId('charClass_');
            this.name = name;
            this.$attributes = new AttributeSet();
        }

        _.assign(CharClass.prototype, {
            attributes: function() {
                if (arguments.length === 0) {
                    return this.$attributes;
                } else {
                    this.$attributes.$apply(arguments);
                    return this;
                }
                throw new Error("CharClass::attributes error");
            }
            ,addById: function (parentID) {
                var parent = charClassSet.byId(parentID);
                if (parentID && !parent) throw new Error('Parent doesn\'t exist', 'CharClassException');
                charClassSet.addClass(this);
                if (parent) this.$linkToParent(parent);
                return this;
            }
            ,addByName: function (parentName) {
                if (parentName) {
                    var parent = charClassSet.byName(parentName);
                    if (!parent) throw new Error('Parent doesn\'t exist', 'CharClassException');
                    return this.addById(parent.id);
                } else {
                    return this.addById(parentName);
                }
            }
            ,parent: function() {
                return charClassSet.byId(this.parentID);
            }
            ,children: function() {
                return _.filter(charClassSet.$data, 'parentID', this.id);
            }
            ,$linkToParent: function(parent) {
                this.parentID = parent;
                parent.attributes().$linkToChild(this.$attributes);
                return this;
            }
        });

        return CharClass;
    })
;
