class ScoreBlock extends Sprite {
	pos: Vector
	pointsLeft: boolean
	popped = false

	static backgroundColourLeft = '#00ff00'
	static backgroundColourRight = '#ff00ff'
	static arrowColour = '#ffffff'
	static width = 0.04
	static height = ScoreBlock.width
	static leftOffset = 0.3
	static hitReward = 10

	constructor(pos: Vector, onCeiling = false, pointsLeft = true) {
		super()

		this.pos = pos
		if (onCeiling) this.pos.y += ScoreBlock.height
		this.pos.x += Player.leftOffset + ScoreBlock.leftOffset
		this.pointsLeft = pointsLeft
	}

	topLeft() {
		return new Vector([ this.pos.x - ScoreBlock.width / 2, this.pos.y - ScoreBlock.height ])
	}

	bottomRight() {
		return new Vector([ this.pos.x + ScoreBlock.width / 2, this.pos.y ])
	}

	middleY() {
		return this.pos.y - ScoreBlock.height / 2
	}

	render(game: Game) {
		if (this.popped) return

		const xOffset = ScoreBlock.width / 4

		// Draw left pointing arrow

		if (this.pointsLeft) {
			game.fillRect(this.topLeft(), this.bottomRight(), ScoreBlock.backgroundColourLeft)
			const left = new Vector([ this.topLeft().x + xOffset, this.middleY() ])
			const top = new Vector([ this.pos.x + xOffset, this.topLeft().y ])
			const bottom = new Vector([ this.pos.x + xOffset, this.bottomRight().y ])

			game.fillPolygon([ top, left, bottom, top ], ScoreBlock.arrowColour)
		}

		// Draw right pointing arrow

		else {
			game.fillRect(this.topLeft(), this.bottomRight(), ScoreBlock.backgroundColourRight)
			const right = new Vector([ this.bottomRight().x - xOffset, this.middleY() ])
			const top = new Vector([ this.pos.x - xOffset, this.topLeft().y ])
			const bottom = new Vector([ this.pos.x - xOffset, this.bottomRight().y ])

			game.fillPolygon([ top, right, bottom, top ], ScoreBlock.arrowColour)
		}
	}

	collision(player: Player) {
		if (this.popped) return

		if (
			player.right() >= this.topLeft().x && player.left() <= this.bottomRight().x
			&& player.bottom() >= this.topLeft().y && player.top() <= this.bottomRight().y
		) {
			// Pop left pointing score block by pressing F

			if (this.pointsLeft && player.game.keyboard.isPressed('KeyF')) {
				this.popped = true
				player.addScore(ScoreBlock.hitReward)
			}

			// Pop right pointing score block by pressing J

			else if (!this.pointsLeft && player.game.keyboard.isPressed('KeyJ')) {
				this.popped = true
				player.addScore(ScoreBlock.hitReward)
			}
		}
	}
}