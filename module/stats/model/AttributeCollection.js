angular.module('stats')
.constant('ATTR_DATA', {
    ATTR_DATA: [
         {id: 'STR', COLOR: '#F00'}
        ,{id: 'AGI', COLOR: '#0F0'}
        ,{id: 'VIT', COLOR: '#0FF'}
        ,{id: 'CON', COLOR: '#080'}
        ,{id: 'LUK', COLOR: '#A0A'}
        ,{id: 'SPD', COLOR: '#000'}
        ,{id: 'INT', COLOR: '#00F'}
        ,{id: 'WIZ', COLOR: '#F90'}
    ]
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
