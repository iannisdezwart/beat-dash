class LevelNostalgia extends Level {
	constructor() {
		// super('/songs/tobu-nostalgia-short.mp3', 'Tobu - Nostalgia (short)', 128)
		super('/songs/tobu-nostalgia.mp3', 'Tobu - Nostalgia', 128)
		// super('/songs/ephixa-laura-brehm-losing-you.mp3', 'Ephixa & Laura Brehm - Losing You', 124)
		// super('/songs/phantom-sage-away-feat-byndy-ncs-release.mp3', 'Phantom Sage - Away (ft. Byndy)', 140)
		// super('/songs/flight-facilities-crave-you-adventure-club-dubstep-remix.mp3', 'Flight Facilities - Crave You (Adventure Club remix)', 140)
	}

	loadLevel() {
		this.game.sprites.push(new Floor())
		this.game.sprites.push(new Ceiling())

		let beat = -4

		// this.game.sprites.push(new GravityInvertor(4))

		// Intro

		this.mapGenerator.add(...[
			MapGenerator.fourBar.alternatingSpikeScore2,
			MapGenerator.fourBar.alternatingSpikeScore2
		])

		// Warmup

		this.mapGenerator.add(...[
			MapGenerator.fourBar.spikeScoreStepLeft2,
			MapGenerator.fourBar.spikeScoreStepRight2
		])

		// Build up

		this.mapGenerator.add(...[
			MapGenerator.fourBar.fakeBuildUpSpikeScore4,
			MapGenerator.fourBar.fakeBuildUpSpikeScore4
		])

		// Continuation of build up

		this.mapGenerator.add(...[
			MapGenerator.fourBar.alternatingSpikeScore4,
			MapGenerator.fourBar.alternatingSpikeScore4
		])

		// Drop

		this.mapGenerator.add(...[
			MapGenerator.fourBar.alternatingSpikeScoreMania4,
			MapGenerator.fourBar.alternatingSpikeScoreMania4
		])

		// Continuation of drop

		this.mapGenerator.add(...[
			MapGenerator.fourBar.alternatingStepScoreMania4,
			MapGenerator.fourBar.alternatingStepScoreMania4
		])

		// Cooldown

		this.mapGenerator.add(...[
			MapGenerator.fourBar.break,
			MapGenerator.fourBar.break
		])

		// Intro

		this.mapGenerator.add(...[
			MapGenerator.fourBar.alternatingSpikeScore2,
			MapGenerator.fourBar.alternatingSpikeScore2
		])

		// Warmup

		this.mapGenerator.add(...[
			MapGenerator.fourBar.spikeScoreStepLeft2,
			MapGenerator.fourBar.spikeScoreStepRight2
		])

		// Build up

		this.mapGenerator.add(...[
			MapGenerator.fourBar.fakeBuildUpSpikeScore4,
			MapGenerator.fourBar.fakeBuildUpSpikeScore4
		])

		// Drop

		this.mapGenerator.add(...[
			MapGenerator.fourBar.alternatingSpikeScoreMania4,
			MapGenerator.fourBar.alternatingSpikeScoreMania4
		])

		// Continuation of drop

		this.mapGenerator.add(...[
			MapGenerator.fourBar.alternatingStepScoreMania4,
			MapGenerator.fourBar.alternatingStepScoreMania4
		])

		// Final drop

		this.mapGenerator.add(...[
			MapGenerator.fourBar.alternatingSpikeScoreMania4,
			MapGenerator.fourBar.alternatingSpikeScoreMania4
		])

		// Chill

		// landscapeTemplates.score2(this.game, beat += 4)
		// landscapeTemplates.platformSpike2(this.game, beat += 4)
		// landscapeTemplates.score2(this.game, beat += 4)
		// landscapeTemplates.platformSpike2(this.game, beat += 4)

		// landscapeTemplates.score2(this.game, beat += 4)
		// landscapeTemplates.platformSpike2(this.game, beat += 4)
		// landscapeTemplates.score2(this.game, beat += 4)
		// landscapeTemplates.platformSpike2(this.game, beat += 4)

		// More Chill

		

		// We'll see

		// for (let i = 1; i < 1000; i += 2) {
		// 	const colour = (i % 2 == 0) ? '#ff0000' : '#0000ff'
		// 	this.game.sprites.push(new Spike(new Vector([ i, 0.55 ]), false, colour))
		// }

		// for (let i = 0; i < 1000; i += 2) {
		// 	this.game.sprites.push(new ScoreBlock(new Vector([ i, 0.55 ])))
		// }

		// for (let i = 1; i < 1000; i += 2) {
		// 	this.game.sprites.push(new ScoreBlock(new Vector([ i, 0.55 ]), false))
		// }

		// this.game.sprites.push(new Spike(new Vector([ 1, 0.55 ])))
		// this.game.sprites.push(new Spike(new Vector([ 3, 0.55 ])))
		// this.game.sprites.push(new Spike(new Vector([ 5, 0.55 ])))

		// this.game.sprites.push(new Platform(7, 4, 0.05))
		// this.game.sprites.push(new Spike(new Vector([ 9, 0.50 ])))
		// this.game.sprites.push(new Platform(11, 4, 0.10))
		// this.game.sprites.push(new Spike(new Vector([ 13, 0.45 ])))
		// this.game.sprites.push(new Platform(15, 4, 0.15))
		// this.game.sprites.push(new Spike(new Vector([ 17, 0.40 ])))
		// this.game.sprites.push(new Platform(19, 4, 0.20))
		// this.game.sprites.push(new Spike(new Vector([ 21, 0.35 ])))

		// this.game.sprites.push(new Spike(new Vector([ 23, 0.55 ])))
		// this.game.sprites.push(new Spike(new Vector([ 25, 0.55 ])))

		// this.game.sprites.push(new Platform(27, 2, 0.05))
		// this.game.sprites.push(new Spike(new Vector([ 28, 0.50 ])))
		// this.game.sprites.push(new Platform(29, 2, 0.10))
		// this.game.sprites.push(new Spike(new Vector([ 30, 0.45 ])))
		// this.game.sprites.push(new Platform(31, 2, 0.15))
		// this.game.sprites.push(new Spike(new Vector([ 32, 0.40 ])))
		// this.game.sprites.push(new Platform(33, 2, 0.20))
		// this.game.sprites.push(new Spike(new Vector([ 34, 0.35 ])))

		// this.game.sprites.push(new Spike(new Vector([ 6, 0.55 ])))
		// this.game.sprites.push(new Platform(8, 4, 0.05))
		// this.game.sprites.push(new Spike(new Vector([ 10, 0.50 ])))
		// this.game.sprites.push(new Spike(new Vector([ 12, 0.50 ])))
		// this.game.sprites.push(new Spike(new Vector([ 14, 0.50 ])))
		// this.game.sprites.push(new Spike(new Vector([ 16, 0.55 ])))
		// this.game.sprites.push(new Spike(new Vector([ 18, 0.55 ])))
		// this.game.sprites.push(new Spike(new Vector([ 20, 0.55 ])))
		// this.game.sprites.push(new Platform(16, 16, 0.05))
		// this.game.sprites.push(new Spike(new Vector([ 20, 0.5 ])))
		// this.game.sprites.push(new Spike(new Vector([ 24, 0.5 ])))
		// this.game.sprites.push(new Platform(24, 16, 0.1))
		// this.game.sprites.push(new Spike(new Vector([ 28, 0.45 ])))
		// this.game.sprites.push(new Spike(new Vector([ 32, 0.45 ])))
		// this.game.sprites.push(new Spike(new Vector([ 36, 0.45 ])))
		// this.game.sprites.push(new Spike(new Vector([ 44, 0.55 ])))
		// this.game.sprites.push(new Spike(new Vector([ 48, 0.55 ])))
		// this.game.sprites.push(new Spike(new Vector([ 52, 0.55 ])))
		// this.game.sprites.push(new Platform(1, 0.5, 0.08))
		// this.game.sprites.push(new Platform(1.5, 1, 0.16))
		// this.game.sprites.push(new Platform(2, 1.5, 0.24))
		// this.game.sprites.push(new Platform(4, 0.5, 0.08, true))
		// this.game.sprites.push(new Platform(4.5, 1, 0.16, true))
		// this.game.sprites.push(new Platform(5, 1.5, 0.24, true))
		this.game.addPlayer(new Player(this.game))
	}

	onLoaded() {

	}
}