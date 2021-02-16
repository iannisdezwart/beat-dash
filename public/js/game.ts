class Game {
	canvas: HTMLCanvasElement
	ctx: CanvasRenderingContext2D
	level: Level
	beatVisualiser: BeatVisualiser
	isRendering = false

	keyboard = new Keyboard()

	sprites: Sprite[] = []
	player: Player

	scale: number
	prevScroll = -Infinity
	scroll = 0
	bps: number

	fpsArray = Array(Game.fpsUpdateInterval).fill(Infinity)
	addFPS(fps: number) { this.fpsArray.shift(), this.fpsArray[Game.fpsUpdateInterval - 1] = fps }
	fpsArrayCounter = 0

	lastFrameTime = 0

	static fps = 60
	static fpsUpdateInterval = 5
	static width = 1
	static height = 0.6

	constructor(canvasID: string, level: Level) {
		this.canvas = document.getElementById(canvasID) as HTMLCanvasElement
		this.ctx = this.canvas.getContext('2d')
		this.level = level
		this.bps = level.bpm / 60

		this.beatVisualiser = new BeatVisualiser('beat-visualiser', this.bps)

		this.resize()

		addEventListener('resize', () => this.resize())

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
		this.nextFrame()
	}

	pause() {
		this.isRendering = false
		this.level.song.pause()
		document.querySelector<HTMLButtonElement>('#play-button').innerText = 'Continue'
		document.querySelector<HTMLDivElement>('#menu').classList.remove('invisible')
	}

	nextFrame() {
		this.update()

		// Calculate render duration

		const now = performance.now()
		const renderDuration = now - this.lastFrameTime
		this.lastFrameTime = now

		// Add current FPS to the FPS array

		const fps = 1000 / renderDuration
		this.addFPS(fps)

		if (this.fpsArrayCounter++ == Game.fpsUpdateInterval) {
			this.fpsArrayCounter = 0

			// Calculate the mean FPS of the FPS array

			let meanFPS = 0

			for (let i = 0; i < Game.fpsUpdateInterval; i++) {
				meanFPS += this.fpsArray[i]
			}

			meanFPS /= Game.fpsUpdateInterval

			// Render FPS counter

			const fpsCounter = document.querySelector<HTMLDivElement>('#fps-counter')
			fpsCounter.innerHTML = meanFPS.toFixed(1) + ' FPS'
		}

		// Schedule the next frame

		requestAnimationFrame(() => this.nextFrame())
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

		for (let sprite of this.sprites) {
			sprite.render(this)
		}

		// Render audio and beat visualisers

		this.level.audioVisualiser.render()
		this.beatVisualiser.render()

		if (Math.floor(this.prevScroll) != Math.floor(this.scroll)) {
			this.beatVisualiser.beat()
		}

		this.prevScroll = this.scroll
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