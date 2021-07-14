class BeatVisualiser {
	canvas: HTMLCanvasElement
	ctx: CanvasRenderingContext2D
	maxExpandingFrames: number
	expandingFrames: number
	beatCount = 4

	static dt = 0.5
	static colours = [ '#111111', '#171717', '#111111', '#171717' ]

	constructor(canvasID: string, bps: number) {
		this.canvas = document.getElementById(canvasID) as HTMLCanvasElement
		this.ctx = this.canvas.getContext('2d')
		this.maxExpandingFrames = Math.floor(1 / bps * Game.fps * BeatVisualiser.dt)
		this.expandingFrames = this.maxExpandingFrames

		this.resize()
		this.render()

		addEventListener('resize', () => this.resize())
	}

	resize() {
		this.canvas.width = innerWidth
		this.canvas.height = innerHeight
	}

	render() {
		if (!database.beatVisualiserEnabled) {
			this.ctx.fillStyle = BeatVisualiser.colours[0]
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
			return
		}

		// Only update if a circle is being drawn

		if (this.expandingFrames <= this.maxExpandingFrames) {
			const radiusRatio = this.expandingFrames / this.maxExpandingFrames * 1.1
			const radius = radiusRatio * Math.hypot(this.canvas.width / 2, this.canvas.height / 2)

			this.ctx.beginPath()
			this.ctx.fillStyle = BeatVisualiser.colours[this.beatCount]
			this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, radius, 0, 2 * Math.PI)
			this.ctx.fill()
			this.ctx.closePath()

			this.expandingFrames++
		}
	}

	beat() {
		this.expandingFrames = 0
		this.beatCount++
		this.beatCount %= 4
	}
}