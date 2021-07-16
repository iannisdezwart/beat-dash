enum SpikeCeilingOrientation {
	SPIKES_POINT_DOWN,
	SPIKES_POINT_UP
}

class SpikeCeiling extends Sprite {
	pos: Vector
	orientation: SpikeCeilingOrientation
	numSpikes: number
	onCeiling: boolean
	lastHitOnFloorTime: number

	static ceilingHeight = 0.05 * Game.fov
	static spikeHeight = 0.05 * Game.fov
	static spikeWidth = 0.05 * Game.fov
	static hitPenalty = 5

	static get spikeSlope() {
		return SpikeCeiling.spikeHeight / (SpikeCeiling.spikeWidth / 2)
	}

	get width() { return SpikeCeiling.spikeWidth * this.numSpikes }

	constructor(
		pos: Vector,
		orientation: SpikeCeilingOrientation,
		numSpikes: number,
		onCeiling = false
	) {
		super()

		this.pos = pos
		this.pos.x += Player.leftDelay

		this.orientation = orientation
		this.numSpikes = numSpikes
		this.onCeiling = onCeiling
	}

	left() {
		return this.pos.x
	}

	right() {
		return this.pos.x + this.width
	}

	ceilingTop() {
		return this.orientation == SpikeCeilingOrientation.SPIKES_POINT_DOWN
			? this.pos.y - SpikeCeiling.spikeHeight - SpikeCeiling.ceilingHeight
			: this.pos.y + SpikeCeiling.spikeHeight + SpikeCeiling.ceilingHeight
	}

	ceilingBottom() {
		return this.orientation == SpikeCeilingOrientation.SPIKES_POINT_DOWN
			? this.pos.y - SpikeCeiling.spikeHeight
			: this.pos.y + SpikeCeiling.spikeHeight
	}
	
	spikeTop() {
		return this.orientation == SpikeCeilingOrientation.SPIKES_POINT_DOWN
		? this.pos.y
		: this.pos.y
	}

	spikeBottom() {
		return this.orientation == SpikeCeilingOrientation.SPIKES_POINT_DOWN
			? this.pos.y - SpikeCeiling.spikeHeight
			: this.pos.y + SpikeCeiling.spikeHeight
	}

	isVisible(game: Game) {
		const minX = game.scroll
		const maxX = game.scroll + Game.width
		return this.right() > minX && this.left() < maxX
	}

	render(game: Game) {
		if (!this.isVisible(game)) return

		// Render ceiling

		game.fillRect(
			new Vector([ this.left(), this.ceilingTop() ]),
			new Vector([ this.right(), this.ceilingBottom() ]),
			'#d115a8'
		)

		// Render spikes

		for (let i = 0; i < this.numSpikes; i++) {
			const spikeLeft = this.left() + i * SpikeCeiling.spikeWidth
			const spikeMiddle = this.left() + (i + 1 / 2) * SpikeCeiling.spikeWidth
			const spikeRight = this.left() + (i + 1) * SpikeCeiling.spikeWidth

			const bottomLeft = new Vector([ spikeLeft, this.spikeBottom() ])
			const top = new Vector([ spikeMiddle, this.spikeTop() ])
			const bottomRight = new Vector([ spikeRight, this.spikeBottom() ])

			game.fillPolygon([
				bottomLeft, top, bottomRight, bottomLeft
			], i % 2 ? '#0000ff' : '#ff0000')
		}
	}

	isInside(pos: Vector) {
		if (pos.x < this.left() || pos.x > this.right()) return false

		if (this.orientation == SpikeCeilingOrientation.SPIKES_POINT_DOWN) {
			// Check ceiling

			if (pos.y > this.ceilingTop() && pos.y < this.ceilingBottom()) {
				return true
			}

			// Check spikes

			if (pos.y < this.spikeBottom() || pos.y > this.spikeTop()) {
				return false
			}

			const spikeIndex = Math.floor((pos.x - this.left()) / SpikeCeiling.spikeWidth)
			const spikeLeft = this.left() + SpikeCeiling.spikeWidth * spikeIndex
			const spikeMiddle = this.left() + SpikeCeiling.spikeWidth * (spikeIndex + 1 / 2)
			const spikeRight = this.left() + SpikeCeiling.spikeWidth * (spikeIndex + 1)

			// Check left half

			if (pos.x < spikeMiddle) {
				const minY = this.spikeBottom() + SpikeCeiling.spikeSlope * (pos.x - spikeLeft)
				if (pos.y < minY) return true
				return false
			}

			// Check right half

			else {
				const minY = this.spikeBottom() + SpikeCeiling.spikeSlope * (spikeRight - pos.x)
				if (pos.y < minY) return true
				return false
			}
		}

		else {
			// Check ceiling

			if (pos.y > this.ceilingBottom() && pos.y < this.ceilingTop()) {
				return true
			}

			// Check spikes

			if (pos.y < this.spikeTop() || pos.y > this.spikeBottom()) {
				return false
			}

			const spikeIndex = Math.floor((pos.x - this.left()) / SpikeCeiling.spikeWidth)
			const spikeLeft = this.left() + SpikeCeiling.spikeWidth * spikeIndex
			const spikeMiddle = this.left() + SpikeCeiling.spikeWidth * (spikeIndex + 1 / 2)
			const spikeRight = this.left() + SpikeCeiling.spikeWidth * (spikeIndex + 1)

			// Check left half

			if (pos.x < spikeMiddle) {
				const minY = this.spikeBottom() - SpikeCeiling.spikeSlope * (pos.x - spikeLeft)
				if (pos.y > minY) return true
				return false
			}

			// Check right half

			else {
				const minY = this.spikeBottom() - SpikeCeiling.spikeSlope * (spikeRight - pos.x)
				if (pos.y > minY) return true
				return false
			}
		}
	}

	collision(player: Player) {
		// If the player is within the x positions of the spike ceiling

		if (
			player.right() > this.left()
			&& player.left() < this.right()
		) {
			if (this.orientation == SpikeCeilingOrientation.SPIKES_POINT_DOWN) {
				// If the player is above the ceiling, skip

				if (player.bottom() < this.ceilingTop()) return

				// If the player hits the ceiling from aside, kill them

				if (
					player.left() < this.left()
					&& player.top() < this.ceilingBottom()
					&& player.bottom() > this.ceilingTop()
				) {
					this.handlePlayerHit(player)
				}

				// If the player lands on the ceiling from above, put them on top

				if (
					player.top() < this.ceilingTop()
					&& player.bottom() > this.ceilingTop()
					&& player.gravityMultiplier > 0
				) {
					player.pos.y = this.ceilingTop() - Player.radius
					player.isJumping = false
					player.stopFalling()
					return
				}

				// If the player hits a spike, kill them

				const spikeIndex = Math.floor((player.pos.x - this.left()) / SpikeCeiling.spikeWidth)
				const spikeLeft = this.left() + SpikeCeiling.spikeWidth * spikeIndex
				const spikeMiddle = this.left() + SpikeCeiling.spikeWidth * (spikeIndex + 1 / 2)
				const spikeRight = this.left() + SpikeCeiling.spikeWidth * (spikeIndex + 1)

				// If the player should be below the spike

				if (player.left() <= spikeMiddle && player.right() >= spikeMiddle) {
					if (player.top() < this.spikeTop()) {
						this.handlePlayerHit(player)
					}
				}

				// If the player is on the left side of the spike

				else if (player.right() < spikeMiddle) {
					const minY = this.spikeTop() - SpikeCeiling.spikeSlope * (player.right() - spikeLeft)

					if (player.top() < minY) {
						this.handlePlayerHit(player)
					}
				}

				// If the player is on the right side of the spike

				else {
					const minY = this.spikeTop() - SpikeCeiling.spikeSlope * (spikeRight - player.left())

					if (player.top() < minY) {
						this.handlePlayerHit(player)
					}
				}
			}

			else {
				// If the player is below the ceiling, skip

				if (player.top() > this.ceilingTop()) return

				// If the player hits the ceiling from aside, kill them

				if (
					player.left() < this.left()
					&& player.top() > this.ceilingBottom()
					&& player.bottom() < this.ceilingTop()
				) {
					this.handlePlayerHit(player)
				}

				// If the player lands on the ceiling from above, put them on top

				if (
					player.bottom() > this.ceilingTop()
					&& player.top() < this.ceilingTop()
					&& player.gravityMultiplier < 0
				) {
					player.pos.y = this.ceilingTop() + Player.radius
					player.isJumping = false
					player.stopFalling()
					return
				}

				// If the player hits a spike, kill them

				const spikeIndex = Math.floor((player.pos.x - this.left()) / SpikeCeiling.spikeWidth)
				const spikeLeft = this.left() + SpikeCeiling.spikeWidth * spikeIndex
				const spikeMiddle = this.left() + SpikeCeiling.spikeWidth * (spikeIndex + 1 / 2)
				const spikeRight = this.left() + SpikeCeiling.spikeWidth * (spikeIndex + 1)

				// If the player should be above the spike

				if (player.left() <= spikeMiddle && player.right() >= spikeMiddle) {
					if (player.bottom() > this.spikeTop()) {
						this.handlePlayerHit(player)
					}
				}

				// If the player is on the left side of the spike

				else if (player.right() < spikeMiddle) {
					const minY = this.spikeTop() + SpikeCeiling.spikeSlope * (player.right() - spikeLeft)

					if (player.top() > minY) {
						this.handlePlayerHit(player)
					}
				}

				// If the player is on the right side of the spike

				else {
					const minY = this.spikeTop() + SpikeCeiling.spikeSlope * (spikeRight - player.left())

					if (player.top() > minY) {
						this.handlePlayerHit(player)
					}
				}
			}
		}
	}

	handlePlayerHit(player: Player) {
		if (this.lastHitOnFloorTime == player.lastTimeOnFloor) return

		player.subtractScore(SpikeCeiling.hitPenalty)
		player.spikesHit++
		player.isJumping = false
		this.lastHitOnFloorTime = player.lastTimeOnFloor
	}
}