angular.module('AndProcRLData').factory('dataService',function() {
    var defaultData = {
        classes: [{
            id: 'Adventurer',
            req: null
        }, {
            id: 'Fighter',
            parent: 'Adventurer'
        }, {
            id: 'Bandit',
            parent: 'Adventurer'
        }, {
            id: 'Secret'
        }, {
            id: 'SecretChild',
            parent: 'Secret'
        }]
    };

	var dataService = {
        data: {}
        ,get defaultData() {
            return angular.extend({}, defaultData);
        }
        ,save: function(key, value) {
            dataService.data = value;
            localStorage.setItem(key, angular.toJson(value));
        }
        ,load: function(key) {
            var data = angular.fromJson(localStorage.getItem(key));
            if (data) {
                dataService.data = data;
            } else {
                dataService.save('data', dataService.data);
            }
            return data;
        }
        ,flush: function(key) {
            localStorage.removeItem(key);
            dataService.data = dataService.defaultData;
            dataService.update();
        }
        ,update: function() {
            dataService.data.classes = makeTree(dataService.data.classes, {
                yAddition: 40,
                xMultiplier: 150
            }).classes;
            dataService.save('data', dataService.data);
        }
        ,addClass: function(model) {
            if (_.some(dataService.data.classes, 'id', 'newClass')) {
                return;
            }
            dataService.data.classes.push({
                id: 'newClass',
                parent: model.id
            });

            dataService.update();
        }
        ,removeClass: function(model) {
            _.remove(dataService.data.classes, 'id', model.id);

            dataService.update();
        }
    };
    dataService.load('data');
    window.dataService = dataService;

    function makeTree(classes, data) {
        //console.log('Going to Find Children of ', data.id);
        var offset = data.offset || 0;
        var level = data.level || 0;
        var childcount = 0;
        classes.forEach(function(e, index) {
            //console.log('I am searching for child of (',data.id,') on ', e.id,' who has parent ', e.parent);
            if (data.id === e.parent) {
                childcount++;
                //console.log('I\'ve found child of (',data.id,') - it is ['+e.id+']', 'with offset', offset);

                classes[index]._gfx = {
                    x: level * data.xMultiplier,
                    y: offset
                };

                var makeTreeReturn = makeTree(classes, {
                    id: e.id,
                    xMultiplier: data.xMultiplier,
                    yAddition: data.yAddition,
                    level: level + 1,
                    offset: offset
                });


                if (makeTreeReturn.childcount === 0) {
                    //console.log(e.id, ' has no childs -- we add 40 to ', offset);
                    offset += data.yAddition;
                } else {
                    //console.log(e.id, ' has childs! we make offset', makeTreeReturn.offset);
                    offset = makeTreeReturn.offset;
                }

                classes = makeTreeReturn.classes;
            }
            //console.log('I am searching for child of (',id,') on ', e.id,' who has parent ', e.parent);
        });
        return {
            offset: offset,
            classes: classes,
            childcount: childcount
        };
    }
	return dataService;
});
