(function(){
    //_.mixin({
    //        'inherit2': function(child, base, props) {
    //            child.prototype = _.create(base.prototype, _.assign({
    //                '_super': base.prototype,
    //                '$init': function() {
    //                    console.log('constructor constructed', arguments);
    //                    if (this._super.$init) {
    //                        this._super.$init.apply(this._super, arguments);
    //                    }
    //                    if (this.init) {
    //                        this.init.apply(this, arguments);
    //                    }
    //                    return this;
    //                }
    //            }, props));
    //            return child;
    //        }
    //    });
    //
    ////function extend(child, parent, props) {
    ////    //var child = Object.create(parentClass);
    ////    var $childConstructor = child.prototype.$constructor;
    ////    child.prototype = Object.create(parent.prototype);
    ////    _.assign(child, props)
    ////    debugger;
    ////}
    //
    //var Animal = _.inherit2(function AnimalE() {
    //    console.log('ANIMALE ALIVE')
    //}, Object, {
    //    init: function (name) {
    //        this.name = name || 'default_name';
    //    },
    //    name: function (name) {
    //        this.name = name;
    //        return this;
    //    }
    //});
    //
    //var Dog = _.inherit2(function DogE(type) {
    //    console.log('DOGE ALIVE')
    //}, Animal, {
    //    init: function(name, type){
    //        this.type = type || 'default type';
    //    }
    //})
    //
    ////Dog.prototype = Object.create(Animal.prototype);
    ////extend(Dog, Animal);
    //
    //var dog = new Dog().$init('bobik', 'taksa');
    //var dog2 = new Dog().$init('sharik', 'dog');
    //console.log(Dog instanceof Animal, true);
    //console.log(dog instanceof Animal, true);
    //dog.name("NEW BOBIK");
    //console.log(dog);
    //console.log(dog2);
    ////console.log(dog.sound());
    //
    //debugger;

    //function extend(parent) {
    //
    //}
    //
    //var Animal = {
    //    _init: function() {
    //        this.init.apply(this, arguments);
    //        Object.getPrototypeOf(Object.getPrototypeOf(this))._init.apply(this, arguments);
    //        debugger;
    //    }
    //    ,init: function(name) {
    //        this.name = name;
    //        debugger;
    //    }
    //}
    //
    //var Dog = Object.create(Animal);
    //_.assign(Dog, {
    //    _init: function() {
    //        this.init.apply(this, arguments);
    //        Object.getPrototypeOf(Object.getPrototypeOf(this))._init.apply(this, arguments);
    //        debugger;
    //    }
    //    ,init: function (name, type) {
    //        this.type = type;
    //        debugger;
    //    }
    //})
    //
    //var Cyberdog = Object.create(Dog);
    //_.assign(Cyberdog, {
    //    _init: function() {
    //        this.init.apply(this, arguments);
    //        Object.getPrototypeOf(Object.getPrototypeOf(this))._init.apply(this, arguments);
    //        debugger;
    //    }
    //    ,init: function (name, type, augment) {
    //        this.augment = augment;
    //        debugger;
    //    }
    //});
    //
    //var dog = Object.create(Dog);
    //dog._init('bobik', 'taksa');
    //console.log(dog.name, dog.type, 'bobik', 'taksa');
    //
    //var cybergod = Object.create(Dog);
    //cybergod._init('cz9000', 'cyber', 'lasers');
    //console.log(cybergod.name, cybergod.type, cybergod.augment, 'cz9000', 'cyber', 'lasers');
    ////console.log(dog.sound());

    //function extend(childFn, parent, properties) {
    //    childFn.prototype = ;
    //    childFn.();
    //
    //    _.assign(child, {
    //        _init: function () {
    //            ////child._init = function () {
    //            //var proto1 = Object.getPrototypeOf(this);
    //            //var proto2 = Object.getPrototypeOf(proto1);
    //            //debugger;
    //            ////this.init.apply(this, arguments);
    //            //proto2._init.apply(this, arguments);
    //        }
    //    });
    //    return child;
    //}
    //
    //var Animal = extend(Object, {
    //    init: function(name) {
    //        this.name = name;
    //        debugger;
    //    }
    //});
    //
    //var Dog = extend(Animal, {
    //    init: function (name, type) {
    //        this.type = type;
    //        debugger;
    //    }
    //});
    //
    //var Cyberdog = extend(Dog, {
    //    init: function (name, type, augment) {
    //        this.augment = augment;
    //        debugger;
    //    }
    //});
    //
    //var Druidanimal = {
    //    nature: true
    //}
    //
    //var Druiddog = Object.create(Druidanimal);
    //_.assign(Druiddog, {
    //    claws: true
    //});
    //
    //var dog = Object.create(Dog);
    //dog._init('bobik', 'taksa');
    //console.log(dog.name, dog.type, 'bobik', 'taksa');
    //
    //var druid = Object.create(Druiddog);
    //console.log(Druiddog.isPrototypeOf(druid));
    //console.log(Druidanimal.isPrototypeOf(druid));
    //
    //var cybergod = Object.create(Cyberdog);
    //cybergod._init('cz9000', 'cyber', 'lasers');
    //console.log(cybergod.name, cybergod.type, cybergod.augment, 'cz9000', 'cyber', 'lasers');
    ////console.log(dog.sound());

    //function extend(parent, childFn, properties) {
    //    childFn.prototype = Object.create(parent.prototype);
    //    childFn = _.assign(childFn, {
    //        constructor: function(){
    //            console.log('constructor constructed', arguments);
    //        },
    //        _init: function () {
    //            ////child._init = function () {
    //            //var proto1 = Object.getPrototypeOf(this);
    //            //var proto2 = Object.getPrototypeOf(proto1);
    //            //debugger;
    //            ////this.init.apply(this, arguments);
    //            //proto2._init.apply(this, arguments);
    //        }
    //    }, properties);
    //    return childFn;
    //}
    function extend(parent, childFn, properties) {
        var $parentPrototype = Object.create(parent.prototype);
        childFn.prototype = $parentPrototype
        childFn.prototype.constructor = childFn;
        _.assign(childFn.prototype, {
            $super: parent,
            $super_proto: $parentPrototype,
            _init: function () {
                ////child._init = function () {
                //var proto1 = Object.getPrototypeOf(this);
                //var proto2 = Object.getPrototypeOf(proto1);
                //debugger;
                ////this.init.apply(this, arguments);
                //proto2._init.apply(this, arguments);
            }
        }, properties);
        return childFn;
    }

    var Animal = extend(Object, function AnimalE(name) {
        console.log("Animal constructor", arguments);
        this.name = name;
    }, {
        legs: 4
    });

    var Dog = extend(Animal, function DogE(name, type) {
        console.log("Dog constructor", arguments);
        this.$super.apply(this.$super_proto, arguments);
        this.type = type;
    }, {
        sound: function(){
            return 'woof woof'
        }
    });

    var Cyberdog = extend(Dog, function CyberdogE(name, type, augment) {
        this.$super.apply(this.$super_proto, arguments);
        console.log("Cyberdog init", arguments);
        this.augment = augment;
    }, {
        legs: 16
    });

    var dog = new Dog('bobik', 'taksa');
    ////dog._init('bobik', 'taksa');

    //var druid = Object.create(Druiddog);
    //console.log(Druiddog.isPrototypeOf(druid));
    //console.log(Druidanimal.isPrototypeOf(druid));

    var cybergod = new Cyberdog('cz9000', 'cyber', 'lasers');
    var cybergod2 = new Cyberdog('KE1', 'MEGA', 'CANNONS');
    cybergod2.legs=300;


    console.log(cybergod.name, cybergod.type, cybergod.augment, 'cz9000', 'cyber', 'lasers');
    console.log(cybergod.sound());
    console.log(cybergod.legs);

    console.log(cybergod2.name, cybergod2.type, cybergod2.augment, 'KE1', 'MEGA', 'CANNONS');
    console.log(cybergod2.sound());
    console.log(cybergod2.legs);

    console.log(dog.name, dog.type, 'bobik', 'taksa');


    debugger;

})();
