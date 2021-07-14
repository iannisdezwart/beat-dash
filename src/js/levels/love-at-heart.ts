class LevelLoveAtHeart extends Level {
	constructor() {
		super('/res/songs/blackmill-love-at-heart.mp3', 'Blackmill - Love at Heart', 140)
	}

	loadLevel() {
		this.mapGenerator.add(...[
			MapGenerator.eightBar.intro1,
			MapGenerator.eightBar.intro1Invertor,
			MapGenerator.eightBar.warmup1,
			MapGenerator.eightBar.warmup1Invertor,
			MapGenerator.eightBar.intro1,
			MapGenerator.eightBar.fakeBuildup1,
			MapGenerator.twoBar.break,
			MapGenerator.eightBar.intro1,
			MapGenerator.eightBar.drop3,
			MapGenerator.eightBar.intro1,
			MapGenerator.eightBar.intro1,
			MapGenerator.eightBar.cooldown1,
			MapGenerator.eightBar.cooldown1,
			MapGenerator.eightBar.break,
			MapGenerator.eightBar.intro1Invertor,
			MapGenerator.eightBar.intro1,
			MapGenerator.eightBar.fakeBuildup1,
			MapGenerator.twoBar.break,
			MapGenerator.eightBar.intro1,
			MapGenerator.eightBar.drop3,
			MapGenerator.eightBar.intro1,
			MapGenerator.eightBar.intro1,
			MapGenerator.eightBar.cooldown1,
			MapGenerator.eightBar.cooldown1
		])
	}

	onLoaded() {

	}
}