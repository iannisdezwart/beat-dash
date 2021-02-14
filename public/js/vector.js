var Vector = /** @class */ (function () {
    function Vector(initialValues) {
        this.values = [];
        for (var i = 0; i < initialValues.length; i++) {
            this.values[i] = initialValues[i];
        }
    }
    Object.defineProperty(Vector.prototype, "x", {
        get: function () {
            return this.values[0];
        },
        set: function (v) {
            this.values[0] = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "y", {
        get: function () {
            return this.values[1];
        },
        set: function (v) {
            this.values[1] = v;
        },
        enumerable: false,
        configurable: true
    });
    Vector.prototype.dim = function () {
        return this.values.length;
    };
    Vector.prototype.get = function (i) {
        return this.values[i];
    };
    Vector.prototype.set = function (i, v) {
        this.values[i] = v;
    };
    Vector.prototype.each = function (callback) {
        for (var i = 0; i < this.dim(); i++) {
            this.set(i, callback(this.get(i), i));
        }
        return this;
    };
    Vector.prototype.add = function (v) {
        if (this.dim() != v.dim())
            throw 'invalid dimension';
        return this.each(function (el, i) { return el + v.get(i); });
    };
    Vector.prototype.sub = function (v) {
        if (this.dim() != v.dim())
            throw 'invalid dimension';
        return this.each(function (el, i) { return el - v.get(i); });
    };
    Vector.prototype.mul = function (v) {
        return this.each(function (el) { return el * v; });
    };
    Vector.prototype.div = function (v) {
        return this.each(function (el) { return el / v; });
    };
    Vector.prototype.len = function () {
        return Math.hypot.apply(Math, this.values);
    };
    Vector.prototype.ang = function () {
        if (this.dim() != 2)
            throw 'invalid dimension';
        return Math.atan2(this.y, this.x);
    };
    Vector.prototype.cap = function (max) {
        if (this.len() > max)
            return Vector.fromAng(this.ang()).mul(max);
        return this;
    };
    Vector.prototype.copy = function () {
        return new Vector(this.values);
    };
    Vector.fromAng = function (ang) {
        return new Vector([Math.cos(ang), Math.sin(ang)]);
    };
    return Vector;
}());
