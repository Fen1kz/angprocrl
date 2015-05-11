angular.module('AndProcRLData').factory('attributeService',function(dataService) {

	var attributeService = {
        refreshLinks: function() {
            var links = [];
            _.each(dataService.data.traits, function(trait, traitIndex) {
                if (trait.formula) {
                    var definitions = "";
                    _.each(dataService.data.attributes, function(attr) {
                        definitions += '\n var ' + attr.id + ' = +(_.find(attrs, "id", "' + attr.id + '").value) || 0;';
                    });
                    trait.fn = eval('(function(attrs, formula){\n' + definitions
                        +'\ndebugger;'
                    +'\nreturn eval(formula);})');
                    _.each(dataService.data.attributes, function(attr, attrIndex) {
                        if (trait.formula.match(new RegExp(attr.id))) {
                            console.log(trait.formula, 'includes', attr.id);
                            links.push({
                                from: {id: attr.id, index: attrIndex},
                                to: {id: trait.id, index: traitIndex}
                            });
                        }
                    });
                    //console.log(trait.fn);
                    //console.log(trait.fn(dataService.data.attributes));
                    //var matchedAttr = trait.formula
                    //trait.links =
                }
            });
            return links;
        }
    };

	return attributeService;
});
