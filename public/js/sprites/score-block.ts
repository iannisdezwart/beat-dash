enum ScoreBlockOrientation {
	LEFT,
	RIGHT,
	TOP_LEFT,
	TOP_RIGHT
}

class ScoreBlock extends Sprite {
	pos: Vector
	orientation: ScoreBlockOrientation
	popped = false

	static backgroundColourLeft = '#00ff00'
	static backgroundColourRight = '#ff00ff'
	static backgroundColourTopLeft = '#77ff77'
	static backgroundColourTopRight = '#ff77ff'
	static arrowColour = '#ffffff'
	static get width() { return 0.04 * Game.fov }
	static height = ScoreBlock.width
	static leftOffset = 0.3
	static hitReward = 10

	constructor(pos: Vector, onCeiling = false, orientation = ScoreBlockOrientation.LEFT) {
		super()

		this.pos = pos
		if (onCeiling) this.pos.y += ScoreBlock.height
		this.pos.x += Player.leftOffset + ScoreBlock.leftOffset
		this.orientation = orientation
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

	isVisible(game: Game) {
		const minX = game.scroll
		const maxX = game.scroll + Game.width
		return this.bottomRight().x > minX && this.topLeft().x < maxX
	}

	render(game: Game) {
		if (this.popped || !this.isVisible(game)) return

		const xOffset = ScoreBlock.width / 4
		const xBorder = ScoreBlock.width / 8

		// Draw left pointing arrow

		if (this.orientation == ScoreBlockOrientation.LEFT) {
			game.fillRect(this.topLeft(), this.bottomRight(), ScoreBlock.backgroundColourLeft)
			const left = new Vector([ this.topLeft().x + xOffset, this.middleY() ])
			const top = new Vector([ this.pos.x + xOffset, this.topLeft().y + xBorder ])
			const bottom = new Vector([ this.pos.x + xOffset, this.bottomRight().y - xBorder ])

			game.fillPolygon([ top, left, bottom, top ], ScoreBlock.arrowColour)
			return
		}

		// Draw right pointing arrow

		if (this.orientation == ScoreBlockOrientation.RIGHT) {
			game.fillRect(this.topLeft(), this.bottomRight(), ScoreBlock.backgroundColourRight)
			const right = new Vector([ this.bottomRight().x - xOffset, this.middleY() ])
			const top = new Vector([ this.pos.x - xOffset, this.topLeft().y + xBorder ])
			const bottom = new Vector([ this.pos.x - xOffset, this.bottomRight().y - xBorder ])

			game.fillPolygon([ top, right, bottom, top ], ScoreBlock.arrowColour)
			return
		}

		// Draw a top left pointing arrow

		if (this.orientation == ScoreBlockOrientation.TOP_LEFT) {
			game.fillRect(this.topLeft(), this.bottomRight(), ScoreBlock.backgroundColourTopLeft)
			const topLeft = new Vector([ this.topLeft().x + xBorder, this.topLeft().y + xBorder ])
			const bottomLeft = new Vector([ this.topLeft().x + xBorder, this.bottomRight().y - xBorder ])
			const topRight = new Vector([ this.bottomRight().x - xBorder, this.topLeft().y + xBorder ])

			game.fillPolygon([ topLeft, bottomLeft, topRight, topLeft ], ScoreBlock.arrowColour)
			return
		}

		// Draw a top right pointing arrow

		if (this.orientation == ScoreBlockOrientation.TOP_RIGHT) {
			game.fillRect(this.topLeft(), this.bottomRight(), ScoreBlock.backgroundColourTopRight)
			const topRight = new Vector([ this.bottomRight().x - xBorder, this.topLeft().y + xBorder ])
			const bottomRight = new Vector([ this.bottomRight().x - xBorder, this.bottomRight().y - xBorder ])
			const topLeft = new Vector([ this.topLeft().x + xBorder, this.topLeft().y + xBorder ])

			game.fillPolygon([ topRight, bottomRight, topLeft, topRight ], ScoreBlock.arrowColour)
			return
		}
	}

	collision(player: Player) {
		if (this.popped) return

		if (
			player.right() >= this.topLeft().x && player.left() <= this.bottomRight().x
			&& player.bottom() >= this.topLeft().y && player.top() <= this.bottomRight().y
		) {
			// Pop left pointing score block by pressing F

			if (this.orientation == ScoreBlockOrientation.LEFT && player.game.keyboard.isPressed('KeyF')) {
				this.handlePlayerHit(player)
				return
			}

			// Pop right pointing score block by pressing J

			if (this.orientation == ScoreBlockOrientation.RIGHT && player.game.keyboard.isPressed('KeyJ')) {
				this.handlePlayerHit(player)
				return
			}

			// Pop top left pointing score block by pressing R

			if (this.orientation == ScoreBlockOrientation.TOP_LEFT && player.game.keyboard.isPressed('KeyR')) {
				this.handlePlayerHit(player)
				return
			}

			// Pop top right pointing score block by pressing U

			if (this.orientation == ScoreBlockOrientation.TOP_RIGHT && player.game.keyboard.isPressed('KeyU')) {
				this.handlePlayerHit(player)
				return
			}
		}
	}

	handlePlayerHit(player: Player) {
		this.popped = true
		player.addScore(ScoreBlock.hitReward)
		player.scoreBlocksGathered++
	}
}