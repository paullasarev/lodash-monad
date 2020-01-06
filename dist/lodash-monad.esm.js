var IdentityMonad = /** @class */ (function () {
    function IdentityMonad(value) {
        this.value = value;
    }
    IdentityMonad.prototype.inspect = function () {
        return "Identity(" + this.value + ")";
    };
    // due to TS limitations it's impossible to template static method
    // static of(value: T) {
    //   return new IdentityMonad(value);
    // }
    IdentityMonad.prototype.join = function () {
        return this.value;
    };
    IdentityMonad.prototype.map = function (func) {
        return Identity(func(this.value));
    };
    IdentityMonad.prototype.chain = function (func) {
        return func(this.value);
    };
    return IdentityMonad;
}());
function Identity(x) {
    return new IdentityMonad(x);
}
Identity.prototype = IdentityMonad.prototype;

var Just = /** @class */ (function () {
    function Just(value) {
        this.value = value;
    }
    Just.of = function (value) {
        return new Just(value);
    };
    return Just;
}());

export { Identity, IdentityMonad, Just };
