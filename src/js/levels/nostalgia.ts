class LevelNostalgia extends Level {
	constructor() {
		super('tobu-nostalgia', 'Tobu - Nostalgia', 128)
	}

	loadLevel() {
		this.mapGenerator.add(...[
			MapGenerator.eightBar.intro1Invertor,
			MapGenerator.eightBar.warmup1Invertor,
			MapGenerator.eightBar.fakeBuildup1,
			MapGenerator.eightBar.buildup1,
			MapGenerator.eightBar.drop1,
			MapGenerator.eightBar.drop2Invertor,
			MapGenerator.eightBar.break,
			MapGenerator.eightBar.intro1,
			MapGenerator.eightBar.warmup1Invertor,
			MapGenerator.eightBar.buildup1,
			MapGenerator.eightBar.drop1,
			MapGenerator.eightBar.drop2Invertor,
			MapGenerator.eightBar.drop1
		])
	}

	onLoaded() {

	}
}