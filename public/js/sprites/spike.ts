class Spike extends Sprite {
	pos: Vector
	onCeiling: boolean
	colour: string

	static width = 0.05
	static height = 0.05
	static get slope() { return Spike.height / (Spike.width / 2) }

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

	render(game: Game) {
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
			player.right() >= this.left()
			&& player.left() <= this.right()
		) {
			// If gravity is normal

			if (player.gravityMultiplier >= 0) {
				// If the player should be above the spike

				if (player.left() <= this.middle() && player.right() >= this.middle()) {
					if (player.bottom() >= this.top()) player.kill()
				}

				// If the player is on the left side of the spike

				else if (player.right() < this.middle()) {
					const minY = this.bottom() + Spike.slope * (player.right() - this.left())
					if (player.bottom() > minY) player.kill()
				}

				// If the player is on the right side of the spike

				else {
					const minY = this.top() - Spike.slope * (this.right() - player.left())
					if (player.bottom() > minY) player.kill()
				}
			}

			// If gravity is inverted

			else {

			}
		}
	}
}