angular.module('data')
    .factory('CharClass', function (charClassSet, AttributeSet) {
        var checkParent = function (parent) {
            if (parent instanceof CharClass) {
                return true;
            } else if (!parent) {
                return false;
            } else {
                throw new Error('parent is not a CharClass or null', 'CharClassException')
            }
        };

        function CharClass(name, parent) {
            if (!name) throw new Error('[name] is undefined', 'CharClassException');
            if (typeof name !== 'string') throw new Error('[name] is not String', 'CharClassException');

            this.id = _.uniqueId('charClass_');
            this.name = name;
            this.$attributes = new AttributeSet();
            this.$children = [];
            this.$parent = void 0;

            if (checkParent(parent)) {
                this.link(parent);
            }
        }

        CharClass.$data = {};
        CharClass.byId = function (id) {
            return CharClass.$data[id];
        };
        CharClass.byName = function (name) {
            return _.find(CharClass.$data, 'name', name);
        };
        CharClass.flush = function () {
            _.each(CharClass.$data, function (charClass) {
                charClass.unlink();
            });
            CharClass.$data = {};
        };

        _.assign(CharClass.prototype, {
            byId: function (id) {
                return CharClass.byId(id);
            }
            , byName: function (name) {
                return CharClass.byName(name);
            }
            , attributes: function () {
                if (arguments.length === 0) {
                    return this.$attributes;
                } else {
                    this.$attributes.applyArray(arguments);
                    return this;
                }
                throw new Error("CharClass::attributes error");
            }
            , parent: function () {
                return this.$parent;
            }
            , children: function () {
                return this.$children;
            }
            , linkChild: function (child) {
                return child.link(this);
            }
            , link: function (parent) {
                this.unlink();
                if (checkParent(parent)) {
                    this.$parent = parent;
                    this.attributes().link(this.parent().attributes());
                }
                return this;
            }
            , unlink: function () {
                if (checkParent(this.$parent)) {
                    this.attributes().unlink(this.$parent.attributes());
                    _.remove(this.$parent.$children, 'id', this.id);
                    this.$parent = void 0;
                }
            }
        });

        return CharClass;
    })
;
