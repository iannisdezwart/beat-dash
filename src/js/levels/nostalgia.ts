class LevelNostalgia extends Level {
	constructor() {
		// super('/res/songs/tobu-nostalgia-short.mp3', 'Tobu - Nostalgia (short)', 128)
		super('/res/songs/tobu-nostalgia.mp3', 'Tobu - Nostalgia', 128)
		// super('/res/songs/ephixa-laura-brehm-losing-you.mp3', 'Ephixa & Laura Brehm - Losing You', 124)
		// super('/res/songs/phantom-sage-away-feat-byndy-ncs-release.mp3', 'Phantom Sage - Away (ft. Byndy)', 140)
		// super('/res/songs/flight-facilities-crave-you-adventure-club-dubstep-remix.mp3', 'Flight Facilities - Crave You (Adventure Club remix)', 140)
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