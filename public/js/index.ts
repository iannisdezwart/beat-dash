let level: Level
const keyboard = new Keyboard()

let spaceListenerID: number

const menu = document.querySelector<HTMLDivElement>('#menu')
const levelSelection = document.querySelector<HTMLDivElement>('#level-selection')
const pauseMenu = document.querySelector<HTMLDivElement>('#pause-menu')
const endingScreen = document.querySelector<HTMLDivElement>('#ending-screen')

const showMainMenu = () => {
	level.game.isRendering = false
	level.destroy()
	menu.classList.remove('invisible')
	levelSelection.classList.remove('hidden')
	endingScreen.classList.add('invisible')
	pauseMenu.classList.add('hidden')
}

const selectLevel = async (i: number) => {
	const levelEntry = levelList[i]
	level = levelEntry.createLevel()
	levelSelection.classList.add('hidden')
}

// Show song list

for (let i = 0; i < levelList.length; i++) {
	const level = levelList[i]

	levelSelection.innerHTML += /* html */ `
	<div class="level">
		<p class="song-name">${ level.artist } - ${ level.title }</p>
		<p class="song-bpm">${ level.bpm } bpm</p>
		<button class="small" onclick="selectLevel(${ i })">play</button>
	</div>
	`
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

// Debug input

const debugInput = document.querySelector<HTMLInputElement>('#debug-toggle')

// Set debug input to stored value

if (database.debugEnabled == null) {
	database.debugEnabled = false
}

debugInput.addEventListener('input', () => {
	const enabled = debugInput.checked
	database.debugEnabled = enabled
})

// JavaScript magic!

database.storedVolume = database.storedVolume
database.beatVisualiserEnabled = database.beatVisualiserEnabled
database.audioVisualiserEnabled = database.audioVisualiserEnabled
database.debugEnabled = database.debugEnabled