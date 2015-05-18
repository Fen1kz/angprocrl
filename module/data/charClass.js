angular.module('data')
.factory('charClass', function(AttributeCollection) {
    function CharClass(name) {
        this.guid = _.uniqueId('charClass_');
        this.name = name;
        this.attributes = new AttributeCollection();
    }

	return CharClass;
});
