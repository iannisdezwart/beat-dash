class LevelNostalgia extends Level {
	constructor() {
		// super('/songs/tobu-nostalgia-short.mp3', 'Tobu - Nostalgia (short)', 128)
		super('/songs/tobu-nostalgia.mp3', 'Tobu - Nostalgia', 128)
		// super('/songs/ephixa-laura-brehm-losing-you.mp3', 'Ephixa & Laura Brehm - Losing You', 124)
		// super('/songs/phantom-sage-away-feat-byndy-ncs-release.mp3', 'Phantom Sage - Away (ft. Byndy)', 140)
		// super('/songs/flight-facilities-crave-you-adventure-club-dubstep-remix.mp3', 'Flight Facilities - Crave You (Adventure Club remix)', 140)
	}

	loadLevel() {
		this.mapGenerator.add(...[
			this.mapGenerator.eightBar.intro1Invertor,
			this.mapGenerator.eightBar.warmup1Invertor,
			this.mapGenerator.eightBar.fakeBuildup1,
			this.mapGenerator.eightBar.buildup1,
			this.mapGenerator.eightBar.drop1,
			this.mapGenerator.eightBar.drop2Invertor,
			this.mapGenerator.eightBar.break,
			this.mapGenerator.eightBar.intro1,
			this.mapGenerator.eightBar.warmup1Invertor,
			this.mapGenerator.eightBar.buildup1,
			this.mapGenerator.eightBar.drop1,
			this.mapGenerator.eightBar.drop2Invertor,
			this.mapGenerator.eightBar.drop1
		])
	}

	onLoaded() {

	}
}