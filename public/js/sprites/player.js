var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        _this.pos = new Vector([Player.leftOffset, 100]);
        _this.vel = 0;
        _this.acc = 0;
        return _this;
    }
    Player.prototype.move = function (newAcc) {
        this.acc += Player.gravity;
        this.vel += this.acc;
        this.vel *= Player.drag;
        this.pos.y += this.vel;
        this.pos.x = game.scroll + Player.leftOffset;
        this.acc = newAcc;
    };
    Player.prototype.draw = function (game) {
        var topLeft = this.pos.copy().sub(new Vector([Player.radius, Player.radius]));
        var bottomRight = this.pos.copy().add(new Vector([Player.radius, Player.radius]));
        game.fillRect(topLeft, bottomRight, '#ff7777');
    };
    Player.prototype.render = function (game) {
        var newAcc = 0;
        if (game.keyboard.isPressed('Space') && this.isOnFloor()) {
            console.log('space');
            newAcc -= 20;
        }
        this.move(newAcc);
        this.groundCollision();
        this.draw(game);
    };
    Player.prototype.isOnFloor = function () {
        return Math.abs(this.pos.y + Player.radius - Ground.y) < Number.EPSILON;
    };
    Player.prototype.collision = function () {
        for (var _i = 0, _a = game.sprites; _i < _a.length; _i++) {
            var sprite = _a[_i];
            if (sprite != this) {
                // sprite.collision()
            }
        }
    };
    Player.prototype.groundCollision = function () {
        if (this.pos.y + Player.radius >= Ground.y)
            this.pos.y = Ground.y - Player.radius;
    };
    Player.radius = 20;
    Player.drag = 0.95;
    Player.gravity = 1;
    Player.leftOffset = 100;
    return Player;
}(Sprite));
