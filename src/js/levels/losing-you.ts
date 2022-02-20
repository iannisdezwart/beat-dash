class LevelLosingYou extends Level {
	constructor() {
		super('ephixa-laura-brehm-losing-you', 'Losing You', 124)
	}

	loadLevel() {
		this.mapGenerator.add(...[
			LevelLosingYou.introSlow,
			LevelLosingYou.introBuildup,
			LevelLosingYou.introX4,
			LevelLosingYou.introFasterX4,
			LevelLosingYou.introFasterX4,
			LevelLosingYou.introFasterX4,
			LevelLosingYou.introFasterX4,
			LevelLosingYou.introCooldown
		])
	}

	onLoaded() {

	}

	static introSlow(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new Spike(new Vector([ beat + 4, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		return 8
	}

	static introBuildup(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new Spike(new Vector([ beat + 4, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 6, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		return 8
	}

	static intro(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 1, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 3, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		return 4
	}

	static introX4(sprites: Sprite[], beat: number, gen: MapGenerator) {
		LevelLosingYou.intro(sprites, beat, gen)
		LevelLosingYou.intro(sprites, beat + 4, gen)
		LevelLosingYou.intro(sprites, beat + 8, gen)
		LevelLosingYou.intro(sprites, beat + 12, gen)
		return 16
	}

	static introFaster(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 1, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 1.25, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new Spike(new Vector([ beat + 2, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 3, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 3.25, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		return 4
	}

	static introFasterX4(sprites: Sprite[], beat: number, gen: MapGenerator) {
		LevelLosingYou.introFaster(sprites, beat, gen)
		LevelLosingYou.introFaster(sprites, beat + 4, gen)
		LevelLosingYou.introFaster(sprites, beat + 8, gen)
		LevelLosingYou.introFaster(sprites, beat + 12, gen)
		return 16
	}

	static introCooldown(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new ScoreTrail(new Vector([ beat, gen.calcY(0) ]), 3, false, true))
		sprites.push(new ScoreTrail(new Vector([ beat + 4 * 2 / 3, gen.calcY(0) ]), 3, false, false))
		sprites.push(new ScoreTrail(new Vector([ beat + 8 * 2 / 3, gen.calcY(0) ]), 3, false, true))
		sprites.push(new ScoreTrail(new Vector([ beat + 12 * 2 / 3, gen.calcY(0) ]), 3, false, false))
		sprites.push(new ScoreTrail(new Vector([ beat + 16 * 2 / 3, gen.calcY(0) ]), 3, false, true))
		sprites.push(new ScoreTrail(new Vector([ beat + 20 * 2 / 3, gen.calcY(0) ]), 3, false, false))
		sprites.push(new ScoreTrail(new Vector([ beat + 24 * 2 / 3, gen.calcY(0) ]), 3, false, true))
		sprites.push(new ScoreTrail(new Vector([ beat + 28 * 2 / 3, gen.calcY(0) ]), 3, false, false))
		sprites.push(new ScoreTrail(new Vector([ beat + 32 * 2 / 3, gen.calcY(0) ]), 3, false, true))
		sprites.push(new ScoreTrail(new Vector([ beat + 36 * 2 / 3, gen.calcY(0) ]), 3, false, false))
		sprites.push(new ScoreTrail(new Vector([ beat + 40 * 2 / 3, gen.calcY(0) ]), 3, false, true))
		return 32
	}
}