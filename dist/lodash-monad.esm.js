var Identity = /** @class */ (function () {
    function Identity(value) {
        this.value = value;
    }
    Identity.prototype.type = function () { return Identity; };
    Identity.prototype.inspect = function () {
        return "Identity.of(" + this.value + ")";
    };
    // Applicative
    Identity.of = function (value) {
        return new Identity(value);
    };
    // Functor
    Identity.prototype.map = function (func) {
        return Identity.of(func(this.value));
    };
    // Apply
    Identity.prototype.ap = function (b) {
        return Identity.of(b.value(this.value));
    };
    // Chain
    Identity.prototype.chain = function (func) {
        return func(this.value);
    };
    // Extend
    Identity.prototype.extend = function (f) {
        return Identity.of(f(this));
    };
    // Comonad
    Identity.prototype.extract = function () {
        return this.value;
    };
    return Identity;
}());
//# sourceMappingURL=identity.js.map

var Just = /** @class */ (function () {
    function Just(value) {
        this.value = value;
    }
    Just.of = function (value) {
        return new Just(value);
    };
    return Just;
}());
//# sourceMappingURL=maybe.js.map

export { Identity, Just };
