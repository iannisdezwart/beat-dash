enum JumpPadOrientation {
	LEFT,
	RIGHT
}

class JumpPad extends Sprite {
	pos: Vector
	orientation: JumpPadOrientation
	popped = false

	static backgroundColourLeft = '#007700'
	static backgroundColourRight = '#770077'
	static arrowColour = '#ffffff'
	static get width() { return 0.04 * Game.fov }
	static height = JumpPad.width
	static leftOffset = 0.3
	static hitReward = 10

	constructor(pos: Vector, onCeiling = false, orientation = JumpPadOrientation.LEFT) {
		super()

		this.pos = pos
		if (onCeiling) this.pos.y += JumpPad.height
		this.pos.x += Player.leftOffset + JumpPad.leftOffset
		this.orientation = orientation
	}

	topLeft() {
		return new Vector([ this.pos.x - JumpPad.width / 2, this.pos.y - JumpPad.height ])
	}

	bottomRight() {
		return new Vector([ this.pos.x + JumpPad.width / 2, this.pos.y ])
	}

	middleX() {
		return this.pos.x
	}

	middleY() {
		return this.pos.y - JumpPad.height / 2
	}

	isVisible(game: Game) {
		const minX = game.scroll
		const maxX = game.scroll + Game.width
		return this.bottomRight().x > minX && this.topLeft().x < maxX
	}

	render(game: Game) {
		if (this.popped || !this.isVisible(game)) return

		const xOffset = JumpPad.width / 4
		const xBorder = JumpPad.width / 8

		// Draw a top left pointing arrow

		if (this.orientation == JumpPadOrientation.LEFT) {
			game.fillRect(this.topLeft(), this.bottomRight(), JumpPad.backgroundColourLeft)
			const topLeft = new Vector([ this.topLeft().x + xBorder, this.topLeft().y + xBorder ])
			const bottomLeft = new Vector([ this.topLeft().x + xBorder, this.bottomRight().y - xBorder ])
			const topRight = new Vector([ this.bottomRight().x - xBorder, this.topLeft().y + xBorder ])

			game.fillPolygon([ topLeft, bottomLeft, topRight, topLeft ], JumpPad.arrowColour)
			return
		}

		// Draw a top right pointing arrow

		if (this.orientation == JumpPadOrientation.RIGHT) {
			game.fillRect(this.topLeft(), this.bottomRight(), JumpPad.backgroundColourRight)
			const topRight = new Vector([ this.bottomRight().x - xBorder, this.topLeft().y + xBorder ])
			const bottomRight = new Vector([ this.bottomRight().x - xBorder, this.bottomRight().y - xBorder ])
			const topLeft = new Vector([ this.topLeft().x + xBorder, this.topLeft().y + xBorder ])

			game.fillPolygon([ topRight, bottomRight, topLeft, topRight ], JumpPad.arrowColour)
			return
		}
	}

	collision(player: Player) {
		if (this.popped) return

		if (
			player.right() >= this.topLeft().x && player.left() <= this.bottomRight().x
			&& player.bottom() >= this.topLeft().y && player.top() <= this.bottomRight().y
		) {
			// Pop left pointing jump pad

			if (this.orientation == JumpPadOrientation.LEFT && player.game.keyboard.isPressed(LEFT_SUPER_JUMP)) {
				this.handlePlayerHit(player)
				return
			}

			// Pop right pointing jump pad

			if (this.orientation == JumpPadOrientation.RIGHT && player.game.keyboard.isPressed(LEFT_SUPER_JUMP)) {
				this.handlePlayerHit(player)
				return
			}
		}
	}

	handlePlayerHit(player: Player) {
		this.popped = true
		player.addScore(JumpPad.hitReward)
		player.jumpPadsPopped
		player.superJump()
	}
}