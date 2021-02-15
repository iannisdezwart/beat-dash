class Ceiling extends Sprite {
	static y = 0.05

	constructor() {
		super()
	}

	render(game: Game) {
		game.fillRect(new Vector([ game.scroll, 0 ]),
			new Vector([ game.scroll + Game.width, Ceiling.y ]), '#fb5607')
	}

	collision(player: Player) {
		if (player.top() <= Ceiling.y) {
			player.pos.y = Ceiling.y + Player.radius
			player.vel = 0
		}
	}
}