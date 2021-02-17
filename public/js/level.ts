abstract class Level {
	songFileName: string
	song = new Sound()
	songURL: string
	game: Game
	bpm: number

	constructor(songFileName: string, songTitle: string, bpm: number) {
		this.songFileName = songFileName
		this.bpm = bpm
		this.game = new Game('game', this)
		this.load()

		// Render song title

		const songTitleEl = document.querySelector<HTMLHeadingElement>('#song-title')
		songTitleEl.innerText = songTitle
	}

	abstract loadLevel(): void
	abstract onLoaded(): void

	async load() {
		this.showLoadingScreen()
		this.loadLevel()

		this.songURL = await Sound.getFile(this.songFileName, ratio => {
			const loadingPercentage =
				document.querySelector<HTMLDivElement>('#loading-screen-percentage')

			loadingPercentage.innerText = (ratio * 100).toFixed(1) + '%'
		})

		await this.loadSong()

		this.removeLoadingScreen()
		this.onLoaded()
	}

	async loadSong() {
		await this.song.load(this.songURL)
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