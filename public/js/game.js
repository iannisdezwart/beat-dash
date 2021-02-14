var Game = /** @class */ (function () {
    function Game(canvasID) {
        var _this = this;
        this.keyboard = new Keyboard();
        this.sprites = [];
        this.scroll = 0;
        this.canvas = document.querySelector(canvasID);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        addEventListener('resize', function () {
            _this.resize();
        });
    }
    Game.prototype.addPlayer = function (player) {
        this.sprites.push(player);
        this.player = player;
    };
    Game.prototype.start = function () {
        var _this = this;
        setInterval(function () {
            _this.update();
        }, 16.67);
    };
    Game.prototype.resize = function () {
        var wantedHeight = innerWidth / Game.width * Game.height;
        var wantedWidth = innerHeight / Game.height * Game.width;
        if (innerHeight > wantedHeight) {
            // Black bars on top
            this.canvas.width = innerWidth;
            this.canvas.height = wantedHeight;
        }
        else {
            // Black bars on the sides
            this.canvas.height = innerHeight;
            this.canvas.width = wantedWidth;
        }
        this.scale = Game.width / innerWidth;
    };
    Game.prototype.update = function () {
        // Clear canvas
        this.ctx.beginPath();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.closePath();
        // Scroll
        this.scroll += Game.scrollSpeed;
        // Render sprites
        for (var _i = 0, _a = this.sprites; _i < _a.length; _i++) {
            var sprite = _a[_i];
            sprite.render(this);
        }
    };
    Game.prototype.beginPath = function () {
        this.ctx.beginPath();
    };
    Game.prototype.closePath = function () {
        this.ctx.closePath();
    };
    Game.prototype.translate = function (v) {
        return v.copy().sub(new Vector([game.scroll, 0])).div(this.scale);
    };
    Game.prototype.fillRect = function (topLeft, bottomRight, colour) {
        this.beginPath();
        topLeft = this.translate(topLeft);
        bottomRight = this.translate(bottomRight);
        var x = topLeft.x;
        var y = topLeft.y;
        var width = bottomRight.x - x;
        var height = bottomRight.y - y;
        this.ctx.fillStyle = colour;
        this.ctx.fillRect(x, y, width, height);
        this.closePath();
    };
    Game.width = 1000;
    Game.height = 500;
    Game.scrollSpeed = 10;
    return Game;
}());
