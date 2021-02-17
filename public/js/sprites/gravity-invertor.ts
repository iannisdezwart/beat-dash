class GravityInvertor extends Sprite {
	x: number
	playerHit = false

	static width = 0.1

	constructor(x: number) {
		super()

		this.x = x
	}

	topVec() {
		return new Vector([ this.x, Ceiling.y ])
	}

	bottomVec() {
		return new Vector([ this.x, Floor.y ])
	}

	left() {
		return this.x - GravityInvertor.width / 2
	}

	right() {
		return this.x + GravityInvertor.width / 2
	}

	render(game: Game) {
		game.strokeLine(this.topVec(), this.bottomVec(), GravityInvertor.width, '#555')
	}

	collision(player: Player) {
		if (this.playerHit) return

		if (player.right() >= this.left() && player.right() <= this.left()) {
			this.playerHit = true
			player.gravityMultiplier *= -1
		}
	}
}