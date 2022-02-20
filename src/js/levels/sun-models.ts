class LevelSunModels extends Level {
	constructor() {
		super('odesza-sun-models', 'Odesza - Sun Models', 60)
	}

	loadLevel() {
		this.mapGenerator.add(...[
			MapGenerator.oneBar.spikeScore4,
			MapGenerator.oneBar.score4,
			MapGenerator.oneBar.spikeScore4,
			MapGenerator.oneBar.score4,

			MapGenerator.oneBar.spikeScore4,
			MapGenerator.oneBar.score4,
			MapGenerator.oneBar.spikeScore4,
			MapGenerator.oneBar.scoreInvertor4,

			MapGenerator.oneBar.platformSpikeContinuous2,
			MapGenerator.oneBar.platformSpikeContinuous2,
			MapGenerator.oneBar.platformSpikeContinuous2,
			MapGenerator.oneBar.platformSpike2,

			MapGenerator.oneBar.spikeScore4,
			MapGenerator.oneBar.score4,
			MapGenerator.oneBar.spikeScore4,
			MapGenerator.oneBar.scoreInvertor4,

			MapGenerator.oneBar.spikeScore4,
			MapGenerator.oneBar.score4,
			MapGenerator.oneBar.spikeScore4,
			MapGenerator.oneBar.score4,

			MapGenerator.oneBar.spikeScore4,
			MapGenerator.oneBar.score4,
			MapGenerator.oneBar.spikeScore4,
			MapGenerator.oneBar.scoreInvertor4,

			MapGenerator.oneBar.platformSpikeContinuous2,
			MapGenerator.oneBar.platformSpikeContinuous2,
			MapGenerator.oneBar.platformSpikeContinuous2,
			MapGenerator.oneBar.platformSpike2,

			MapGenerator.oneBar.spikeScore4,
			MapGenerator.oneBar.score4,
			MapGenerator.oneBar.spikeScore4,
			MapGenerator.oneBar.scoreInvertor4,

			MapGenerator.oneBar.spikeScore4,
			MapGenerator.oneBar.score4,
			MapGenerator.oneBar.spikeScore4,
			MapGenerator.oneBar.score4,

			MapGenerator.oneBar.spikeScore4,
			MapGenerator.oneBar.score4,
			MapGenerator.oneBar.spikeScore4,
			MapGenerator.oneBar.score4,
		])
	}

	onLoaded() {
		// ScoreBlock.leftOffset = 0
	}
}