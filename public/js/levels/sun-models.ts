class LevelSunModels extends Level {
	constructor() {
		super('/songs/sun-models.mp3',
			'Odesza - Sun Models', 60)
	}

	loadLevel() {
		this.mapGenerator.add(...[
			this.mapGenerator.oneBar.spikeScore4,
			this.mapGenerator.oneBar.score4,
			this.mapGenerator.oneBar.spikeScore4,
			this.mapGenerator.oneBar.score4,

			this.mapGenerator.oneBar.spikeScore4,
			this.mapGenerator.oneBar.score4,
			this.mapGenerator.oneBar.spikeScore4,
			this.mapGenerator.oneBar.scoreInvertor4,

			this.mapGenerator.oneBar.platformSpikeContinuous2,
			this.mapGenerator.oneBar.platformSpikeContinuous2,
			this.mapGenerator.oneBar.platformSpikeContinuous2,
			this.mapGenerator.oneBar.platformSpike2,

			this.mapGenerator.oneBar.spikeScore4,
			this.mapGenerator.oneBar.score4,
			this.mapGenerator.oneBar.spikeScore4,
			this.mapGenerator.oneBar.scoreInvertor4,

			this.mapGenerator.oneBar.spikeScore4,
			this.mapGenerator.oneBar.score4,
			this.mapGenerator.oneBar.spikeScore4,
			this.mapGenerator.oneBar.score4,

			this.mapGenerator.oneBar.spikeScore4,
			this.mapGenerator.oneBar.score4,
			this.mapGenerator.oneBar.spikeScore4,
			this.mapGenerator.oneBar.scoreInvertor4,

			this.mapGenerator.oneBar.platformSpikeContinuous2,
			this.mapGenerator.oneBar.platformSpikeContinuous2,
			this.mapGenerator.oneBar.platformSpikeContinuous2,
			this.mapGenerator.oneBar.platformSpike2,

			this.mapGenerator.oneBar.spikeScore4,
			this.mapGenerator.oneBar.score4,
			this.mapGenerator.oneBar.spikeScore4,
			this.mapGenerator.oneBar.scoreInvertor4,

			this.mapGenerator.oneBar.spikeScore4,
			this.mapGenerator.oneBar.score4,
			this.mapGenerator.oneBar.spikeScore4,
			this.mapGenerator.oneBar.score4,

			this.mapGenerator.oneBar.spikeScore4,
			this.mapGenerator.oneBar.score4,
			this.mapGenerator.oneBar.spikeScore4,
			this.mapGenerator.oneBar.score4,
		])
	}

	onLoaded() {
		// ScoreBlock.leftOffset = 0
	}
}