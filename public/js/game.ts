class Game {
	canvas: HTMLCanvasElement
	ctx: CanvasRenderingContext2D
	level: Level
	beatVisualiser: BeatVisualiser
	audioVisualiser: AudioVisualiser

	isRendering = false
	active = false
	endingScreenShown = false

	keyboard = new Keyboard()
	touchScreen = new TouchScreen()
	pauseButtonListener: number

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
	renderDuration = 0

	static fov = 1.5
	static fps = 60
	static fpsUpdateInterval = 5
	static get width() { return 1 * Game.fov }
	static get height() { return 0.6 * Game.fov }

	constructor(canvasID: string, level: Level) {
		this.canvas = document.getElementById(canvasID) as HTMLCanvasElement
		this.ctx = this.canvas.getContext('2d')
		this.level = level
		this.bps = level.bpm / 60

		this.resize()

		addEventListener('resize', () => this.resize())

		// Pause when P is pressed

		this.pauseButtonListener = this.keyboard.onPress('KeyP', () => {
			this.togglePause()
		})

		// Setup touch screen

		this.touchScreen.onTouchArea(new Vector([ 0, 0 ]), new Vector([ 1 / 4, 1 ]), () => {
			this.keyboard.emulatePressStart('KeyF')
		})

		this.touchScreen.onTouchEndArea(new Vector([ 0, 0 ]), new Vector([ 1 / 4, 1 ]), () => {
			this.keyboard.emulatePressEnd('KeyF')
		})

		this.touchScreen.onTouchArea(new Vector([ 1 / 4, 0 ]), new Vector([ 3 / 4, 1 ]), () => {
			this.keyboard.emulatePressStart('Space')
		})

		this.touchScreen.onTouchEndArea(new Vector([ 1 / 4, 0 ]), new Vector([ 3 / 4, 1 ]), () => {
			this.keyboard.emulatePressEnd('Space')
		})

		this.touchScreen.onTouchArea(new Vector([ 3 / 4, 0 ]), new Vector([ 1, 1 ]), () => {
			this.keyboard.emulatePressStart('KeyJ')
		})

		this.touchScreen.onTouchEndArea(new Vector([ 3 / 4, 0 ]), new Vector([ 1, 1 ]), () => {
			this.keyboard.emulatePressEnd('KeyJ')
		})
	}

	destroy() {
		this.keyboard.deleteOnPress(this.pauseButtonListener)
	}

	addPlayer(player: Player) {
		this.sprites.push(player)
		this.player = player
		this.scroll = -Player.leftOffset
	}

	setupVisualisers() {
		this.level.song.setupAnalyser()
		this.beatVisualiser = new BeatVisualiser('beat-visualiser', this.bps)
		this.audioVisualiser = new AudioVisualiser('audio-visualiser', this.level.song)
	}

	start() {
		if (!this.active) this.setupVisualisers()

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

	togglePause() {
		if (this.isRendering) {
			this.pause()
		} else {
			this.start()
		}
	}

	lastNoteReached() {
		return this.scroll > this.level.mapGenerator.beat + 4
	}

	nextFrame() {
		if (!this.endingScreenShown && (this.lastNoteReached() || this.level.song.ended())) {
			this.showEndingScreen()
			return
		}

		this.update()

		// Calculate render duration

		const now = performance.now()
		this.renderDuration = now - this.lastFrameTime
		this.lastFrameTime = now

		// Add current FPS to the FPS array

		const fps = 1000 / this.renderDuration
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

		if (this.isRendering) {
			requestAnimationFrame(() => this.nextFrame())
		}
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
			sprite.render(this, this.renderDuration)
		}

		// Jump player in the beginning

		if (this.level.startWithJump && this.scroll < JumpTrajectory.width) {
			this.player.jump()
		}

		// Render audio and beat visualisers

		this.audioVisualiser.render()
		this.beatVisualiser.render()

		if (Math.floor(this.prevScroll) != Math.floor(this.scroll)) {
			this.beatVisualiser.beat()
		}

		// Update song time

		this.updateSongProgress()

		// Debug render next 4th beat

		this.renderNextBeatLine()

		this.prevScroll = this.scroll
	}

	renderNextBeatLine() {
		if (!database.debugEnabled) return

		const phase = this.scroll / 4 - Math.floor(this.scroll / 4)
		const nextBeat = 4 * (Math.floor(this.scroll / 4) + (phase < 0.1 ? 0 : 1))
		const from = new Vector([ nextBeat + Player.leftOffset, Ceiling.y ])
		const to = new Vector([ nextBeat + Player.leftOffset, Floor.y ])

		this.strokeLine(from, to, 0.01, '#444')
	}

	updateSongProgress() {
		const formatTime = (seconds: number) => {
			seconds = Math.floor(seconds)

			const min = Math.floor(seconds / 60)
			const sec = seconds - 60 * min
			const m = min.toString()
			const ss = sec.toString().padStart(2, '0')

			return `${ m }:${ ss }`
		}

		const timeEl = document.querySelector<HTMLDivElement>('#song-time')
		const time = this.level.song.time()
		const duration = this.level.song.duration()
		timeEl.innerText = `${ formatTime(time) } / ${ formatTime(duration) }`

		const progressBar = document.querySelector<HTMLDivElement>('#song-progress')
		const progress = -100 * (1 - time / duration)
		progressBar.style.transform = `translateX(${ progress }%)`
	}

	pulseBackgroundColour(colour: string) {
		document.body.style.backgroundColor = colour

		setTimeout(() => {
			document.body.style.backgroundColor = '#111'
		}, 300)
	}

	showEndingScreen() {
		const endingScreen = document.querySelector<HTMLDivElement>('#ending-screen')
		const songNameField = endingScreen.querySelector<HTMLHeadElement>('#song-name')
		const scoreField = endingScreen.querySelector<HTMLHeadElement>('#final-score')
		const scoreBlocksField = endingScreen.querySelector<HTMLHeadElement>('#score-blocks-gathered')
		const spikesField = endingScreen.querySelector<HTMLHeadElement>('#spikes-hit')
		const platformsField = endingScreen.querySelector<HTMLHeadElement>('#platforms-missed')

		songNameField.innerText = this.level.songTitle
		scoreField.innerText = this.player.score.toString()
		scoreBlocksField.innerText = this.player.scoreBlocksGathered.toString()
		spikesField.innerText = this.player.spikesHit.toString()
		platformsField.innerText = this.player.platformsMissed.toString()

		endingScreen.classList.remove('invisible')
		this.keyboard.deleteOnPress(this.pauseButtonListener)

		this.endingScreenShown = true
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

	fillSkewedSquare(centre: Vector, radius: number, angle: number, colour: string) {
		const rotationVector = new Vector([ 0, 0 ])

		// Top left corner

		rotationVector.x = -radius
		rotationVector.y = -radius

		rotationVector.rot(angle)
		const corner1 = this.translate(
			new Vector([ centre.x + rotationVector.x, centre.y + rotationVector.y ])
		)

		// Top right corner

		rotationVector.rot(Math.PI / 2)
		const corner2 = this.translate(
			new Vector([ centre.x + rotationVector.x, centre.y + rotationVector.y ])
		)

		// Bottom right corner

		rotationVector.rot(Math.PI / 2)
		const corner3 = this.translate(
			new Vector([ centre.x + rotationVector.x, centre.y + rotationVector.y ])
		)

		// Bottom left corner

		rotationVector.rot(Math.PI / 2)
		const corner4 = this.translate(
			new Vector([ centre.x + rotationVector.x, centre.y + rotationVector.y ])
		)

		// Draw the square

		this.beginPath()

		this.ctx.moveTo(corner1.x, corner1.y)
		this.ctx.lineTo(corner2.x, corner2.y)
		this.ctx.lineTo(corner3.x, corner3.y)
		this.ctx.lineTo(corner4.x, corner4.y)
		this.ctx.lineTo(corner1.x, corner1.y)

		this.ctx.fillStyle = colour
		this.ctx.fill()

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

	strokeLineAbs(from: Vector, to: Vector, width: number, colour: string) {
		this.beginPath()

		this.ctx.moveTo(from.x, from.y)
		this.ctx.lineTo(to.x, to.y)

		this.ctx.lineWidth = width
		this.ctx.strokeStyle = colour
		this.ctx.stroke()

		this.closePath()
	}

	strokeLine(from: Vector, to: Vector, width: number, colour: string) {
		this.strokeLineAbs(this.translate(from), this.translate(to), width / this.scale, colour)
	}
}