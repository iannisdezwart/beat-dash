class Floor extends Sprite {
	static y = 450

	constructor() {
		super()
	}

	render(game: Game) {
		game.fillRect(new Vector([ game.scroll, Floor.y ]),
			new Vector([ game.scroll + Game.width, Game.height ]), '#77ff77')
	}

	collision(player: Player) {
		if (player.bottom() >= Floor.y) {
			player.pos.y = Floor.y - Player.radius
			player.vel = 0
		}
	}
}