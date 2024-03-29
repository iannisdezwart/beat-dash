class Player extends Sprite {
	game: Game

	pos: Vector
	fallVel = 0
	fallAcc = 0

	gravityMultiplier = 1
	isJumping = false
	lastJumpEnd = -Infinity
	jumpTrajectory: JumpTrajectory
	angle = 0
	lastTimeOnFloor = -Infinity

	score = 0
	scoreBlocksGathered = 0
	jumpPadsPopped = 0
	scoreTrailDistanceSlided = 0
	spikesHit = 0
	platformsMissed = 0

	static get radius() { return 0.02 * Game.fov }
	static gravity = 0.001
	static maxFallVel = 0.1
	static leftOffset = 0.15
	static leftDelay = 0.5
	static jumpCooldown = 0.15

	constructor(game: Game) {
		super()
		this.game = game
		this.pos = new Vector([ 0, Floor.y ])
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

	move(dt: number) {
		this.pos.x = this.game.scroll + Player.leftOffset

		// If jumping, move according to the jump trajectory

		if (this.isJumping) {
			this.fallAcc = 0
			this.fallVel = 0
			this.pos.y = this.jumpTrajectory.getY(this.pos.x)
			this.angle = this.jumpTrajectory.playerRotation(this.pos.x) * this.gravityMultiplier
			this.lastJumpEnd = this.game.scroll
		}

		// If not jumping, fall

		else {
			this.angle = 0
			this.fall(dt)
		}
	}

	jump() {
		if (this.game.scroll > this.lastJumpEnd + Player.jumpCooldown) {
			this.isJumping = true
			this.jumpTrajectory = new JumpTrajectory(this)
		}
	}

	superJump() {
		if (this.game.scroll > this.lastJumpEnd + Player.jumpCooldown) {
			this.isJumping = true
			this.jumpTrajectory = new JumpTrajectory(this, 2, 2)
		}
	}

	fall(dt: number) {
		this.fallAcc = this.gravityMultiplier * Player.gravity
		this.fallVel += this.fallAcc * dt / 10
		this.pos.y += this.fallVel * dt / 10
	}

	stopFalling() {
		this.fallVel = 0
		this.lastTimeOnFloor = this.game.scroll
	}

	draw(game: Game) {
		const centre = new Vector([
			(this.left() + this.right()) / 2,
			(this.top() + this.bottom()) / 2
		])

		game.fillSkewedSquare(centre, Player.radius, this.angle, '#ff006e')
	}

	addScore(score: number) {
		this.score += score
		this.game.pulseBackgroundColour('#3a3')
	}

	subtractScore(score: number) {
		this.score -= score
		this.game.pulseBackgroundColour('#a33')
	}

	render(game: Game, dt: number) {
		if (game.keyboard.isPressed(JUMP) && !this.isJumping && this.isOnFloor()) {
			this.jump()
		}

		// Debug render jump trajectory

		if (this.isJumping) {
			this.jumpTrajectory.render()
		}

		this.move(dt)
		this.collision()
		this.draw(game)

		// Update score

		const scoreCounter = document.querySelector<HTMLDivElement>('#score-counter')
		scoreCounter.innerText = `Score: ${ this.score }`
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
}

class JumpTrajectory {
	startingPos: Vector
	player: Player
	game: Game
	impactX: number
	rotMultiplier: number
	dimMultiplier: number

	static width = 0.75
	static get height() { return 0.15 * Game.fov }

	get width() {
		return JumpTrajectory.width * this.dimMultiplier
	}

	get height() {
		return JumpTrajectory.height * this.dimMultiplier
	}

	constructor(player: Player, dimMultiplier = 1, rotMultiplier = 1) {
		this.startingPos = player.pos.copy()
		this.player = player
		this.game = player.game
		this.rotMultiplier = rotMultiplier
		this.dimMultiplier = dimMultiplier
		this.impactX = this.calcImpactX()
	}

	getY(x: number) {
		const gravityDirection = this.player.gravityMultiplier
		const dx = x - this.startingPos.x
		if (x > this.impactX) this.player.isJumping = false
		return gravityDirection * 4 * this.height / (this.width) ** 2 * dx * (dx - this.width) + this.startingPos.y
	}

	playerRotation(x: number) {
		const xProgress = x - this.startingPos.x
		const xFinal = this.impactX - this.startingPos.x
		const ratio = xProgress / xFinal

		return (ratio < 1 ? ratio : 1) * Math.PI / 2 * this.rotMultiplier
	}

	calcImpactX() {
		const dx = 0.005
		const sprites = this.game.sprites
		let x = this.startingPos.x + dx

		while (true) {
			for (let sprite of sprites) {
				if (
					(sprite instanceof Platform || sprite instanceof Spike
					|| sprite instanceof Floor || sprite instanceof Ceiling
					|| sprite instanceof SpikeCeiling)
					&& sprite.isInside(new Vector([ x, this.getY(x) ]))
				) {
					return x
				}
			}

			x += dx
		}
	}

	render() {
		if (!database.debugEnabled) return

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

		while (x < this.impactX) {
			v.x = x
			v.y = this.getY(x)
			tr = this.game.translate(v)
			ctx.lineTo(tr.x, tr.y)
			x += dx
		}

		ctx.lineWidth = 3
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