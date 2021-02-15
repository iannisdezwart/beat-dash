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

const getStoredVolume = () => {
	return parseFloat(localStorage.getItem('volume'))
}

const setStoredVolume = (newVolume: number) => {
	localStorage.setItem('volume', newVolume.toString())
	level.song.setVolume(newVolume)
	volumeInputLabel.innerText = volumeInput.value + '%'
}

const volumeInput = document.querySelector<HTMLInputElement>('#volume-slider')
const volumeInputLabel = document.querySelector<HTMLDivElement>('#volume-slider-value')

// Set volume to stored volume

if (getStoredVolume() == null) {
	setStoredVolume(1)
}

setStoredVolume(getStoredVolume())

volumeInput.oninput = () => {
	const volume = parseInt(volumeInput.value, 10) / 100
	setStoredVolume(volume)
}