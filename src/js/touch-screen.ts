class TouchScreen {
	onTouchCallbacks: { 
		[ key: number ]: { topLeft: Vector, bottomRight: Vector, callback: () => void }
	} = {}
	onTouchEndCallbacks: { 
		[ key: number ]: { topLeft: Vector, bottomRight: Vector, callback: () => void }
	} = {}
	latestOnPressID = 0

	constructor() {
		// Add listeners for touch events

		addEventListener('touchstart', e => {
			const x = e.touches[0].clientX / innerWidth
			const y = e.touches[0].clientY / innerHeight

			for (const id in this.onTouchCallbacks) {
				const { topLeft, bottomRight, callback } = this.onTouchCallbacks[id]

				if (x >= topLeft.x && x <= bottomRight.x && y >= topLeft.y && y <= bottomRight.y) {
					callback()
				}
			}
		})

		addEventListener('touchend', e => {
			const x = e.changedTouches[0].clientX / innerWidth
			const y = e.changedTouches[0].clientY / innerHeight

			for (const id in this.onTouchEndCallbacks) {
				const { topLeft, bottomRight, callback } = this.onTouchEndCallbacks[id]

				if (x >= topLeft.x && x <= bottomRight.x && y >= topLeft.y && y <= bottomRight.y) {
					callback()
				}
			}
		})
	}

	onTouchArea(topLeft: Vector, bottomRight: Vector, callback: () => void) {
		const id = this.latestOnPressID++
		this.onTouchCallbacks[id] = { topLeft, bottomRight, callback }
		return id
	}

	deleteOnTouchArea(id: number) {
		if (this.onTouchCallbacks[id] != null) {
			delete this.onTouchCallbacks[id]
		}
	}

	onTouchEndArea(topLeft: Vector, bottomRight: Vector, callback: () => void) {
		const id = this.latestOnPressID++
		this.onTouchEndCallbacks[id] = { topLeft, bottomRight, callback }
		return id
	}

	deleteOnTouchEndArea(id: number) {
		if (this.onTouchEndCallbacks[id] != null) {
			delete this.onTouchEndCallbacks[id]
		}
	}
}