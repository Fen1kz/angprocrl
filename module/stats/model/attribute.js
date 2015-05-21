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
.factory('Attribute', function() {
    return _.inherit(Object, function Attribute(_id) {
        this._id = _id;
    }, {
        id: function() {
            return this._id;
        }
    });
})
.factory('ClassAttribute', function(Attribute) {
    var c = _.inherit(Attribute, function ClassAttribute(_id, cls) {
        Attribute.call(this, _id, cls);
        this._cls = cls;
    }, {

    });
})
.factory('HeroAttribute', function(ClassAttribute) {
    return _.inherit(ClassAttribute, function HeroAttribute() {

    }, {});
});
