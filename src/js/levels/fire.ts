class LevelFire extends Level {
	constructor() {
		super('/res/songs/brook-xiao-fire-ft-rachel-horter-ncs-release.mp3',
			'Brook Xiao - Fire', 148)
	}

	loadLevel() {
		this.startWithJump = false

		this.mapGenerator.add(...[
			this.startBreak,
			this.intro,
			this.intro,
			this.intro2,
			this.intro2,
			this.introCooldown,
			this.introCooldown,
			this.buildup,
			this.buildup2,
			this.drop,
			this.drop,
			this.drop,
			this.drop,
			this.intro2,
			this.intro2,
			this.intro2,
			this.intro2,
			this.buildup3,
			this.buildup4,
			this.buildup,
			this.buildup2,
			this.drop,
			this.drop,
			this.drop,
			this.drop,
			this.buildup,
			this.buildup2
		])
	}

	onLoaded() {

	}

	startBreak(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Break(0, 4))
		return 4
	}

	intro(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), false, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 4.5, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 5, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new Spike(new Vector([ beat + 8, gen.calcY(0) ]), false, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 11, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 12.5, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 13, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		return 16
	}

	intro2(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), false, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0) ]), false, ScoreBlockOrientation.TOP_LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 4.5, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 5, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 6, gen.calcY(0) ]), false, ScoreBlockOrientation.TOP_RIGHT))
		sprites.push(new Spike(new Vector([ beat + 8, gen.calcY(0) ]), false, '#0000ff'))
		sprites.push(new ScoreBlock(new Vector([ beat + 10, gen.calcY(0) ]), false, ScoreBlockOrientation.TOP_LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 11, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 12.5, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 13, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 14, gen.calcY(0) ]), false, ScoreBlockOrientation.TOP_RIGHT))
		return 16
	}

	introCooldown(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new ScoreTrail(new Vector([ beat, gen.calcY(0) ]), 8, false, true, 1 / 8))
		sprites.push(new ScoreTrail(new Vector([ beat + 8, gen.calcY(0) ]), 3.5, false, false, 1 / 8))
		sprites.push(new ScoreTrail(new Vector([ beat + 11.5, gen.calcY(0) ]), 2, false, true, 1 / 8))
		return 16
	}

	buildupOld(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), false, '#0000ff'))
		sprites.push(new Spike(new Vector([ beat + 2, gen.calcY(0) ]), false, '#ff0000'))
		sprites.push(new Spike(new Vector([ beat + 4, gen.calcY(0) ]), false, '#0000ff'))
		sprites.push(new Spike(new Vector([ beat + 6, gen.calcY(0) ]), false, '#ff0000'))
		sprites.push(new Spike(new Vector([ beat + 8, gen.calcY(0) ]), false, '#0000ff'))
		sprites.push(new Spike(new Vector([ beat + 10, gen.calcY(0) ]), false, '#ff0000'))
		sprites.push(new Spike(new Vector([ beat + 12, gen.calcY(0) ]), false, '#0000ff'))
		sprites.push(new Spike(new Vector([ beat + 14, gen.calcY(0) ]), false, '#ff0000'))
		return 16
	}

	buildup(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new ScoreBlock(new Vector([ beat, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 0.5, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 1, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new Spike(new Vector([ beat + 2, gen.calcY(0) ]), false, '#ff0000'))
		sprites.push(new ScoreBlock(new Vector([ beat + 3, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 3.5, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 4, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new Spike(new Vector([ beat + 6, gen.calcY(0) ]), false, '#ff0000'))
		sprites.push(new ScoreBlock(new Vector([ beat + 8, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 8.5, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 9, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new Spike(new Vector([ beat + 10, gen.calcY(0) ]), false, '#ff0000'))
		sprites.push(new ScoreBlock(new Vector([ beat + 11, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 11.5, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 12, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new Spike(new Vector([ beat + 14, gen.calcY(0) ]), false, '#ff0000'))
		return 16
	}

	buildup2(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new ScoreBlock(new Vector([ beat, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 0.5, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 1, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new Spike(new Vector([ beat + 2, gen.calcY(0) ]), false, '#ff0000'))
		sprites.push(new ScoreBlock(new Vector([ beat + 3, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 3.5, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 4, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new Spike(new Vector([ beat + 6, gen.calcY(0) ]), false, '#ff0000'))
		sprites.push(new ScoreBlock(new Vector([ beat + 8, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 8.5, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT)) 
		sprites.push(new ScoreBlock(new Vector([ beat + 9, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new Spike(new Vector([ beat + 10, gen.calcY(0) ]), false, '#ff0000'))
		sprites.push(new ScoreBlock(new Vector([ beat + 11, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 11.5, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		return 16
	}

	buildup3(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new ScoreTrail(new Vector([ beat, gen.calcY(0) ]), 2.5, false, true))
		sprites.push(new ScoreTrail(new Vector([ beat + 3, gen.calcY(0) ]), 2.5, false, false))
		sprites.push(new ScoreTrail(new Vector([ beat + 6, gen.calcY(0) ]), 1.5, false, true))
		sprites.push(new ScoreTrail(new Vector([ beat + 8, gen.calcY(0) ]), 2.5, false, false))
		sprites.push(new ScoreTrail(new Vector([ beat + 11, gen.calcY(0) ]), 2.5, false, true))
		sprites.push(new ScoreTrail(new Vector([ beat + 14, gen.calcY(0) ]), 1.5, false, false))
		return 16
	}

	buildup4(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new ScoreTrail(new Vector([ beat, gen.calcY(0) ]), 2.5, false, true))
		sprites.push(new ScoreTrail(new Vector([ beat + 3, gen.calcY(0) ]), 2.5, false, false))
		sprites.push(new ScoreTrail(new Vector([ beat + 6, gen.calcY(0) ]), 1.5, false, true))
		sprites.push(new ScoreTrail(new Vector([ beat + 8, gen.calcY(0) ]), 1.5, false, false))
		sprites.push(new ScoreTrail(new Vector([ beat + 10, gen.calcY(0) ]), 0.5, false, true))
		sprites.push(new ScoreTrail(new Vector([ beat + 11, gen.calcY(0) ]), 2.5, false, false))
		return 16
	}

	drop(sprites: Sprite[], beat: number, gen: MapGenerator) {
		sprites.push(new ScoreBlock(new Vector([ beat, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 0.5, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 1, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		// sprites.push(new ScoreTrail(new Vector([ beat + 1, gen.calcY(0) ]), 0.25, false, true))
		sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0)]), false, ScoreBlockOrientation.TOP_LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 3, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 3.5, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		// sprites.push(new ScoreBlock(new Vector([ beat + 4, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreTrail(new Vector([ beat + 4, gen.calcY(0) ]), 1, false, true))
		sprites.push(new ScoreBlock(new Vector([ beat + 6, gen.calcY(0)]), false, ScoreBlockOrientation.TOP_RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 8, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 8.5, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		sprites.push(new ScoreBlock(new Vector([ beat + 9, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		// sprites.push(new ScoreTrail(new Vector([ beat + 9, gen.calcY(0) ]), 0.25, false, true))
		sprites.push(new ScoreBlock(new Vector([ beat + 10, gen.calcY(0)]), false, ScoreBlockOrientation.TOP_LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 11, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreBlock(new Vector([ beat + 11.5, gen.calcY(0) ]), false, ScoreBlockOrientation.RIGHT))
		// sprites.push(new ScoreBlock(new Vector([ beat + 12, gen.calcY(0) ]), false, ScoreBlockOrientation.LEFT))
		sprites.push(new ScoreTrail(new Vector([ beat + 12, gen.calcY(0) ]), 1, false, true))
		sprites.push(new ScoreBlock(new Vector([ beat + 14, gen.calcY(0)]), false, ScoreBlockOrientation.TOP_RIGHT))
		return 16
	}
}
