class Break extends Sprite {
	x: number
	width: number
	activated = false

	constructor(x: number, width: number) {
		super()

		this.x = x
		this.width = width
	}

	left() {
		return this.x
	}

	right() {
		return this.x + this.width
	}

	isVisible(game: Game) {
		const oneSecond = game.bps
		return game.scroll > this.left() && game.scroll < this.right() - oneSecond
	}

	isActive(game: Game) {
		return game.scroll > this.left() && game.scroll < this.right()
	}

	render(game: Game) {
		const visible = this.isVisible(game)
		const active = this.isActive(game)
		const breakEl = document.querySelector<HTMLDivElement>('#break')
		const breakSeconds = breakEl.querySelector<HTMLDivElement>('#break-seconds')
		const breakProgress = breakEl.querySelector<HTMLDivElement>('#break-progress')

		if (!this.activated && visible) {
			this.activated = true
			breakEl.classList.remove('invisible')
		}

		if (this.activated && !visible) {
			this.activated = false
			breakEl.classList.add('invisible')
		}

		if (active) {
			const progress = -100 * (1 - (game.scroll - this.left()) / this.width)
			breakProgress.style.transform = `translate(${ progress }%)`

			const remainingSeconds = (this.right() - game.scroll) / game.bps
			breakSeconds.innerText = `${ remainingSeconds.toFixed(1) } s`
		}
	}

	collision() {}
}