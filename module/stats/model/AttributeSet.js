angular.module('stats')
.factory('AttributeSet',function(ATTR, Attribute) {
    function AttributeSet() {
        this.$data = {};
        _.forIn(ATTR, function (attr, attrID) {
            this.$data[attrID] = new Attribute(attrID)
        }, this);
        this.$apply(arguments);
    }
    _.forIn(ATTR, function (attr, attrID) {
        Object.defineProperty(AttributeSet.prototype, attrID, {
            get: function () {
                return this.$data[attrID];
            }
        });
    });

    _.assign(AttributeSet.prototype, {
        $apply: function(args) {
            var i = 0;
            _.forIn(ATTR, function (attr, attrID) {
                this.$data[attrID] = new Attribute(attrID)
                this.$data[attrID].value(args[i] || 0);
                ++i;
            }, this);
        },
        $linkToChild: function($childAttributes) {
            _.each(this.$data, function(attr) {

            });
            return this;
        }
    });

	return AttributeSet;
});
