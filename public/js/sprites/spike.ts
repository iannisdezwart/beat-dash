class Spike extends Sprite {
	pos: Vector
	onCeiling: boolean
	colour: string

	playerHit = false

	static width = 0.05
	static height = 0.05
	static get slope() { return Spike.height / (Spike.width / 2) }

	static hitPenalty = 5

	constructor(pos: Vector, onCeiling = false, colour = '#8338ec') {
		super()
		this.pos = pos
		this.pos.x += Player.leftDelay
		this.onCeiling = onCeiling
		this.colour = colour
	}

	left() {
		return this.pos.x - Spike.width / 2
	}

	right() {
		return this.pos.x + Spike.width / 2
	}

	top() {
		return this.onCeiling
			? this.pos.y + Spike.height
			: this.pos.y - Spike.height
	}

	bottom() {
		return this.pos.y
	}

	middle() {
		return this.pos.x
	}

	isVisible(game: Game) {
		const minX = game.scroll
		const maxX = game.scroll + Game.width
		return this.right() > minX && this.left() < maxX
	}

	render(game: Game) {
		if (!this.isVisible(game)) return

		game.fillPolygon([
			new Vector([ this.left(), this.bottom() ]),
			new Vector([ this.middle(), this.top() ]),
			new Vector([ this.right(), this.bottom() ]),
		], this.colour)
	}

	isInside(pos: Vector) {
		if (pos.x < this.left() || pos.x > this.right()) return false
		if (pos.y < this.top() || pos.y > this.bottom()) return false

		// Check left half

		if (pos.x < this.middle()) {
			const minY = this.bottom() + Spike.slope * (pos.x - this.left())
			if (pos.y > minY) return true
			return false
		}

		// Check right half

		else {
			const minY = this.top() - Spike.slope * (this.right() - pos.x)
			if (pos.y > minY) return true
			return false
		}
	}

	collision(player: Player) {
		// If the player is within the x values of this spike

		if (
			!this.playerHit
			&& player.right() >= this.left()
			&& player.left() <= this.right()
		) {
			// If gravity is normal

			if (player.gravityMultiplier >= 0 && !this.onCeiling) {
				// If the player should be above the spike

				if (player.left() <= this.middle() && player.right() >= this.middle()) {
					if (player.bottom() >= this.top()) {
						this.handlePlayerHit(player)
					}
				}

				// If the player is on the left side of the spike

				else if (player.right() < this.middle()) {
					const minY = this.bottom() + Spike.slope * (player.right() - this.left())
					if (player.bottom() > minY) {
						this.handlePlayerHit(player)
					}
				}

				// If the player is on the right side of the spike

				else {
					const minY = this.top() - Spike.slope * (this.right() - player.left())
					if (player.bottom() > minY) {
						this.handlePlayerHit(player)
					}
				}
			}

			// If gravity is inverted

			else if (this.onCeiling) {
				// If the player should be below the spike

				if (player.left() <= this.middle() && player.right() >= this.middle()) {
					if (player.top() <= this.top()) {
						this.handlePlayerHit(player)
					}
				}

				// If the player is on the left side of the spike

				else if (player.right() < this.middle()) {
					const minY = this.bottom() + Spike.slope * (player.right() - this.left())
					if (player.top() < minY) {
						this.handlePlayerHit(player)
					}
				}

				// If the player is on the right side of the spike

				else {
					const minY = this.top() + Spike.slope * (this.right() - player.left())
					if (player.top() < minY) {
						this.handlePlayerHit(player)
					}
				}
			}
		}
	}

	handlePlayerHit(player: Player) {
		this.playerHit = true
		player.subtractScore(Spike.hitPenalty)
		player.spikesHit++
	}
}