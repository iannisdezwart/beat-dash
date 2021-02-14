class Keyboard {
	pressedKeys: { [ key: string ]: boolean } = {}

	constructor() {
		// Add listeners for the isPressed method

		addEventListener('keydown', e => this.pressedKeys[e.code] = true)
		addEventListener('keyup',   e => this.pressedKeys[e.code] = false)
	}

	isPressed(key: string) {
		return this.pressedKeys[key] == true
	}
}