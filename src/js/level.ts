abstract class Level {
	song = new Sound()
	songFileName: string
	songTitle: string
	songURL: string
	bpm: number

	game: Game
	mapGenerator: MapGenerator
	startWithJump = true

	spaceListenerID: number

	constructor(songFileName: string, songTitle: string, bpm: number) {
		this.songFileName = songFileName
		this.songTitle = songTitle
		this.bpm = bpm

		// Render song title

		const songTitleEl = document.querySelector<HTMLHeadingElement>('#song-title')
		songTitleEl.innerText = this.songTitle

		// Create game

		this.reload()

		// Show pause button

		const pauseButton = document.querySelector<HTMLButtonElement>('#pause-button')
		pauseButton.classList.remove('hidden')
	}

	abstract loadLevel(): void
	abstract onLoaded(): void

	reload() {
		// Hide ending screen

		const endingScreen = document.querySelector<HTMLDivElement>('#ending-screen')
		endingScreen.classList.add('invisible')

		// Blur reload button

		;(document.activeElement as HTMLElement).blur()

		// Recreate game

		this.game = new Game('game', this)
		this.mapGenerator = new MapGenerator(this.game)
		this.load()

		// Show pause menu

		const pauseMenu = document.querySelector<HTMLDivElement>('#pause-menu')
		pauseMenu.classList.remove('hidden')

		const menu = document.querySelector<HTMLDivElement>('#menu')
		menu.classList.remove('invisible')

		// Start when space is pressed

		this.spaceListenerID = this.game.keyboard.onPress(JUMP, () => this.start())
	}

	destroy() {
		this.song.stop()
		this.game.destroy()
	}

	start() {
		this.game.start()
		document.querySelector<HTMLButtonElement>('#play-button').blur()
		this.game.keyboard.deleteOnPress(this.spaceListenerID)
	}

	async load() {
		this.showLoadingScreen()

		// Start downloading the song

		const soundPromise = this.song.load(this.songFileName, ratio => {
			const loadingPercentage =
				document.querySelector<HTMLDivElement>('#loading-screen-percentage')

			loadingPercentage.innerText = (ratio * 100).toFixed(1) + '%'
		})

		// Add floor and ceiling to the game

		this.game.sprites.push(new Floor())
		this.game.sprites.push(new Ceiling())

		// Load the level specific sprites

		this.loadLevel()

		// Add the player to the level

		this.game.addPlayer(new Player(this.game))

		// Wait until the song finished downloading and then load it

		await soundPromise
		this.song.setVolume(database.storedVolume)

		this.removeLoadingScreen()
		this.onLoaded()
	}

	showLoadingScreen() {
		const loadingScreen = document.querySelector<HTMLDivElement>('#loading-screen')
		loadingScreen.classList.remove('invisible')
	}

	removeLoadingScreen() {
		const loadingScreen = document.querySelector<HTMLDivElement>('#loading-screen')
		loadingScreen.classList.add('invisible')
	}
}