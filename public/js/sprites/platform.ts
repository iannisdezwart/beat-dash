class Platform extends Sprite {
	x: number
	width: number
	height: number
	topLeft: Vector
	bottomRight: Vector
	playerPassed = false

	constructor(x: number, width: number, height: number) {
		super()
		this.x = x
		this.width = width
		this.height = height
	}

	render(game: Game) {
		this.topLeft = new Vector([ this.x, Floor.y - this.height ])
		this.bottomRight = new Vector([ this.x + this.width, Floor.y ])

		game.fillRect(this.topLeft, this.bottomRight, '#7777ff')
	}

	collision(player: Player) {
		if (
			player.pos.x + Player.radius > this.topLeft.x
			&& player.pos.x - Player.radius < this.bottomRight.x
		) {
			if (!this.playerPassed && player.pos.y + Player.radius > this.topLeft.y) {
				alert('you died')
			} else if (player.pos.y + Player.radius > this.topLeft.y) {
				player.pos.y = this.topLeft.y - Player.radius
			}

			this.playerPassed = true
		}
	}
}