class Floor extends Sprite {
	static y = Game.height - 0.05

	constructor() {
		super()
	}

	render(game: Game) {
		game.fillRect(new Vector([ game.scroll, Floor.y ]),
			new Vector([ game.scroll + Game.width, Game.height ]), '#fb5607')
	}

	isInside(pos: Vector) {
		return pos.y >= Floor.y
	}

	collision(player: Player) {
		if (player.bottom() >= Floor.y) {
			player.pos.y = Floor.y - Player.radius
			player.isJumping = false
		}
	}
}