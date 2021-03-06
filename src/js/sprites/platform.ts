class Platform extends Sprite {
	x: number
	width: number
	height: number
	onCeiling: boolean

	topLeft: Vector
	bottomRight: Vector

	playerPassed = false
	playerHit = false

	static hitPenalty = 5

	constructor(x: number, width: number, height: number, onCeiling = false) {
		super()
		this.x = x + Player.leftDelay
		this.width = width
		this.height = height
		this.onCeiling = onCeiling

		// Floor platform

		if (!this.onCeiling) {
			this.topLeft = new Vector([ this.x, Floor.y - this.height ])
			this.bottomRight = new Vector([ this.x + this.width, Floor.y ])
		}

		// Ceiling platform

		else {
			this.topLeft = new Vector([ this.x, Ceiling.y ])
			this.bottomRight = new Vector([ this.x + this.width, Ceiling.y + this.height ])
		}
	}

	left() {
		return this.x
	}

	right() {
		return this.x + this.width
	}

	isVisible(game: Game) {
		const minX = game.scroll
		const maxX = game.scroll + Game.width
		return this.right() > minX && this.left() < maxX
	}

	render(game: Game) {
		if (!this.isVisible(game)) return
		game.fillRect(this.topLeft, this.bottomRight, '#3a86ff')
	}

	isInside(pos: Vector) {
		const left = this.topLeft.x
		const right = this.bottomRight.x
		const top = this.topLeft.y
		const bottom = this.bottomRight.y

		return (pos.x >= left && pos.x <= right && pos.y >= top && pos.y <= bottom)
	}

	collision(player: Player) {
		// If the player is within the x positions of the platform

		if (
			player.right() > this.topLeft.x
			&& player.left() < this.bottomRight.x
		) {
			// If gravity is normal

			if (player.gravityMultiplier >= 0) {
				// If the player collides with the left of the platform, kill them

				if (!this.playerPassed && !this.playerHit && player.bottom() > this.topLeft.y) {
					this.handlePlayerHit(player)
				}

				// If this is a floor platform, put the player on top of the platform

				if (player.bottom() > this.topLeft.y && !this.onCeiling) {
					player.pos.y = this.topLeft.y - Player.radius
					player.isJumping = false
					player.stopFalling()
				}
			}

			// If gravity is inverted

			else {
				// If the player collides with the left of the platform, kill them

				if (!this.playerPassed && !this.playerHit && player.top() < this.bottomRight.y) {
					this.handlePlayerHit(player)
				}

				// If this is a ceiling platform, put the player on the bottom of the platform

				if (player.top() < this.bottomRight.y && this.onCeiling) {
					player.pos.y = this.bottomRight.y + Player.radius
					player.isJumping = false
					player.stopFalling()
				}
			}

			this.playerPassed = true
		}
	}

	handlePlayerHit(player: Player) {
		this.playerHit = true
		player.subtractScore(Platform.hitPenalty)
		player.platformsMissed++
	}

	putPlayerOnTop(player: Player) {
		player.pos.y = this.topLeft.y - Player.radius
		player.isJumping = false
		player.stopFalling()
	}
}