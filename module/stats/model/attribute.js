angular.module('stats')
.config(function(){
    _.mixin({
        'inherit': function(child, base, props) {
            child.prototype = _.create(base.prototype, _.assign({
                '_super': base.prototype,
                'constructor': function(){
                    console.log('constructor constructed', arguments);
                    this._super.constructor.apply(this, arguments);
                }
            }, props));
            return child;
        }
    });
})
.factory('Attribute', function() {
    function Attribute(id) {
        console.log('Attribute constructed', arguments);
        if (!id) throw new Error('AttributeException::No ID provided!'); // jshint:ignore:line
        this._id = id;
    }
    Attribute.prototype.__defineGetter__('id', function(){
        return this._id;
    });
	return Attribute;
})
.factory('ClassAttribute', function(Attribute) {
    function ClassAttribute(cls) {
        console.log('ClassAttribute constructed', arguments);
        this._cls = cls;
    }
    return _.inherit(ClassAttribute, Attribute, {});
})
.factory('HeroAttribute', function(ClassAttribute) {
    function HeroAttribute() {

    }
    return _.inherit(HeroAttribute, ClassAttribute, {});
});
