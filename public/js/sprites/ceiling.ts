class Ceiling extends Sprite {
	static y = 50

	constructor() {
		super()
	}

	render(game: Game) {
		game.fillRect(new Vector([ game.scroll, 0 ]),
			new Vector([ game.scroll + Game.width, Ceiling.y ]), '#77ff77')
	}

	collision(player: Player) {
		if (player.top() <= Ceiling.y) {
			player.pos.y = Ceiling.y + Player.radius
			player.vel = 0
		}
	}
}