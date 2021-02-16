abstract class Level {
	songFileName: string
	song = new Sound()
	game: Game
	audioVisualiser: AudioVisualiser
	bpm: number

	constructor(songFileName: string, bpm: number) {
		this.songFileName = songFileName
		this.bpm = bpm
		this.game = new Game('game', this)
		this.load()
	}

	abstract loadLevel(): void
	abstract onLoaded(): void

	async load() {
		this.loadLevel()
		await this.loadSong()
		this.onLoaded()
	}

	async loadSong() {
		const songURL = await Sound.getFile(this.songFileName, e => {
			console.log((e.loaded / e.total * 100).toFixed(1) + '%')
		})

		this.song.load(songURL)
		this.audioVisualiser = new AudioVisualiser('audio-visualiser', this.song)
	}
}