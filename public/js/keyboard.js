var Keyboard = /** @class */ (function () {
    function Keyboard() {
        // Add listeners for the isPressed method
        var _this = this;
        this.pressedKeys = {};
        addEventListener('keydown', function (e) { return _this.pressedKeys[e.code] = true; });
        addEventListener('keyup', function (e) { return _this.pressedKeys[e.code] = false; });
    }
    Keyboard.prototype.isPressed = function (key) {
        return this.pressedKeys[key] == true;
    };
    return Keyboard;
}());
