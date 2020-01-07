var Identity = /** @class */ (function () {
    // to keep typed access to static members via instance.constructor.prop
    // see https://github.com/Microsoft/TypeScript/issues/3841
    // ['constructor']: typeof Identity;
    function Identity(value) {
        this.value = value;
    }
    Identity.prototype.inspect = function () {
        return "Identity.of(" + this.value + ")";
    };
    Identity.of = function (value) {
        return new Identity(value);
    };
    Identity.prototype.extend = function (f) {
        return Identity.of(f(this));
    };
    Identity.prototype.extract = function () {
        return this.value;
    };
    Identity.prototype.map = function (func) {
        return Identity.of(func(this.value));
    };
    Identity.prototype.ap = function (b) {
        return Identity.of(b.value(this.value));
    };
    Identity.prototype.chain = function (func) {
        return func(this.value);
    };
    return Identity;
}());

var Just = /** @class */ (function () {
    function Just(value) {
        this.value = value;
    }
    Just.of = function (value) {
        return new Just(value);
    };
    return Just;
}());

export { Identity, Just };
