angular.module('stats')
.constant('ATTR_NAME', {
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
.factory('AttributeCollection',function(ATTR_DATA) {
    function AttributeCollection() {
        //this.data = {};
        //_.each(ATTR_DATA, function(attr, attrID){
        //    this.data[attr.id];
        //});
    }

	return AttributeCollection;
});
