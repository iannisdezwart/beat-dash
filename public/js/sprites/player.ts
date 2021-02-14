class Player extends Sprite {
	game: Game

	pos: Vector
	vel: number
	acc: number

	gravityMultiplier = 1

	static radius = 20
	static gravity = 1
	static leftOffset = 100
	static jumpVel = 10

	constructor(game: Game) {
		super()
		this.game = game
		this.pos = new Vector([ Player.leftOffset, 100 ])
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

	move(newAcc: number) {
		console.log(newAcc)
		this.acc += Player.gravity * this.gravityMultiplier
		this.vel += this.acc
		this.pos.y += this.vel
		this.pos.x = game.scroll + Player.leftOffset
		this.acc = newAcc
	}

	draw(game: Game) {
		const topLeft = new Vector([ this.left(), this.top() ])
		const bottomRight = new Vector([ this.right(), this.bottom() ])
		game.fillRect(topLeft, bottomRight, '#ff7777')
	}

	render(game: Game) {
		let newAcc = 0

		if (game.keyboard.isPressed('Space') && this.isOnFloor()) {
			console.log('space')
			newAcc -= Player.jumpVel * this.gravityMultiplier
		}

		this.move(newAcc)
		this.collision()
		this.draw(game)
	}

	isOnFloor() {
		for (let sprite of game.sprites) {
			// Todo: use this.top() when inverted gravity

			if (sprite instanceof Floor && this.gravityMultiplier >= 0) {
				if (Math.abs(this.bottom() - Floor.y) < Number.EPSILON)
					return true
			} else if (sprite instanceof Ceiling && this.gravityMultiplier < 0) {
				if (Math.abs(this.top() - Ceiling.y) < Number.EPSILON)
					return true
			} else if (sprite instanceof Platform) {
				if (Math.abs(this.bottom() - sprite.topLeft.y) < Number.EPSILON)
					return true
			}
		}

		return false
	}

	collision() {
		for (let sprite of game.sprites) {
			if (sprite != this) {
				sprite.collision(this)
			}
		}
	}
}