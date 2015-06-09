angular.module('stats')
.factory('AttributeSet',function(ATTR, Attribute) {
    function AttributeSet() {
        this.$data = {};
        _.forIn(ATTR, function (attr, attrID) {
            this.$data[attrID] = new Attribute(attrID)
        }, this);
        this.fromArray(arguments);
    }
    _.forIn(ATTR, function (attr, attrID) {
        Object.defineProperty(AttributeSet.prototype, attrID, {
            get: function () {
                return this.$data[attrID];
            }
        });
    });

    _.assign(AttributeSet.prototype, {
        toArray: function() {
            return _.reduce(this.$data, function(memo, attr){
                memo.push(attr.value());
                return memo;
            }, []);
        }
        ,toString: function() {
            return "AttributeSet: " + this.toArray().toString();
        }
        ,byName: function(name) {
            return this[name];
        }
        ,$iterate: function(callback) {
            var i = 0;
            _.forIn(this.$data, function (attr, attrID) {
                callback.call(this, attr, attrID, i)
                ++i;
            }, this);
            return this;
        }
        ,fromArray: function(args) {
            this.$iterate(function(attr, attrID, i){
                this.$data[attrID].value(args[i] || 0);
            });
            return this;
        }
        ,applyArray: function(args) {
            this.$iterate(function(attr, attrID, i){
                if (args[i] !== void 0) this.$data[attrID].value(args[i]);
            });
            return this;
        }
        ,$linkTo: function(parentAttributeSet) {
            _.each(this.$data, function(attr, attrID) {
                attr.$linkTo(parentAttributeSet.$data[attrID]);
            });
            return this;
        }
        ,$unlinkFrom: function(parentAttributeSet) {
            _.each(this.$data, function(attr, attrID) {
                attr.$unlinkFrom(parentAttributeSet.$data[attrID]);
            });
            return this;
        }
    });

	return AttributeSet;
});
