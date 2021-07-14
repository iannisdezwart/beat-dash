class Ceiling extends Sprite {
	static get y() { return 0.05 * Game.fov }

	constructor() {
		super()
	}

	render(game: Game) {
		game.fillRect(new Vector([ game.scroll, 0 ]),
			new Vector([ game.scroll + Game.width, Ceiling.y ]), '#fb5607')
	}

	isInside(pos: Vector) {
		return pos.y <= Ceiling.y
	}

	collision(player: Player) {
		if (player.top() <= Ceiling.y) {
			player.pos.y = Ceiling.y + Player.radius
			player.isJumping = false
			player.stopFalling()
		}
	}
}