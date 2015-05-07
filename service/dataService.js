angular.module('AndProcRLData').factory('dataService',function() {
    var defaultData = {
        classes: [{
            id: 'Adventurer',
            req: null
        }, {
            id: 'Fighter',
            parent: 'Adventurer'
        }, {
            id: 'Secret'
        }]
    }

	var dataService = {
        data: {}
        ,update: function() {
            dataService.data.classes = makeTree(dataService.data.classes, {
                yAddition: 40,
                xMultiplier: 150
            });
            dataService.save('data', dataService.data);
        }
        ,save: function(key, value) {
            dataService.data = value;
            localStorage.setItem(key, angular.toJson(value));
        }
        ,load: function(key) {
            var data = angular.fromJson(localStorage.getItem(key));
            if (data) {
                dataService.data = data;
            }
            return data;
        }
        ,flush: function(key) {
            localStorage.removeItem(key);
            dataService.save('data', defaultData)
            dataService.update()
        }
        ,addClass: function(model) {
            console.log('adcls', model);
            dataService.data.classes.push({
                id: 'newfag'+Math.random(),
                parent: model.id
            });

            dataService.data.classes = makeTree(dataService.data.classes, {
                yAddition: 40,
                xMultiplier: 150
            });
        }
    };

    function makeTree(classes, data) {
        //console.log('Going to Find Children of ', data.id);
        var offset = data.offset || 20;
        var level = data.level || 0;
        classes.forEach(function(e, index) {
            //console.log('I am searching for child of (',data.id,') on ', e.id,' who has parent ', e.parent);
            if (data.id === e.parent) {
                //console.log('I\'ve found child of (',data.id,') - it is ['+e.id+']');

                classes[index]._gfx = {
                    x: level * data.xMultiplier,
                    y: offset
                }

                classes = makeTree(classes, {
                    id: e.id,
                    xMultiplier: data.xMultiplier,
                    yAddition: data.yAddition,
                    level: level + 1,
                    offset: offset
                })

                offset += data.yAddition;
            }
            //console.log('I am searching for child of (',id,') on ', e.id,' who has parent ', e.parent);
        });
        return classes;
    }

    if (!dataService.load('data')) {
        dataService.save('data', defaultData)
    }

	return dataService;
});
