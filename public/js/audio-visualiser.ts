class AudioVisualiser {
	canvas: HTMLCanvasElement
	ctx: CanvasRenderingContext2D
	sound: Sound

	static maxHeight = 0.3
	static fftSize = 1 << 13
	static maxDecibels = -20
	static minDecibels = -60

	constructor(canvasID: string, sound: Sound) {
		this.canvas = document.getElementById(canvasID) as HTMLCanvasElement
		this.ctx = this.canvas.getContext('2d')
		this.sound = sound
		this.resize()

		addEventListener('resize', () => this.resize())
	}

	resize() {
		this.canvas.width = innerWidth
		this.canvas.height = innerHeight
	}

	render() {
		if (!database.audioVisualiserEnabled) {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
			return
		}

		const frequencies = this.sound.getFrequencyArray(20, 200)
		const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0)

		const translateX = (x: number) => {
			return x / (frequencies.length - 1) * this.canvas.width
		}

		const translateY = (y: number) => {
			return this.canvas.height * (1 - y / 256 * AudioVisualiser.maxHeight)
		}

		const setColour = (xRatio: number, yRatio: number) => {
			// let r = 255 * (1 - yRatio)
			// let g = 255 * (1 - yRatio)
			// let b = 255

			// const toHexByte = (v: number) => Math.floor(v).toString(16).padStart(2, '0')
			// const colour = `#${ toHexByte(r) }${ toHexByte(g) }${ toHexByte(b) }`

			// gradient.addColorStop(xRatio, colour)
			gradient.addColorStop(xRatio, '#222222')
		}

		// Clear canvas

		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
		this.ctx.beginPath()

		this.ctx.fillStyle = gradient

		// Bottom left

		this.ctx.moveTo(0, this.canvas.height)

		// First point

		let i = 0

		this.ctx.lineTo(0, translateY(frequencies[i]))
		setColour(i / (frequencies.length - 1), frequencies[i] / 255)

		for (i = 1; i < frequencies.length - 2; i++) {
			const x = translateX(i)
			const y = translateY(frequencies[i])

			const nextX = translateX(i + 1)
			const nextY = translateY(frequencies[i + 1])

			const xc = (x + nextX) / 2
			const yc = (y + nextY) / 2

			// Draw each point

			this.ctx.quadraticCurveTo(x, y, xc, yc)
			setColour(i / (frequencies.length - 1), frequencies[i] / 255)
		}

		// Draw last two points

		this.ctx.quadraticCurveTo(translateX(i), translateY(frequencies[i]),
			translateX(i + 1), translateY(frequencies[i + 1]))
		setColour(i / (frequencies.length - 1), frequencies[i] / 255)
		setColour((i + 1) / (frequencies.length - 1), frequencies[i + 1] / 255)

		// Bottom right

		this.ctx.lineTo(this.canvas.width, this.canvas.height)

		// Fill

		this.ctx.fill()
		this.ctx.closePath()
	}
}