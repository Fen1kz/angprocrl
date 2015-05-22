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
    STR: {id: 'STR', COLOR: '#F00'}
    ,AGI: {id: 'AGI', COLOR: '#0F0'}
    ,VIT: {id: 'VIT', COLOR: '#0FF'}
    ,CON: {id: 'CON', COLOR: '#080'}
    ,LUK: {id: 'LUK', COLOR: '#A0A'}
    ,SPD: {id: 'SPD', COLOR: '#000'}
    ,INT: {id: 'INT', COLOR: '#00F'}
    ,WIZ: {id: 'WIZ', COLOR: '#F90'}
})
.factory('Attribute', function(ATTR) {
    var Attribute = _.inherit(Object, function Attribute(_id) {
        this._id = _id;
        this._value = 0;
    }, {
        id: function() {
            return this._id;
        }
        ,value: function(value) {
            if (value === void 0) {
                return this._value;
            } else {
                this._value = value;
            }
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
//.factory('ClassAttribute', function(Attribute) {
//    return _.inherit(Attribute, function ClassAttribute(_id, cls) {
//        Attribute.call(this, _id, cls);
//        this._cls = cls;
//    }, {
//
//    });
//})
//.factory('HeroAttribute', function(ClassAttribute) {
//    return _.inherit(ClassAttribute, function HeroAttribute() {
//
//    }, {});
//});
