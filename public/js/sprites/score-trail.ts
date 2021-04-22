enum PopStates {
	NOT_POPPED,
	BEING_POPPED,
	POPPED
}

class ScoreTrail extends Sprite {
	pos: Vector
	left: number
	width: number
	pointsLeft: boolean
	popState = PopStates.NOT_POPPED
	popStart: number

	static backgroundColourLeft = ScoreBlock.backgroundColourLeft
	static backgroundColourRight = ScoreBlock.backgroundColourRight
	static arrowColour = ScoreBlock.arrowColour
	static height = ScoreBlock.height
	static leftOffset = ScoreBlock.leftOffset
	static rewardPerBeat = 20

	constructor(pos: Vector, width: number, onCeiling = false, pointsLeft = true) {
		super()

		this.pos = pos
		this.width = width
		if (onCeiling) this.pos.y += ScoreTrail.height
		this.pos.x += Player.leftOffset + ScoreTrail.leftOffset
		this.left = this.pos.x
		this.pointsLeft = pointsLeft
	}

	topLeft() {
		return new Vector([ this.left, this.pos.y - ScoreTrail.height ])
	}

	bottomRight() {
		return new Vector([ this.pos.x + this.width, this.pos.y ])
	}

	middleY() {
		return this.pos.y - ScoreTrail.height / 2
	}

	isVisible(game: Game) {
		const minX = game.scroll
		const maxX = game.scroll + Game.width
		return this.bottomRight().x > minX && this.topLeft().x < maxX
	}

	render(game: Game) {
		if (this.popState == PopStates.POPPED || !this.isVisible(game)) return

		if (
			this.bottomRight().x < game.player.pos.x
			&& this.popState == PopStates.BEING_POPPED
		) {
			this.handlePlayerSlideEnd(game.player)
			return
		}

		const xOffset = ScoreTrail.height / 4
		const xInterval = ScoreTrail.height * 2

		// Draw left pointing arrows

		if (this.pointsLeft) {
			game.fillRect(this.topLeft(), this.bottomRight(), ScoreTrail.backgroundColourLeft)

			for (
				let x = this.pos.x + xOffset;
				x < this.pos.x + xOffset + this.width;
				x += xInterval
			) {
				if (x < this.left) continue

				const middleX = x + ScoreTrail.height / 2

				const left = new Vector([ x, this.middleY() ])
				const top = new Vector([ middleX, this.topLeft().y ])
				const bottom = new Vector([ middleX, this.bottomRight().y ])

				game.fillPolygon([ top, left, bottom, top ], ScoreTrail.arrowColour)
			}
		}

		// Draw right pointing arrows

		else {
			game.fillRect(this.topLeft(), this.bottomRight(), ScoreTrail.backgroundColourRight)

			for (
				let x = this.pos.x - xOffset + ScoreTrail.height;
				x < this.pos.x - xOffset + this.width + ScoreTrail.height;
				x += xInterval
			) {
				if (x - ScoreTrail.height / 2 < this.left) continue

				const middleX = x - ScoreTrail.height / 2

				const right = new Vector([ x, this.middleY() ])
				const top = new Vector([ middleX, this.topLeft().y ])
				const bottom = new Vector([ middleX, this.bottomRight().y ])

				game.fillPolygon([ top, right, bottom, top ], ScoreTrail.arrowColour)
			}
		}
	}

	collision(player: Player) {
		if (this.popState == PopStates.POPPED) return

		if (
			player.right() >= this.topLeft().x && player.left() <= this.bottomRight().x
			&& player.bottom() >= this.topLeft().y && player.top() <= this.bottomRight().y
		) {
			// Pop left pointing score trail by pressing F

			if (this.pointsLeft) {
				if (
					this.popState == PopStates.NOT_POPPED
					&& player.game.keyboard.isPressed('KeyF')
				) {
					this.handlePlayerSlideStart(player)
				} else if (this.popState == PopStates.BEING_POPPED) {
					if (player.game.keyboard.isPressed('KeyF')) {
						this.handlePlayerSlide(player)
					} else {
						this.handlePlayerSlideEnd(player)
					}
				}
			}

			// Pop right pointing score trail by pressing J

			else {
				if (
					this.popState == PopStates.NOT_POPPED
					&& player.game.keyboard.isPressed('KeyJ')
				) {
					this.handlePlayerSlideStart(player)
				} else if (this.popState == PopStates.BEING_POPPED) {
					if (player.game.keyboard.isPressed('KeyJ')) {
						this.handlePlayerSlide(player)
					} else {
						this.handlePlayerSlideEnd(player)
					}
				}
			}
		}
	}

	handlePlayerSlideStart(player: Player) {
		this.popState = PopStates.BEING_POPPED
		this.popStart = player.pos.x
	}

	handlePlayerSlide(player: Player) {
		this.left = player.pos.x + Player.radius
	}

	handlePlayerSlideEnd(player: Player) {
		this.popState = PopStates.POPPED

		const slidedDistance = player.pos.x - this.popStart
		const score = Math.round(Math.min(slidedDistance, this.width)
			* ScoreTrail.rewardPerBeat)

		player.addScore(score)
		player.scoreTrailDistanceSlided += slidedDistance
	}
}