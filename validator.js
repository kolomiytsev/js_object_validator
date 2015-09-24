var validationSchema = require('./scheme'),
    userModel = [];
module.exports = new ObjectValidator();

//constructor for object validator
function ObjectValidator() {
    this.registerModel = function (name, model) {
        if (userModel.hasOwnProperty(name)) {
            console.log('Model ' + name + ' is already in the system.');
            return false;
        }
        var schema = [];
        for (var prop in model) {
            var type = model[prop].type;
            if (!validationSchema.hasOwnProperty(type)) {
                console.log('validationSchema does not have ' + type +
                ' type, please update validationSchema or register new Model');
                return false;
            }
            schema[prop] = validationSchema[type].validate(model[prop]);
        }
        userModel[name] = schema;
    };
    this.validate = function (name, object) {
        if (!userModel[name]) {
            console.log(name + ' is not registered!');
            return false;
        }
        var schema = userModel[name];
        for (var prop in schema) {
            if (!schema[prop].call(object[prop])) {
                console.log(object[prop] + ' is not valid value for ' + prop +
                ' in this scheme. Please, check your object and registered model.');
                return false;
            }
        }
        return true;
    };
    this.dispose = function () {
        userModel = [];
    };
}

//Example
//var test = new ObjectValidator();
//test.registerModel("user", {
//    id: {type: "uuid", required: true},
//    name: {type: "string", min: 1, max: 64},
//    createdAt: {type: "date"},
//    counter: {type: "number", required: true, min: 0, max: 64}
//});
//var result = test.validate("user", {
//    id: "030cbcef-8308-48ee-9ce5-5b305c36f154",
//    name: "Leonid Kolomiytsev",
//    createdAt: new Date(),
//    counter: 0
//});
//
//console.log(result);