class Ground extends Sprite {
	static y = 450

	constructor() {
		super()
	}

	render(game: Game) {
		game.fillRect(new Vector([ game.scroll, Ground.y ]),
			new Vector([ game.scroll + Game.width, Game.height ]), '#77ff77')
	}
}