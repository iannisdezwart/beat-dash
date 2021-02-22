class LevelCraveYou extends Level {
	constructor() {
		super('/songs/flight-facilities-crave-you-adventure-club-remix.mp3',
			'Flight Facilities - Crave You (remix)', 140)
	}

	loadLevel() {
		this.mapGenerator.add(...[
			this.introOutro,
			this.introOutro,
			this.introOutro,
			this.introOutro,
			this.introDrums,
			this.introDrums,
			this.warmupDrums,
			this.warmupDrums,
			this.warmupDrums,
			this.warmupDrums,
			this.preDropCooldown,
			this.drop,
			this.drop,
			this.drop2,
			this.dropEnd,
			this.dropCooldown,

			// Todo: make rest of the map
		])
	}

	introOutro(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0) ]), false, true))
		sprites.push(new ScoreBlock(new Vector([ beat + 3, gen.calcY(0) ]), false, false))
		sprites.push(new ScoreBlock(new Vector([ beat + 4, gen.calcY(0) ]), false, true))
		sprites.push(new ScoreBlock(new Vector([ beat + 6, gen.calcY(0) ]), false, false))
		return 8
	}

	introDrums(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0) ]), false, true))
		sprites.push(new ScoreBlock(new Vector([ beat + 6, gen.calcY(0) ]), false, false))
		sprites.push(new ScoreBlock(new Vector([ beat + 10, gen.calcY(0) ]), false, true))
		sprites.push(new ScoreBlock(new Vector([ beat + 14, gen.calcY(0) ]), false, false))
		return 16
	}

	warmupDrums(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0) ]), false, true))
		sprites.push(new Spike(new Vector([ beat + 4, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 6, gen.calcY(0) ]), false, false))
		sprites.push(new Spike(new Vector([ beat + 8, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 10, gen.calcY(0) ]), false, true))
		sprites.push(new Spike(new Vector([ beat + 12, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 14, gen.calcY(0) ]), false, false))
		return 16
	}

	buildupDrums(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0) ]), false, true))
		sprites.push(new Spike(new Vector([ beat + 4, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 6, gen.calcY(0) ]), false, false))
		sprites.push(new Spike(new Vector([ beat + 8, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 10, gen.calcY(0) ]), false, true))
		sprites.push(new Spike(new Vector([ beat + 12, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 14, gen.calcY(0) ]), false, false))
		return 16
	}

	preDropCooldown(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Break(beat, 16))
		sprites.push(new ScoreBlock(new Vector([ beat + 16, gen.calcY(0) ]), false, true))
		sprites.push(new ScoreBlock(new Vector([ beat + 20, gen.calcY(0) ]), false, false))
		sprites.push(new ScoreBlock(new Vector([ beat + 24, gen.calcY(0) ]), false, true))
		sprites.push(new ScoreBlock(new Vector([ beat + 25, gen.calcY(0) ]), false, false))
		sprites.push(new ScoreBlock(new Vector([ beat + 26, gen.calcY(0) ]), false, true))
		sprites.push(new ScoreBlock(new Vector([ beat + 27, gen.calcY(0) ]), false, false))
		sprites.push(new ScoreBlock(new Vector([ beat + 28, gen.calcY(0) ]), false, true))
		sprites.push(new ScoreBlock(new Vector([ beat + 29, gen.calcY(0) ]), false, false))
		sprites.push(new ScoreBlock(new Vector([ beat + 30, gen.calcY(0) ]), false, true))
		sprites.push(new ScoreBlock(new Vector([ beat + 31, gen.calcY(0) ]), false, false))
		return 32
	}

	drop(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 1, gen.calcY(0) ]), false, true))
		sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0) ]), false, false))
		sprites.push(new ScoreBlock(new Vector([ beat + 3, gen.calcY(0) ]), false, true))
		sprites.push(new Spike(new Vector([ beat + 4, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 5, gen.calcY(0) ]), false, false))
		sprites.push(new Spike(new Vector([ beat + 8, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 9, gen.calcY(0) ]), false, true))
		sprites.push(new ScoreBlock(new Vector([ beat + 10, gen.calcY(0) ]), false, false))
		sprites.push(new ScoreBlock(new Vector([ beat + 11, gen.calcY(0) ]), false, true))
		sprites.push(new Spike(new Vector([ beat + 12, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		return 16
	}

	drop2(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0) ]), false, true))
		sprites.push(new ScoreBlock(new Vector([ beat + 3, gen.calcY(0) ]), false, false))
		sprites.push(new Spike(new Vector([ beat + 4, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 5, gen.calcY(0) ]), false, true))
		sprites.push(new ScoreBlock(new Vector([ beat + 6, gen.calcY(0) ]), false, false))
		sprites.push(new ScoreBlock(new Vector([ beat + 7, gen.calcY(0) ]), false, true))
		sprites.push(new Spike(new Vector([ beat + 8, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 10, gen.calcY(0) ]), false, false))
		sprites.push(new ScoreBlock(new Vector([ beat + 11, gen.calcY(0) ]), false, true))
		sprites.push(new Spike(new Vector([ beat + 12, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 13, gen.calcY(0) ]), false, false))
		sprites.push(new ScoreBlock(new Vector([ beat + 14, gen.calcY(0) ]), false, true))
		return 16
	}

	dropEnd(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0) ]), false, true))
		sprites.push(new ScoreBlock(new Vector([ beat + 3, gen.calcY(0) ]), false, false))
		sprites.push(new Spike(new Vector([ beat + 4, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 5, gen.calcY(0) ]), false, true))
		sprites.push(new ScoreBlock(new Vector([ beat + 6, gen.calcY(0) ]), false, false))
		sprites.push(new ScoreBlock(new Vector([ beat + 7, gen.calcY(0) ]), false, true))
		sprites.push(new Spike(new Vector([ beat + 8, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new Spike(new Vector([ beat + 12, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		return 16
	}

	dropCooldown(sprites: Sprite[], beat: number, gen: MapGenerator) {
		// Todo: make

		return 16
	}

	onLoaded() {

	}
}