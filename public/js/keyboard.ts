class Keyboard {
	pressedKeys: { [ key: string ]: boolean } = {}
	onPressCallbacks: { [ key: number ]: { key: string, callback: (() => void) } } = {}
	latestOnPressID = 0

	constructor() {
		// Add listeners for the isPressed method

		addEventListener('keydown', e => this.pressedKeys[e.code] = true)
		addEventListener('keyup',   e => this.pressedKeys[e.code] = false)

		addEventListener('keydown', e => {
			for (let id in this.onPressCallbacks) {
				const key = this.onPressCallbacks[id].key
				const callback = this.onPressCallbacks[id].callback
				if (key == e.code) callback()
			}
		})
	}

	isPressed(key: string) {
		return this.pressedKeys[key] == true
	}

	onPress(key: string, callback: () => void) {
		const id = this.latestOnPressID++
		this.onPressCallbacks[id] = { key, callback }
		return id
	}

	deleteOnPress(id: number) {
		if (this.onPressCallbacks[id] != null) {
			delete this.onPressCallbacks[id]
		}
	}
}