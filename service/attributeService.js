angular.module('AndProcRLData').factory('attributeService',function(dataService) {

	var attributeService = {
        refreshLinks: function() {
            var links = [];
            _.each(dataService.data.traits, function(trait, traitIndex) {
                if (trait.formula) {
                    var formula = trait.formula;
                    _.each(dataService.data.attributes, function(attr){
                        formula = formula.replace(new RegExp(attr.id, 'g'), '_.find(attrs, "id", '+attr.id+').value');
                    });
                    trait.fn = eval('(function(attrs){return '+formula+';})');
                    _.each(dataService.data.attributes, function(attr, attrIndex) {
                        console.log('testing', attr.id);
                        if (trait.formula.match(new RegExp(attr.id))) {
                            console.log(trait.formula, 'includes', attr.id);
                            links.push({
                                from: {id: attr.id, index: attrIndex},
                                to: {id: trait.id, index: traitIndex}
                            });
                        }
                    });
                    //var matchedAttr = trait.formula
                    //trait.links =
                }
            });
            return links;
        }
    };

	return attributeService;
});
