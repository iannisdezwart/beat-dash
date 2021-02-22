type MapTemplateGenerator = (sprites: Sprite[], beat: number, gen: MapGenerator) => number

class MapGenerator {
	game: Game
	beat = 0
	gravNormal = true
	get gravInverted() { return !this.gravNormal }

	constructor(game: Game) {
		this.game = game
	}

	calcY(yOffset = 0) {
		// If gravity is normal

		if (this.gravNormal) {
			return Floor.y - yOffset * Game.fov
		}

		// If gravity is inverted

		else {
			return Ceiling.y + yOffset * Game.fov
		}
	}

	calcHeight(height: number) {
		return height * Game.fov
	}

	add(...templates: MapTemplateGenerator[]) {
		for (const template of templates) {
			this.beat += template(this.game.sprites, this.beat, this)
		}
	}

	static special = {
		gravityInvertor: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			sprites.push(new GravityInvertor(beat))
			gen.gravNormal = gen.gravNormal ? false : true
			return 0
		}
	}

	static oneBar = {
		break: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			sprites.push(new Break(beat, 4))
			return 4
		},

		spike1: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
			return 4
		},

		leftScore1: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			sprites.push(new ScoreBlock(new Vector([ beat, gen.calcY(0)]), gen.gravInverted, true))
			return 4
		},

		rightScore1: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			sprites.push(new ScoreBlock(new Vector([ beat, gen.calcY(0)]), gen.gravInverted, false))
			return 4
		},

		spike2: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
			sprites.push(new Spike(new Vector([ beat + 2, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
			return 4
		},

		score2: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			sprites.push(new ScoreBlock(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, true))
			sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0) ]), gen.gravInverted, false))
			return 4
		},

		spikeLeftScore2: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
			sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0)]), gen.gravInverted, true))
			return 4
		},

		spikeRightScore2: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
			sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0)]), gen.gravInverted, false))
			return 4
		},

		spikeGravityInvertor2: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
			MapGenerator.special.gravityInvertor(sprites, beat + 2, gen)
			return 4
		},

		steps2: (sprites: Sprite[], beat: number, gen: MapGenerator) =>{
			sprites.push(new Platform(beat, 2, gen.calcHeight(0.1), gen.gravInverted))
			sprites.push(new Platform(beat + 2, 1, gen.calcHeight(0.2), gen.gravInverted))
			return 4
		},

		stepsScore4: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			sprites.push(new Platform(beat, 2, gen.calcHeight(0.1), gen.gravInverted))
			sprites.push(new ScoreBlock(new Vector([ beat + 1, gen.calcY(0.1) ]), gen.gravInverted, true))
			sprites.push(new Platform(beat + 2, 1, gen.calcHeight(0.2), gen.gravInverted))
			sprites.push(new ScoreBlock(new Vector([ beat + 3, gen.calcY(0.2) ]), gen.gravInverted, false))
			return 4
		},

		platformSpike2: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			sprites.push(new Platform(beat, 3, gen.calcHeight(0.1), gen.gravInverted))
			sprites.push(new Spike(new Vector([ beat + 2, gen.calcY(0.1) ]), gen.gravInverted, '#0000ff'))
			return 4
		},

		platformSpikeContinuous2: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			sprites.push(new Platform(beat, 4, gen.calcHeight(0.1), gen.gravInverted))
			sprites.push(new Spike(new Vector([ beat + 2, gen.calcY(0.1) ]), gen.gravInverted, '#0000ff'))
			sprites.push(new Spike(new Vector([ beat + 4, gen.calcY(0.1) ]), gen.gravInverted, '#0000ff'))
			return 4
		},

		spike4: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
			sprites.push(new Spike(new Vector([ beat + 1, gen.calcY(0) ]), gen.gravInverted, '#ff0000'))
			sprites.push(new Spike(new Vector([ beat + 2, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
			sprites.push(new Spike(new Vector([ beat + 3, gen.calcY(0) ]), gen.gravInverted, '#ff0000'))
			return 4
		},

		spikeScore4: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
			sprites.push(new ScoreBlock(new Vector([ beat + 1, gen.calcY(0) ]), gen.gravInverted, true))
			sprites.push(new Spike(new Vector([ beat + 2, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
			sprites.push(new ScoreBlock(new Vector([ beat + 3, gen.calcY(0) ]), gen.gravInverted, false))
			return 4
		},

		spikeScoreLeftScoreRightScoreLeft4: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
			sprites.push(new ScoreBlock(new Vector([ beat + 1, gen.calcY(0) ]), gen.gravInverted, true))
			sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0) ]), gen.gravInverted, false))
			sprites.push(new ScoreBlock(new Vector([ beat + 3, gen.calcY(0) ]), gen.gravInverted, true))
			return 4
		},

		spikeScoreRightScoreLefScoreRight4: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			sprites.push(new Spike(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, '#0000ff'))
			sprites.push(new ScoreBlock(new Vector([ beat + 1, gen.calcY(0) ]), gen.gravInverted, false))
			sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0) ]), gen.gravInverted, true))
			sprites.push(new ScoreBlock(new Vector([ beat + 3, gen.calcY(0) ]), gen.gravInverted, false))
			return 4
		},

		score4: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			sprites.push(new ScoreBlock(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, true))
			sprites.push(new ScoreBlock(new Vector([ beat + 1, gen.calcY(0) ]), gen.gravInverted, false))
			sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0)]), gen.gravInverted, true))
			sprites.push(new ScoreBlock(new Vector([ beat + 3, gen.calcY(0) ]), gen.gravInverted, false))
			return 4
		},

		scoreInvertor4: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			sprites.push(new ScoreBlock(new Vector([ beat, gen.calcY(0) ]), gen.gravInverted, true))
			sprites.push(new ScoreBlock(new Vector([ beat + 1, gen.calcY(0) ]), gen.gravInverted, false))
			sprites.push(new ScoreBlock(new Vector([ beat + 2, gen.calcY(0)]), gen.gravInverted, true))
			MapGenerator.special.gravityInvertor(sprites, beat + 3, gen)
			return 4
		}
	}

	static twoBar = {
		break: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			sprites.push(new Break(beat, 8))
			return 8
		}
	}

	static fourBar = {
		break: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			sprites.push(new Break(beat, 16))
			return 16
		},

		alternatingSpikeScore2: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			MapGenerator.oneBar.spikeLeftScore2(sprites, beat, gen)
			MapGenerator.oneBar.spikeRightScore2(sprites, beat + 4, gen)
			MapGenerator.oneBar.spikeLeftScore2(sprites, beat + 8, gen)
			MapGenerator.oneBar.spikeRightScore2(sprites, beat + 12, gen)
			return 16
		},

		alternatingSpikeScoreInvertor2: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			MapGenerator.oneBar.spikeLeftScore2(sprites, beat, gen)
			MapGenerator.oneBar.spikeRightScore2(sprites, beat + 4, gen)
			MapGenerator.oneBar.spikeLeftScore2(sprites, beat + 8, gen)
			MapGenerator.oneBar.spikeGravityInvertor2(sprites, beat + 12, gen)
			return 16
		},

		spikeScoreStepLeft2: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			MapGenerator.oneBar.spikeLeftScore2(sprites, beat, gen)
			MapGenerator.oneBar.spikeRightScore2(sprites, beat + 4, gen)
			MapGenerator.oneBar.steps2(sprites, beat + 8, gen)
			MapGenerator.oneBar.spikeLeftScore2(sprites, beat + 12, gen)
			return 16
		},

		spikeScoreStepRight2: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			MapGenerator.oneBar.spikeLeftScore2(sprites, beat, gen)
			MapGenerator.oneBar.spikeRightScore2(sprites, beat + 4, gen)
			MapGenerator.oneBar.steps2(sprites, beat + 8, gen)
			MapGenerator.oneBar.spikeRightScore2(sprites, beat + 12, gen)
			return 16
		},

		spikeScoreStepInvertor2: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			MapGenerator.oneBar.spikeLeftScore2(sprites, beat, gen)
			MapGenerator.oneBar.spikeRightScore2(sprites, beat + 4, gen)
			MapGenerator.oneBar.steps2(sprites, beat + 8, gen)
			MapGenerator.oneBar.spikeGravityInvertor2(sprites, beat + 12, gen)
			return 16
		},

		cooldownSpikeLeftScore2: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			MapGenerator.oneBar.spike1(sprites, beat, gen)
			MapGenerator.oneBar.leftScore1(sprites, beat + 4, gen)
			MapGenerator.oneBar.rightScore1(sprites, beat + 8, gen)
			MapGenerator.oneBar.leftScore1(sprites, beat + 12, gen)
			return 16
		},

		cooldownSpikeRightScore2: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			MapGenerator.oneBar.spike1(sprites, beat, gen)
			MapGenerator.oneBar.rightScore1(sprites, beat + 4, gen)
			MapGenerator.oneBar.leftScore1(sprites, beat + 8, gen)
			MapGenerator.oneBar.rightScore1(sprites, beat + 12, gen)
			return 16
		},

		fakeBuildUpSpikeScore4: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			MapGenerator.oneBar.spike4(sprites, beat, gen)
			MapGenerator.oneBar.spikeScore4(sprites, beat + 4, gen)
			MapGenerator.oneBar.spikeScore4(sprites, beat + 8, gen)
			MapGenerator.oneBar.spikeScore4(sprites, beat + 12, gen)
			return 16
		},

		alternatingSpikeScore4: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			MapGenerator.oneBar.spikeScore4(sprites, beat, gen)
			MapGenerator.oneBar.spikeScore4(sprites, beat + 4, gen)
			MapGenerator.oneBar.spikeScore4(sprites, beat + 8, gen)
			MapGenerator.oneBar.spikeScore4(sprites, beat + 12, gen)
			return 16
		},

		alternatingSpikeScoreMania4: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			MapGenerator.oneBar.spike4(sprites, beat, gen)
			MapGenerator.oneBar.score4(sprites, beat + 4, gen)
			MapGenerator.oneBar.spike4(sprites, beat + 8, gen)
			MapGenerator.oneBar.score4(sprites, beat + 12, gen)
			return 16
		},

		alternatingStepScoreMania4: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			MapGenerator.oneBar.stepsScore4(sprites, beat, gen)
			MapGenerator.oneBar.score4(sprites, beat + 4, gen)
			MapGenerator.oneBar.stepsScore4(sprites, beat + 8, gen)
			MapGenerator.oneBar.score4(sprites, beat + 12, gen)
			return 16
		},

		alternatingStepScoreManiaInvertor4: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			MapGenerator.oneBar.stepsScore4(sprites, beat, gen)
			MapGenerator.oneBar.score4(sprites, beat + 4, gen)
			MapGenerator.oneBar.stepsScore4(sprites, beat + 8, gen)
			MapGenerator.oneBar.scoreInvertor4(sprites, beat + 12, gen)
			return 16
		},

		alternatingSpikeScoreScoreScore4: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			MapGenerator.oneBar.spikeScoreLeftScoreRightScoreLeft4(sprites, beat, gen)
			MapGenerator.oneBar.spikeScoreRightScoreLefScoreRight4(sprites, beat + 4, gen)
			MapGenerator.oneBar.spikeScoreLeftScoreRightScoreLeft4(sprites, beat + 8, gen)
			MapGenerator.oneBar.spikeScoreRightScoreLefScoreRight4(sprites, beat + 12, gen)
		}
	}

	static eightBar = {
		break: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			sprites.push(new Break(beat, 32))
			return 32
		},

		intro1: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			MapGenerator.fourBar.alternatingSpikeScore2(sprites, beat, gen)
			MapGenerator.fourBar.alternatingSpikeScore2(sprites, beat + 16, gen)
			return 32
		},

		intro1Invertor: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			MapGenerator.fourBar.alternatingSpikeScore2(sprites, beat, gen)
			MapGenerator.fourBar.alternatingSpikeScoreInvertor2(sprites, beat + 16, gen)
			return 32
		},

		warmup1: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			MapGenerator.fourBar.spikeScoreStepLeft2(sprites, beat, gen)
			MapGenerator.fourBar.spikeScoreStepRight2(sprites, beat + 16, gen)
			return 32
		},

		warmup1Invertor: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			MapGenerator.fourBar.spikeScoreStepLeft2(sprites, beat, gen)
			MapGenerator.fourBar.spikeScoreStepInvertor2(sprites, beat + 16, gen)
			return 32
		},

		fakeBuildup1: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			MapGenerator.fourBar.fakeBuildUpSpikeScore4(sprites, beat, gen)
			MapGenerator.fourBar.fakeBuildUpSpikeScore4(sprites, beat + 16, gen)
			return 32
		},

		buildup1: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			MapGenerator.fourBar.alternatingSpikeScore4(sprites, beat, gen)
			MapGenerator.fourBar.alternatingSpikeScore4(sprites, beat + 16, gen)
			return 32
		},

		drop1: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			MapGenerator.fourBar.alternatingSpikeScoreMania4(sprites, beat, gen)
			MapGenerator.fourBar.alternatingSpikeScoreMania4(sprites, beat + 16, gen)
			return 32
		},

		drop2: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			MapGenerator.fourBar.alternatingStepScoreMania4(sprites, beat, gen)
			MapGenerator.fourBar.alternatingStepScoreMania4(sprites, beat + 16, gen)
			return 32
		},

		drop2Invertor: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			MapGenerator.fourBar.alternatingStepScoreMania4(sprites, beat, gen)
			MapGenerator.fourBar.alternatingStepScoreManiaInvertor4(sprites, beat + 16, gen)
			return 32
		},

		drop3: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			MapGenerator.fourBar.alternatingSpikeScoreScoreScore4(sprites, beat, gen)
			MapGenerator.fourBar.alternatingSpikeScoreScoreScore4(sprites, beat + 16, gen)
			return 32
		},

		cooldown1: (sprites: Sprite[], beat: number, gen: MapGenerator) => {
			MapGenerator.fourBar.cooldownSpikeLeftScore2(sprites, beat, gen)
			MapGenerator.fourBar.cooldownSpikeRightScore2(sprites, beat + 16, gen)
			return 32
		}
	}
}