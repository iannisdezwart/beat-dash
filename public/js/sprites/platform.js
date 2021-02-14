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
var Platform = /** @class */ (function (_super) {
    __extends(Platform, _super);
    function Platform(x, width, height) {
        var _this = _super.call(this) || this;
        _this.playerPassed = false;
        _this.x = x;
        _this.width = width;
        _this.height = height;
        return _this;
    }
    Platform.prototype.render = function (game) {
        var topLeft = new Vector([this.x, Ground.y - this.height]);
        var bottomRight = new Vector([this.x + this.width, Ground.y]);
        game.fillRect(topLeft, bottomRight, '#7777ff');
        this.collision(game.player, topLeft, bottomRight);
    };
    Platform.prototype.collision = function (player, topLeft, bottomRight) {
        if (player.pos.x + Player.radius > topLeft.x && player.pos.x - Player.radius < bottomRight.x) {
            if (!this.playerPassed && player.pos.y + Player.radius > topLeft.y) {
                alert('you died');
            }
            else if (player.pos.y + Player.radius > topLeft.y) {
                player.pos.y = topLeft.y - Player.radius;
            }
            this.playerPassed = true;
        }
    };
    return Platform;
}(Sprite));
