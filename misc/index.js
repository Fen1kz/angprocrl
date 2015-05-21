(function(){
    _.mixin({"inherit": function(base, child, properties) {
        child.prototype = _.create(base.prototype, _.assign({
            _super: base.prototype,
            constructor: child
        }, properties));
        return child;
    }});

    var Animal = _.inherit(Object, function Animal(_name) {
        this._name = _name;
    }, {
        protolegs: 5,
        name: function() {
            return this._name;
        },
        get getname1() {
            return this._name;
        }
    });

    Object.defineProperty(Animal.prototype, 'getname', {
        get: function() {
            return this._name;
        }
    })

    var Dog = _.inherit(Animal, function Dog(name, type) {
        Animal.apply(this, arguments);
        this.type = type;
        this.thiswoof = "waf";
    }, {
        protowoof: "woof"
    });

    var dog1 = new Dog("bobik", "taksa");
    var dog2 = new Dog("sharik", "doge");
    var animal1 = new Animal("chupakabra");

    var animal1protolegs = animal1.protolegs;
    var dog1protolegs = dog1.protolegs;
    var dog1protowoof = dog1.protowoof;
    var dog2protolegs = dog2.protolegs;
    var dog2protowoof = dog2.protowoof;

    dog1.thislegs = 1
    dog1.protolegs = 1
    dog1.protowoof = 1

    debugger;
})();
