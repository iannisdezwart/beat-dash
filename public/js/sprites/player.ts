class Player extends Sprite {
	pos: Vector
	vel: number
	acc: number

	static radius = 20
	static drag = 0.95
	static gravity = 1
	static leftOffset = 100

	constructor() {
		super()
		this.pos = new Vector([ Player.leftOffset, 100 ])
		this.vel = 0
		this.acc = 0
	}

	move(newAcc: number) {
		this.acc += Player.gravity
		this.vel += this.acc
		this.vel *= Player.drag
		this.pos.y += this.vel
		this.pos.x = game.scroll + Player.leftOffset
		this.acc = newAcc
	}

	draw(game: Game) {
		const topLeft = this.pos.copy().sub(new Vector([ Player.radius, Player.radius ]))
		const bottomRight = this.pos.copy().add(new Vector([ Player.radius, Player.radius ]))
		game.fillRect(topLeft, bottomRight, '#ff7777')
	}

	render(game: Game) {
		let newAcc = 0

		if (game.keyboard.isPressed('Space') && this.isOnFloor()) {
			console.log('space')
			newAcc -= 20
		}

		this.move(newAcc)
		this.groundCollision()
		this.draw(game)
	}

	isOnFloor() {
		return Math.abs(this.pos.y + Player.radius - Ground.y) < Number.EPSILON
	}

	collision() {
		for (let sprite of game.sprites) {
			if (sprite != this) {
				// sprite.collision()
			}
		}
	}

	groundCollision() {
		if (this.pos.y + Player.radius >= Ground.y) this.pos.y = Ground.y - Player.radius
	}
}