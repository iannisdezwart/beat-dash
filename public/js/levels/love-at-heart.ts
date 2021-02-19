class LevelLoveAtHeart extends Level {
	constructor() {
		super('/songs/blackmill-love-at-heart.mp3', 'Blackmill - Love at Heart', 140)
	}

	loadLevel() {
		this.mapGenerator.add(...[
			this.mapGenerator.eightBar.intro1,
			this.mapGenerator.eightBar.intro1Invertor,
			this.mapGenerator.eightBar.warmup1,
			this.mapGenerator.eightBar.warmup1Invertor,
			this.mapGenerator.eightBar.intro1,
			this.mapGenerator.eightBar.fakeBuildup1,
			this.mapGenerator.twoBar.break,
			this.mapGenerator.eightBar.intro1,
			this.mapGenerator.eightBar.drop3,
			this.mapGenerator.eightBar.intro1,
			this.mapGenerator.eightBar.intro1,
			this.mapGenerator.eightBar.cooldown1,
			this.mapGenerator.eightBar.cooldown1,
			this.mapGenerator.eightBar.break,
			this.mapGenerator.eightBar.intro1Invertor,
			this.mapGenerator.eightBar.intro1,
			this.mapGenerator.eightBar.fakeBuildup1,
			this.mapGenerator.twoBar.break,
			this.mapGenerator.eightBar.intro1,
			this.mapGenerator.eightBar.drop3,
			this.mapGenerator.eightBar.intro1,
			this.mapGenerator.eightBar.intro1,
			this.mapGenerator.eightBar.cooldown1,
			this.mapGenerator.eightBar.cooldown1
		])
	}

	onLoaded() {

	}
}