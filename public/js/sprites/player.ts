class Player extends Sprite {
	game: Game

	pos: Vector
	vel: number
	acc: number

	gravityMultiplier = 1
	jumpCooldown = 0

	static radius = 0.02
	static gravity = 0.001
	static leftOffset = 0.1
	static leftDelay = 0.5
	static jumpAcc = 0.015

	constructor(game: Game) {
		super()
		this.game = game
		this.pos = new Vector([ 0, Floor.y ])
		this.vel = 0
		this.acc = 0

		this.game.keyboard.onPress('KeyW', () => {
			this.gravityMultiplier *= -1
		})
	}

	left() {
		return this.pos.x - Player.radius
	}

	right() {
		return this.pos.x + Player.radius
	}

	top() {
		return this.pos.y - Player.radius
	}

	bottom() {
		return this.pos.y + Player.radius
	}

	move(newAcc: number, dt: number) {
		this.acc += Player.gravity * this.gravityMultiplier
		this.vel += this.acc
		this.pos.y += this.vel * dt * 100
		this.pos.x = this.game.scroll + Player.leftOffset
		this.acc = newAcc
	}

	draw(game: Game) {
		const topLeft = new Vector([ this.left(), this.top() ])
		const bottomRight = new Vector([ this.right(), this.bottom() ])
		game.fillRect(topLeft, bottomRight, '#ff006e')
	}

	render(game: Game, dt: number) {
		let newAcc = 0

		if (this.jumpCooldown > 0) this.jumpCooldown--

		if (game.keyboard.isPressed('Space') && this.isOnFloor() && this.jumpCooldown == 0) {
			newAcc -= Player.jumpAcc * this.gravityMultiplier
			this.jumpCooldown = 15
		}

		this.move(newAcc, dt)
		this.collision()
		this.draw(game)
	}

	isOnFloor() {
		for (let sprite of this.game.sprites) {
			// Todo: use this.top() when inverted gravity

			if (sprite instanceof Floor && this.gravityMultiplier >= 0) {
				if (Math.abs(this.bottom() - Floor.y) < Number.EPSILON)
					return true
			} else if (sprite instanceof Ceiling && this.gravityMultiplier < 0) {
				if (Math.abs(this.top() - Ceiling.y) < Number.EPSILON)
					return true
			} else if (sprite instanceof Platform && this.gravityMultiplier >= 0) {
				if (Math.abs(this.bottom() - sprite.topLeft.y) < Number.EPSILON)
					return true
			} else if (sprite instanceof Platform && this.gravityMultiplier < 0) {
				if (Math.abs(this.top() - sprite.bottomRight.y) < Number.EPSILON)
					return true
			}
		}

		return false
	}

	collision() {
		for (let sprite of this.game.sprites) {
			if (sprite != this) {
				sprite.collision(this)
			}
		}
	}

	kill() {
		console.log('you died')
	}
}