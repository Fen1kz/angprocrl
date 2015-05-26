angular.module('stats')
.factory('AttributeSet',function(ATTR, Attribute) {
    function AttributeSet() {
        this._data = {};
        _.forIn(ATTR, function (attr, attrID) {
            this._data[attrID] = new Attribute(attrID)
        }, this);
        this.$apply(arguments);
    }
    _.forIn(ATTR, function (attr, attrID) {
        Object.defineProperty(AttributeSet.prototype, attrID, {
            get: function () {
                return this._data[attrID];
            }
        });
    });

    _.assign(AttributeSet.prototype, {
        $apply: function(args) {
            var i = 0;
            _.forIn(ATTR, function (attr, attrID) {
                this._data[attrID] = new Attribute(attrID)
                this._data[attrID].value(args[i] || 0);
                ++i;
            }, this);
        }
    });

	return AttributeSet;
});
