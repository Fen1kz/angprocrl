angular.module('AndProcRLData').factory('attributeService',function(dataService) {

	var attributeService = {
        refreshLinks: function() {
            var links = [];
            _.each(dataService.data.traits, function(trait, traitIndex) {
                _.each(dataService.data.attributes, function(attr, attrIndex) {
                    if (trait.formula && trait.formula.match(new RegExp(attr.id))) {
                        links.push({
                            from: {id: attr.id, index: attrIndex},
                            to: {id: trait.id, index: traitIndex}
                        });
                    }
                });
            });
            return links;
        }
    };

	return attributeService;
});
