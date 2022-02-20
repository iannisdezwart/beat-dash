class LevelCraveYou extends Level {
	constructor() {
		super('flight-facilities-crave-you-adventure-club-remix',
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
			this.drop1End,
			this.drop2,
			this.drop2End,
			this.dropCooldown,
			this.drop3,
			this.dropBuildup,
			this.drop3,
			this.cooldownDrums,
			this.cooldownDrums,
			this.warmupDrums,
			this.warmupDrums,
			this.warmupDrums,
			this.warmupDrums,
			this.preDropCooldown2,
			this.drop,
			this.drop1End,
			this.drop2,
			this.drop2End,
			this.drop2Cooldown,
			this.warmupDrums,
			this.warmupDrums,
			this.warmupDrums,
		])
	}

	introOutro(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 3, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 4, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreTrail(new Vector([ beat + 6, gen.calcY(0) ]), 1.25, false, false))
		return 8
	}

	introDrums(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 6, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 10, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 14, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		return 16
	}

	warmupDrums(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new Spike(new Vector([ beat + 4, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 6, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new Spike(new Vector([ beat + 8, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 10, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new Spike(new Vector([ beat + 12, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 14, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		return 16
	}

	buildupDrums(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new Spike(new Vector([ beat + 4, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 6, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new Spike(new Vector([ beat + 8, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 10, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new Spike(new Vector([ beat + 12, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 14, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		return 16
	}

	preDropCooldown(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Break(beat, 24))
		sprites.push(new ScoreBlock(new Vector([ beat + 24, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 25, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 26, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 27, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 28, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 29, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 30, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		return 32
	}

	drop(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 1, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 3, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new Spike(new Vector([ beat + 4, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 5, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new Spike(new Vector([ beat + 8, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 9, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 10, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 11, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new Spike(new Vector([ beat + 12, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		return 16
	}

	drop1End(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 1, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 3, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new Spike(new Vector([ beat + 4, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 5, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreTrail(new Vector([ beat + 8, gen.calcY(0) ]), 1, false, true))
		sprites.push(new ScoreTrail(new Vector([ beat + 10, gen.calcY(0) ]), 1, false, false))
		sprites.push(new ScoreTrail(new Vector([ beat + 12, gen.calcY(0) ]), 1, false, true))
		sprites.push(new ScoreTrail(new Vector([ beat + 14, gen.calcY(0) ]), 1, false, false))
		return 16
	}

	drop2(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 3, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new Spike(new Vector([ beat + 4, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 5, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 6, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 7, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new Spike(new Vector([ beat + 8, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 10, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 11, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new Spike(new Vector([ beat + 12, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 13, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 14, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		return 16
	}

	drop2End(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 3, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new Spike(new Vector([ beat + 4, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 5, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 6, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 7, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreTrail(new Vector([ beat + 8, gen.calcY(0) ]), 1, false, false))
		sprites.push(new ScoreTrail(new Vector([ beat + 10, gen.calcY(0) ]), 1, false, true))
		sprites.push(new ScoreTrail(new Vector([ beat + 12, gen.calcY(0) ]), 1, false, false))
		sprites.push(new ScoreTrail(new Vector([ beat + 14, gen.calcY(0) ]), 1, false, true))
		return 16
	}

	dropCooldown(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Break(beat, 10))
		sprites.push(new ScoreTrail(new Vector([ beat + 10, gen.calcY(0) ]), 1, false, true))
		sprites.push(new ScoreTrail(new Vector([ beat + 12, gen.calcY(0) ]), 1, false, false))
		sprites.push(new ScoreTrail(new Vector([ beat + 14, gen.calcY(0) ]), 1, false, true))
		return 16
	}

	drop2Cooldown(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Break(beat, 10))
		sprites.push(new Spike(new Vector([ beat + 10, gen.calcY(0) ]), gen.gravInverted, '#ff0000'))
		sprites.push(new Spike(new Vector([ beat + 12, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new Spike(new Vector([ beat + 14, gen.calcY(0) ]), gen.gravInverted, '#ff0000'))
		return 16
	}

	dropBuildup(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new Break(beat + 2, 8))
		sprites.push(new ScoreBlock(new Vector([ beat + 10, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new Spike(new Vector([ beat + 12, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 14, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		return 16
	}

	drop3(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 3, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new Spike(new Vector([ beat + 4, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 5, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 6, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 7, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new Spike(new Vector([ beat + 8, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 10, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 11, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new Spike(new Vector([ beat + 12, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 13, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 14, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		return 16
	}

	preDropCooldown2(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Break(beat, 16))
		return 16
	}

	cooldownDrums(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 6, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new Spike(new Vector([ beat + 8, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 10, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 14, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		return 16
	}

	onLoaded() {

	}
}