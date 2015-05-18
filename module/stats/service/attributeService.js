angular.module('AndProcRLData').factory('attributeService',function(dataService) {

	var attributeService = {
        getAttributeValue: function(heroAttr, classAttr, attr) {

        }
        ,refreshLinks: function() {
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
        ,makeTraitFn: function(trait, attributes){
            var formula = trait.formula;
            if (formula) {
                _.each(attributes, function(attr, attrIndex) {
                    formula = formula.replace(attr.id, '(+attributes['+attrIndex+'].value || 0)');
                    //formula = formula.replace(attr.id, '+attributes['+attrIndex+'].getValue()');
                });
                try {
                    trait.fn = eval('(function(attributes){return (+this.base || 0) +' + formula + ';})'); // jshint ignore:line
                    trait.value = trait.fn(attributes);
                } catch (e) {
                    console.log('Wrong formula');
                    trait.fn = function(){return 0;}
                }
            } else {
                trait.fn = function () {
                    return 0;
                }
            }
        }
    };

	return attributeService;
});
