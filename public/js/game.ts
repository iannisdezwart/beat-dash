class Game {
	canvas: HTMLCanvasElement
	ctx: CanvasRenderingContext2D
	level: Level
	intervalID: number
	isRendering = false

	keyboard = new Keyboard()

	sprites: Sprite[] = []
	player: Player

	scale: number
	scroll = 0
	bps: number
	fps = 60
	lastFrameTime = 0

	static width = 1
	static height = 0.6

	constructor(canvasID: string, level: Level) {
		this.canvas = document.querySelector<HTMLCanvasElement>(canvasID)
		this.ctx = this.canvas.getContext('2d')
		this.level = level
		this.bps = level.bpm / 60
		this.resize()

		addEventListener('resize', () => {
			this.resize()
		})

		this.keyboard.onPress('KeyP', () => {
			if (this.isRendering) {
				this.pause()
			} else {
				this.start()
			}
		})
	}

	addPlayer(player: Player) {
		this.sprites.push(player)
		this.player = player
		this.scroll = -Player.leftOffset
	}

	start() {
		this.isRendering = true
		this.level.song.play()
		document.querySelector<HTMLDivElement>('#menu').classList.add('invisible')
		this.nextFrame(0)
	}

	pause() {
		this.isRendering = false
		this.level.song.pause()
		document.querySelector<HTMLButtonElement>('#play-button').innerText = 'Continue'
		document.querySelector<HTMLDivElement>('#menu').classList.remove('invisible')
		clearInterval(this.intervalID)
	}

	nextFrame(delay: number) {
		this.intervalID = setTimeout(() => {
			this.update()

			// Render FPS counter

			const renderDuration = performance.now() - this.lastFrameTime
			const frameDelay = (1000 / this.fps - renderDuration)
			document.querySelector<HTMLDivElement>('#fps-counter').innerHTML
				= (1000 / frameDelay).toFixed(1) + ' FPS'

			// Schedule the next frame

			this.nextFrame(frameDelay)
		}, delay)
	}

	resize() {
		const wantedHeight = innerWidth / Game.width * Game.height
		const wantedWidth = innerHeight / Game.height * Game.width

		if (innerHeight > wantedHeight) {
			// Black bars on top

			this.canvas.width = innerWidth
			this.canvas.height = wantedHeight
			this.scale = Game.width / innerWidth
		} else {
			// Black bars on the sides

			this.canvas.height = innerHeight
			this.canvas.width = wantedWidth
			this.scale = Game.height / innerHeight
		}
	}

	update() {
		// Clear canvas

		this.ctx.beginPath()
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
		this.ctx.closePath()

		// Scroll

		this.scroll = this.bps * this.level.song.time()

		// Render sprites

		const now = performance.now()
		const dt = (now - this.lastFrameTime) / 1000

		for (let sprite of this.sprites) {
			sprite.render(this, dt)
		}

		this.lastFrameTime = now
	}

	beginPath() {
		this.ctx.beginPath()
	}

	closePath() {
		this.ctx.closePath()
	}

	translate(v: Vector) {
		return v.copy().sub(new Vector([ this.scroll, 0 ])).div(this.scale)
	}

	fillRect(topLeft: Vector, bottomRight: Vector, colour: string) {
		this.beginPath()

		topLeft = this.translate(topLeft)
		bottomRight = this.translate(bottomRight)

		const x = topLeft.x
		const y = topLeft.y
		const width = bottomRight.x - x
		const height = bottomRight.y - y

		this.ctx.fillStyle = colour
		this.ctx.fillRect(x, y, width, height)

		this.closePath()
	}

	fillPolygon(points: Vector[], colour: string) {
		this.beginPath()
		this.ctx.fillStyle = colour

		let point = this.translate(points[0])
		this.ctx.moveTo(point.x, point.y)

		for (let i = 1; i < points.length; i++) {
			point = this.translate(points[i])
			this.ctx.lineTo(point.x, point.y)
		}

		this.ctx.fill()
		this.closePath()
	}
}