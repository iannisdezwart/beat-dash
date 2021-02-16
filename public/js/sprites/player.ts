class Player extends Sprite {
	game: Game

	pos: Vector

	gravityMultiplier = 1
	isJumping = false
	jumpTrajectory: JumpTrajectory
	angle = 0

	static radius = 0.02
	static gravity = 0.001
	static leftOffset = 0.15
	static leftDelay = 0.5
	static jumpAcc = 0.02

	constructor(game: Game) {
		super()
		this.game = game
		this.pos = new Vector([ 0, Floor.y ])

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

	move() {
		this.pos.x = this.game.scroll + Player.leftOffset

		if (this.isJumping) {
			this.pos.y = this.jumpTrajectory.getY(this.pos.x)
			this.angle = this.jumpTrajectory.playerRotation(this.pos.x)
		} else {
			this.angle = 0
		}
	}

	jump() {
		this.isJumping = true
		this.jumpTrajectory = new JumpTrajectory(this)
	}

	draw(game: Game) {
		const topLeft = new Vector([ this.left(), this.top() ])
		const bottomRight = new Vector([ this.right(), this.bottom() ])
		game.fillRect(topLeft, bottomRight, '#ff006e')
	}

	render(game: Game) {
		if (game.keyboard.isPressed('Space') && !this.isJumping && this.isOnFloor()) {
			this.jump()
		}

		// Useful for debugging

		if (this.isJumping) {
			this.jumpTrajectory.render()
		}

		this.move()
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

class JumpTrajectory {
	startingPos: Vector
	game: Game
	impactX: number

	static width = 0.75
	static height = 0.15

	constructor(player: Player) {
		this.startingPos = player.pos.copy()
		this.game = player.game
		this.impactX = this.calcImpactX()

		console.log('created jump trajectory, impactX():', this.impactX)
	}

	getY(x: number) {
		const dx = x - this.startingPos.x
		return 4 * JumpTrajectory.height / (JumpTrajectory.width) ** 2 * dx * (dx - JumpTrajectory.width) + this.startingPos.y
	}

	playerRotation(x: number) {
		const xProgress = x - this.startingPos.x
		const xFinal = this.impactX - this.startingPos.x
		const ratio = xProgress / xFinal

		return ratio < 1 ? ratio : 1
	}

	calcImpactX() {
		const dx = 0.005
		const sprites = this.game.sprites
		let x = this.startingPos.x + dx

		while (true) {
			for (let sprite of sprites) {
				if (
					(sprite instanceof Platform || sprite instanceof Spike
					|| sprite instanceof Floor || sprite instanceof Ceiling)
					&& sprite.isInside(new Vector([ x, this.getY(x) ]))
				) {
					return x
				}
			}

			x += dx
		}
	}

	render() {
		const ctx = this.game.ctx
		const v = new Vector([ 0, 0 ])
		const dx = 0.005
		let x = this.startingPos.x + dx

		// Draw trajectory parabola

		ctx.beginPath()
		ctx.strokeStyle = '#ffffff'

		v.x = x
		v.y = this.getY(x)
		let tr = this.game.translate(v)
		ctx.moveTo(tr.x, tr.y)

		for (; x < this.startingPos.x + JumpTrajectory.width; x += dx) {
			v.x = x
			v.y = this.getY(x)
			tr = this.game.translate(v)
			ctx.lineTo(tr.x, tr.y)
		}

		ctx.stroke()
		ctx.closePath()

		// Draw impact point

		const impactX = this.impactX
		const impactY = this.getY(impactX)

		ctx.beginPath()
		ctx.fillStyle = '#ff0000'

		tr = this.game.translate(new Vector([ impactX, impactY ]))
		ctx.arc(tr.x, tr.y, 10, 0, 2 * Math.PI)
		ctx.fill()

		ctx.closePath()
	}
}