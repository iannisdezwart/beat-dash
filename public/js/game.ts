class Game {
	canvas: HTMLCanvasElement
	ctx: CanvasRenderingContext2D
	keyboard = new Keyboard()
	sprites: Sprite[] = []
	player: Player
	scale: number
	scroll = 0

	static width = 1000
	static height = 500
	static scrollSpeed = 10

	constructor(canvasID: string) {
		this.canvas = document.querySelector<HTMLCanvasElement>(canvasID)
		this.ctx = this.canvas.getContext('2d')
		this.resize()

		addEventListener('resize', () => {
			this.resize()
		})
	}

	addPlayer(player: Player) {
		this.sprites.push(player)
		this.player = player
	}

	start() {
		setInterval(() => {
			this.update()
		}, 16.67)
	}

	resize() {
		const wantedHeight = innerWidth / Game.width * Game.height
		const wantedWidth = innerHeight / Game.height * Game.width

		if (innerHeight > wantedHeight) {
			// Black bars on top

			this.canvas.width = innerWidth
			this.canvas.height = wantedHeight
		} else {
			// Black bars on the sides

			this.canvas.height = innerHeight
			this.canvas.width = wantedWidth
		}

		this.scale = Game.width / innerWidth
	}

	update() {
		// Clear canvas

		this.ctx.beginPath()
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
		this.ctx.closePath()

		// Scroll

		this.scroll += Game.scrollSpeed

		// Render sprites

		for (let sprite of this.sprites) {
			sprite.render(this)
		}
	}

	beginPath() {
		this.ctx.beginPath()
	}

	closePath() {
		this.ctx.closePath()
	}

	translate(v: Vector) {
		return v.copy().sub(new Vector([ game.scroll, 0 ])).div(this.scale)
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
}