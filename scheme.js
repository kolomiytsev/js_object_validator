//func for synchronization default and registered model scheme values
function setValidationScheme(data) {
    var newObject = Object.keys(this.defaultScheme).reduce(function (previous, current) {
        previous[current] = data[current];
        return previous;
    }, {});
    return newObject;
}

//validation scheme
module.exports = {
    uuid: {
        defaultScheme: {required: false},
        validate: function (data) {
            var validationScheme = setValidationScheme.call(this, data);
            return function () {
                if (this === undefined) return !validationScheme.required;
                if (!(this instanceof String)) return false;
                return this.match("[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}");
            };
        }
    },
    string: {
        defaultScheme: {required: false, min: 3, max: 64},
        validate: function (data) {
            var validationScheme = setValidationScheme.call(this, data);
            return function () {
                var len = this.length;
                if (this === undefined) return !validationScheme.required;
                if (!(this instanceof String) || (len < validationScheme.min) ||
                    (len > validationScheme.max)) return false;
                return true;
            };
        }
    },
    date: {
        defaultScheme: {required: false},
        validate: function (data) {
            var validationScheme = setValidationScheme.call(this, data);
            return function () {
                if (this === undefined) return !validationScheme.required;
                return this instanceof Date;
            };
        }
    },
    number: {
        defaultScheme: {required: false, min: 0, max: 64},
        validate: function (data) {
            var validationScheme = setValidationScheme.call(this, data);
            return function () {
                if (this === undefined) return !validationScheme.required;
                if (!(this instanceof Number) || (this < validationScheme.min) ||
                    (this > validationScheme.max)) return false;
                return true;
            };
        }
    },
    email: {
        defaultScheme: {required: false, min: 5, max: 60},
        validate: function ( data ) {
            var validationScheme = setValidationScheme.call(this, data);
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return function () {
                var len = this.length;
                if (this === undefined) return !validationScheme.required;
                if (!(this instanceof String) || (len < validationScheme.min) ||
                    (len > validationScheme.max)) return false;
                return re.test(this);
            };
        }
    },
    object: {
        defaultScheme: {required: false},
        validate: function ( data ) {
            var validationScheme = setValidationScheme.call(this, data);
            return function () {
                if (this === undefined) return !validationScheme.required;
                if (!((!!this) && (this.constructor === Object))) return false;
                return true;
            };
        }
    }
};
