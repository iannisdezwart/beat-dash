abstract class Level {
	songFileName: string
	song = new Sound()
	songURL: string
	game: Game
	mapGenerator: MapGenerator
	bpm: number

	constructor(songFileName: string, songTitle: string, bpm: number) {
		this.songFileName = songFileName
		this.bpm = bpm
		this.game = new Game('game', this)
		this.mapGenerator = new MapGenerator(this.game)
		this.load()

		// Render song title

		const songTitleEl = document.querySelector<HTMLHeadingElement>('#song-title')
		songTitleEl.innerText = songTitle
	}

	abstract loadLevel(): void
	abstract onLoaded(): void

	async load() {
		this.showLoadingScreen()

		// Start downloading the song

		const soundPromise = Sound.getFile(this.songFileName, ratio => {
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

		this.songURL = await soundPromise
		await this.loadSong()

		this.removeLoadingScreen()
		this.onLoaded()
	}

	async loadSong() {
		await this.song.load(this.songURL)
		this.song.setVolume(database.storedVolume)
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