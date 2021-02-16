const level = new LevelNostalgia()
const keyboard = level.game.keyboard

const spaceListenerID = keyboard.onPress('Space', () => {
	startGame()
})

const startGame = () => {
	document.querySelector<HTMLButtonElement>('#play-button').blur()
	keyboard.deleteOnPress(spaceListenerID)
	level.game.start()
}

// Volume input

const volumeInput = document.querySelector<HTMLInputElement>('#volume-slider')
const volumeInputLabel = document.querySelector<HTMLDivElement>('#volume-slider-value')

// Set volume to stored volume

if (database.storedVolume == null || Number.isNaN(database.storedVolume)) {
	database.storedVolume = 1
}

volumeInput.addEventListener('input', () => {
	const volume = parseInt(volumeInput.value, 10) / 100
	database.storedVolume = volume
})

// Beat visualiser input

const beatVisualiserInput = document.querySelector<HTMLInputElement>('#beat-visualiser-toggle')

// Set beat visualiser input to stored value

if (database.beatVisualiserEnabled == null) {
	database.beatVisualiserEnabled = false
}

beatVisualiserInput.addEventListener('input', () => {
	const enabled = beatVisualiserInput.checked
	database.beatVisualiserEnabled = enabled
})

// Audio visualiser input

const audioVisualiserInput = document.querySelector<HTMLInputElement>('#audio-visualiser-toggle')

// Set audio visualiser input to stored value

if (database.audioVisualiserEnabled == null) {
	database.audioVisualiserEnabled = true
}

audioVisualiserInput.addEventListener('input', () => {
	const enabled = audioVisualiserInput.checked
	database.audioVisualiserEnabled = enabled
})

// JavaScript magic!

database.storedVolume = database.storedVolume
database.beatVisualiserEnabled = database.beatVisualiserEnabled
database.audioVisualiserEnabled = database.audioVisualiserEnabled