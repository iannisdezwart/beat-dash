class GravityInvertor extends Sprite {
	x: number
	playerHit = false

	static width = 0.1

	constructor(x: number) {
		super()

		this.x = x + Player.leftOffset
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

	isVisible(game: Game) {
		const minX = game.scroll
		const maxX = game.scroll + Game.width
		return this.right() > minX && this.left() < maxX
	}

	render(game: Game) {
		if (!this.isVisible(game)) return
		game.strokeLine(this.topVec(), this.bottomVec(), GravityInvertor.width, '#222')
	}

	collision(player: Player) {
		if (this.playerHit) return

		if (player.right() >= this.left() && player.left() <= this.right()) {
			this.playerHit = true
			player.isJumping = false
			player.gravityMultiplier *= -1
		}
	}
}