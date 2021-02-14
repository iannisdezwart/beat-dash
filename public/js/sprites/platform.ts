class Platform extends Sprite {
	x: number
	width: number
	height: number
	playerPassed = false

	constructor(x: number, width: number, height: number) {
		super()
		this.x = x
		this.width = width
		this.height = height
	}

	render(game: Game) {
		const topLeft = new Vector([ this.x, Ground.y - this.height ])
		const bottomRight = new Vector([ this.x + this.width, Ground.y ])

		game.fillRect(topLeft, bottomRight, '#7777ff')

		this.collision(game.player, topLeft, bottomRight)
	}

	collision(player: Player, topLeft: Vector, bottomRight: Vector) {
		if (player.pos.x + Player.radius > topLeft.x && player.pos.x - Player.radius < bottomRight.x) {
			if (!this.playerPassed && player.pos.y + Player.radius > topLeft.y) {
				alert('you died')
			} else if (player.pos.y + Player.radius > topLeft.y) {
				player.pos.y = topLeft.y - Player.radius
			}

			this.playerPassed = true
		}
	}
}