angular.module('stats')
.config(function(){
    _.mixin({'inherit': function(base, child, properties) {
        child.prototype = _.create(base.prototype, _.assign({
            _super: base.prototype,
            constructor: child
        }, properties));
        return child;
    }});
})
.constant('ATTR', {
    STR: 'STR'
    ,AGI: 'AGI'
    ,VIT: 'VIT'
    ,CON: 'CON'
    ,LUK: 'LUK'
    ,SPD: 'SPD'
    ,INT: 'INT'
    ,WIZ: 'WIZ'
})
.constant('ATTR_DATA', {
    STR:  {id: 'STR', COLOR: '#F00'}
    ,AGI: {id: 'AGI', COLOR: '#0F0'}
    ,VIT: {id: 'VIT', COLOR: '#0FF'}
    ,CON: {id: 'CON', COLOR: '#080'}
    ,LUK: {id: 'LUK', COLOR: '#A0A'}
    ,SPD: {id: 'SPD', COLOR: '#000'}
    ,INT: {id: 'INT', COLOR: '#00F'}
    ,WIZ: {id: 'WIZ', COLOR: '#F90'}
})
.factory('Attribute', function(ATTR) {
    function Attribute(name) {
        this.id = _.uniqueId('Attribute_');
        this.name = name;
        this.$value = 0;
        this.$base = 0;
        this.$children = [];
    }
    _.assign(Attribute.prototype, {
        value: function(value) {
            if (value === void 0) {
                return this.$base + this.$value;
            } else {
                this.$value = value;
                _.each(this.$children, function(attr){
                    attr.base(this.value());
                }, this);
            }
        }
        ,base: function(base) {
            if (base === void 0) {
                return this.$base;
            } else {
                this.$base = base;
                _.each(this.$children, function(attr){
                    attr.base(this.value());
                }, this);
            }
        }
        ,$linkChild: function(childAttribute) {
            if (childAttribute.$parent) throw new Error('Attribute::$parent exists');
            childAttribute.$parent = this;
            childAttribute.base(this.value());
            this.$children.push(childAttribute);
        }
        ,$unlinkChild: function(childAttribute) {
            childAttribute.$parent = null;
            childAttribute.base(0);
            _.remove(this.$children, 'id', childAttribute.id);
        }
    });

    _.forIn(ATTR, function (value, key) {
        Attribute[key] = {
            new: function() {
                return new Attribute(key);
            }
        }
    });

    return Attribute;
})
