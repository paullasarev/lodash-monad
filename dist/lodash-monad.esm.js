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

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var Maybe = /** @class */ (function (_super) {
    __extends(Maybe, _super);
    function Maybe(pValue) {
        var _this = this;
        var value = pValue === undefined ? null : pValue;
        _this = _super.call(this, value) || this;
        return _this;
    }
    // Applicative
    Maybe.of = function (value) {
        return new Maybe(value);
    };
    // Functor
    Maybe.prototype.map = function (func) {
        if (this.isNull) {
            return Maybe.of(null);
        }
        return Maybe.of(func(this.value));
    };
    // Apply
    Maybe.prototype.ap = function (b) {
        return Maybe.of(b.value(this.value));
    };
    // Extend
    Maybe.prototype.extend = function (f) {
        return Maybe.of(f(this));
    };
    Object.defineProperty(Maybe.prototype, "isNull", {
        // Maybe
        get: function () {
            return this.value === null;
        },
        enumerable: true,
        configurable: true
    });
    Maybe.prototype.getOrElse = function (defValue) {
        return this.isNull ? defValue : this.value;
    };
    return Maybe;
}(Identity));

export { Identity, Maybe };
