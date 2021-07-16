class LevelAway extends Level {
	constructor() {
		super('/res/songs/phantom-sage-away-feat-byndy-ncs-release.mp3',
			'Phantom Sage - Away', 140)
	}

	loadLevel() {
		this.startWithJump = false

		this.mapGenerator.add(...[
			this.break,
			this.intro,
			this.intro,
			this.intro,
			this.intro,
			this.introDrop1,
			this.intro,
			this.introDrop2,
			this.intro,
			this.warmup1,
			this.warmup1,
			this.warmup1,
			this.warmup1,
			this.warmup2,
			this.warmup2,
			this.warmup2,
			this.warmup2Drop,
			this.drop,
			this.drop,
			this.drop,
			this.dropSwirl,
			this.drop,
			this.drop,
			this.drop,
			this.drop,
			this.intro,
			this.intro,
			this.introDrums,
			this.introDrums,
			this.intro,
			this.intro,
			this.introDrums,
			this.introDrums,
			this.warmup1,
			this.warmup1,
			this.warmup1,
			this.warmup1,
			this.warmup2,
			this.warmup2,
			this.warmup2,
			this.warmup2Drop,
			this.drop,
			this.drop,
			this.drop,
			this.dropSwirl,
			this.drop,
			this.drop,
			this.drop,
			this.drop,
			this.warmup1,
			this.warmup1,
			this.warmup1,
			this.warmup1,
			this.warmup2,
			this.warmup2,
			this.warmup2,
			this.warmup2Drop,
			this.intro,
			this.intro,
			this.intro,
			this.intro,
			this.finalNote,
		])
	}

	onLoaded() {

	}

	break(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Break(beat, 4))
		return 4
	}

	intro(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new ScoreTrail(new Vector([ beat, gen.calcY(0) ]), 2, false, true, 0.25))
		sprites.push(new ScoreTrail(new Vector([ beat + 4, gen.calcY(0) ]), 2, false, false, 0.25))
		return 8
	}

	finalNote(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new ScoreTrail(new Vector([ beat, gen.calcY(0) ]), 2, false, true, 0.25))
		return 8
	}

	introDrums(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new ScoreTrail(new Vector([ beat, gen.calcY(0) ]), 1.5, false, true, 0.25))
		sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0) ]), false, ScoreBlockOrientation.FAR_LEFT))
		sprites.push(new ScoreTrail(new Vector([ beat + 4, gen.calcY(0) ]), 1.5, false, false, 0.25))
		sprites.push(new ScoreBlock(new Vector([ beat + 6, gen.calcY(0) ]), false, ScoreBlockOrientation.FAR_RIGHT))
		return 8
	}

	introDrop1(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new JumpPad(new Vector([ beat, gen.calcY(0) ]), false, JumpPadOrientation.LEFT))
		sprites.push(new SpikeCeiling(new Vector([ beat + 1, gen.calcY(0.05) ]), SpikeCeilingOrientation.SPIKES_POINT_DOWN, 8))
		sprites.push(new ScoreTrail(new Vector([ beat + 4, gen.calcY(0) ]), 2, false, false, 0.25))
		return 8
	}

	introDrop2(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new ScoreTrail(new Vector([ beat, gen.calcY(0) ]), 2, false, true, 0.25))
		sprites.push(new ScoreBlock(new Vector([ beat + 3, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 4, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 5, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 6, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 7, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		return 8
	}

	warmup1(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new ScoreBlock(new Vector([ beat, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 1, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new SpikeCeiling(new Vector([ beat + 1.3, gen.calcY(0.05) ]), SpikeCeilingOrientation.SPIKES_POINT_DOWN, 4))
		sprites.push(new Spike(new Vector([ beat + 2, gen.calcY(0) ]), false, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 3, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 4, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 5, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new SpikeCeiling(new Vector([ beat + 5.3, gen.calcY(0.05) ]), SpikeCeilingOrientation.SPIKES_POINT_DOWN, 4))
		sprites.push(new Spike(new Vector([ beat + 6, gen.calcY(0) ]), false, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 7, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		return 8
	}

	warmup2(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), false, '#0000ff'))
		sprites.push(new Spike(new Vector([ beat + 1, gen.calcY(0) ]), false, '#ff0000'))
		sprites.push(new SpikeCeiling(new Vector([ beat + 1.8, gen.calcY(0.05) ]), SpikeCeilingOrientation.SPIKES_POINT_DOWN, 16))
		sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 3, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new Spike(new Vector([ beat + 4, gen.calcY(0) ]), false, '#0000ff'))
		sprites.push(new Spike(new Vector([ beat + 5, gen.calcY(0) ]), false, '#ff0000'))
		sprites.push(new SpikeCeiling(new Vector([ beat + 5.8, gen.calcY(0.05) ]), SpikeCeilingOrientation.SPIKES_POINT_DOWN, 16))
		sprites.push(new ScoreBlock(new Vector([ beat + 6, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 7, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		return 8
	}

	warmup2Drop(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), false, '#0000ff'))
		sprites.push(new Spike(new Vector([ beat + 1, gen.calcY(0) ]), false, '#ff0000'))
		sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 3, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new Spike(new Vector([ beat + 4, gen.calcY(0) ]), false, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 6, gen.calcY(0) ]), false, ScoreBlockOrientation.FAR_LEFT))
		return 8
	}

	drop(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new ScoreTrail(new Vector([ beat, gen.calcY(0) ]), 1, false, true))
		sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreTrail(new Vector([ beat + 3, gen.calcY(0) ]), 1.5, false, true))
		sprites.push(new ScoreBlock(new Vector([ beat + 5, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 6, gen.calcY(0) ]), false, ScoreBlockOrientation.FAR_LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 7, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new SpikeCeiling(new Vector([ beat + 8.5, gen.calcY(0.05) ]), SpikeCeilingOrientation.SPIKES_POINT_DOWN, 2))
		sprites.push(new Spike(new Vector([ beat + 8, gen.calcY(0) ]), false, '#0000ff'))
		sprites.push(new Spike(new Vector([ beat + 9, gen.calcY(0) ]), false, '#ff0000'))
		sprites.push(new ScoreTrail(new Vector([ beat + 11, gen.calcY(0) ]), 2.5, false, false))
		sprites.push(new ScoreBlock(new Vector([ beat + 14, gen.calcY(0) ]), false, ScoreBlockOrientation.FAR_LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 15, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		return 16
	}

	dropSwirl(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new ScoreTrail(new Vector([ beat, gen.calcY(0) ]), 0.5, false, true))
		sprites.push(new JumpPad(new Vector([ beat + 1, gen.calcY(0) ]), false, JumpPadOrientation.RIGHT))
		sprites.push(new ScoreTrail(new Vector([ beat + 3, gen.calcY(0) ]), 1.5, false, true))
		sprites.push(new ScoreBlock(new Vector([ beat + 5, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 6, gen.calcY(0) ]), false, ScoreBlockOrientation.FAR_LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 7, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new SpikeCeiling(new Vector([ beat + 8.5, gen.calcY(0.05) ]), SpikeCeilingOrientation.SPIKES_POINT_DOWN, 2))
		sprites.push(new Spike(new Vector([ beat + 8, gen.calcY(0) ]), false, '#0000ff'))
		sprites.push(new Spike(new Vector([ beat + 9, gen.calcY(0) ]), false, '#ff0000'))
		sprites.push(new ScoreTrail(new Vector([ beat + 11, gen.calcY(0) ]), 2.5, false, false))
		sprites.push(new ScoreBlock(new Vector([ beat + 14, gen.calcY(0) ]), false, ScoreBlockOrientation.FAR_LEFT))
		return 16
	}
}