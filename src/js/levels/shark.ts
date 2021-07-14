class LevelShark extends Level {
	constructor() {
		super('/res/songs/oh-wonder-shark.mp3', 'Oh Wonder - Shark', 150)
	}

	loadLevel() {
		this.startWithJump = false

		this.mapGenerator.add(...[
			this.introOutro,
			this.introOutro,
			this.introDrums,
			this.introDrums,
			this.introDrums,
			this.introDrums,
			this.buidup,
			this.buidup,
			this.buidup,
			this.buidup,
			this.drop,
			this.drop,
			this.introDrumsAfterDrop,
			this.introDrums,
			this.introDrums,
			this.introDrums,
			this.buidup,
			this.buidup,
			this.buidup,
			this.buidup,
			this.drop,
			this.drop,
			this.drop,
			this.drop,
			this.drop,
			this.drop,
			this.introOutro,
			this.introOutro
		])
	}

	onLoaded() {

	}

	introOutro(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat + 1, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreTrail(new Vector([ beat + 4, gen.calcY(0) ]), 1, false, true))
		sprites.push(new ScoreTrail(new Vector([ beat + 8, gen.calcY(0) ]), 1, false, false))
		return 16
	}

	introDrums(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat + 1.5, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 3, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 7, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new Spike(new Vector([ beat + 9.5, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 11, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new Spike(new Vector([ beat + 14, gen.calcY(0) ]), gen.gravInverted, '#ff0000'))
		sprites.push(new ScoreTrail(new Vector([ beat + 15.5, gen.calcY(0) ]), 0.5, false, false))
		return 16
	}

	introDrumsAfterDrop(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Break(beat, 11))
		sprites.push(new ScoreBlock(new Vector([ beat + 11, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new Spike(new Vector([ beat + 14, gen.calcY(0) ]), gen.gravInverted, '#ff0000'))
		sprites.push(new ScoreBlock(new Vector([ beat + 15.5, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		return 16
	}

	buidup(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat + 1, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 3, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new Spike(new Vector([ beat + 4.5, gen.calcY(0) ]), gen.gravInverted, '#ff0000'))
		sprites.push(new ScoreBlock(new Vector([ beat + 7, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new Spike(new Vector([ beat + 9, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 11, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new Spike(new Vector([ beat + 12.5, gen.calcY(0) ]), gen.gravInverted, '#ff0000'))
		sprites.push(new ScoreBlock(new Vector([ beat + 15, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		return 16
	}

	drop(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat + 1, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 3, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new Spike(new Vector([ beat + 4.5, gen.calcY(0) ]), gen.gravInverted, '#ff0000'))
		sprites.push(new ScoreBlock(new Vector([ beat + 6.5, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 7.5, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new Spike(new Vector([ beat + 9, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 11, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new Spike(new Vector([ beat + 12.5, gen.calcY(0) ]), gen.gravInverted, '#ff0000'))
		sprites.push(new ScoreTrail(new Vector([ beat + 14, gen.calcY(0)]), 0.5, false, false))
		sprites.push(new ScoreBlock(new Vector([ beat + 15.5, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		return 16
	}
}