angular.module('AndProcRLData')
    .controller('HomeCtrl', function ($scope, ClassAttribute, Attribute, dataService, charClassService, attributeService) {
        var classSTR = new ClassAttribute('STR', 'fter');
        console.log(classSTR.id);
    });
