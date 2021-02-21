type MapTemplateGenerator = (sprites: Sprite[], beat: number) => number

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
			return Floor.y - yOffset
		}

		// If gravity is inverted

		else {
			return Ceiling.y + yOffset
		}
	}

	add(...templates: MapTemplateGenerator[]) {
		for (const template of templates) {
			this.beat += template(this.game.sprites, this.beat)
		}
	}

	special = {
		gravityInvertor: (sprites: Sprite[], beat: number) => {
			sprites.push(new GravityInvertor(beat))
			this.gravNormal = this.gravNormal ? false : true
			return 0
		}
	}

	oneBar = {
		break: (sprites: Sprite[], beat: number) => {
			sprites.push(new Break(beat, 4))
			return 4
		},

		spike1: (sprites: Sprite[], beat: number) => {
			sprites.push(new Spike(new Vector([ beat, this.calcY(0) ]), this.gravInverted, '#0000ff'))
			return 4
		},

		leftScore1: (sprites: Sprite[], beat: number) => {
			sprites.push(new ScoreBlock(new Vector([ beat, this.calcY(0)]), this.gravInverted, true))
			return 4
		},

		rightScore1: (sprites: Sprite[], beat: number) => {
			sprites.push(new ScoreBlock(new Vector([ beat, this.calcY(0)]), this.gravInverted, false))
			return 4
		},

		spike2: (sprites: Sprite[], beat: number) => {
			sprites.push(new Spike(new Vector([ beat, this.calcY(0) ]), this.gravInverted, '#0000ff'))
			sprites.push(new Spike(new Vector([ beat + 2, this.calcY(0) ]), this.gravInverted, '#0000ff'))
			return 4
		},

		score2: (sprites: Sprite[], beat: number) => {
			sprites.push(new ScoreBlock(new Vector([ beat, this.calcY(0) ]), this.gravInverted, true))
			sprites.push(new ScoreBlock(new Vector([ beat + 2, this.calcY(0) ]), this.gravInverted, false))
			return 4
		},

		spikeLeftScore2: (sprites: Sprite[], beat: number) => {
			sprites.push(new Spike(new Vector([ beat, this.calcY(0) ]), this.gravInverted, '#0000ff'))
			sprites.push(new ScoreBlock(new Vector([ beat + 2, this.calcY(0)]), this.gravInverted, true))
			return 4
		},

		spikeRightScore2: (sprites: Sprite[], beat: number) => {
			sprites.push(new Spike(new Vector([ beat, this.calcY(0) ]), this.gravInverted, '#0000ff'))
			sprites.push(new ScoreBlock(new Vector([ beat + 2, this.calcY(0)]), this.gravInverted, false))
			return 4
		},

		spikeGravityInvertor2: (sprites: Sprite[], beat: number) => {
			sprites.push(new Spike(new Vector([ beat, this.calcY(0) ]), this.gravInverted, '#0000ff'))
			this.special.gravityInvertor(sprites, beat + 2)
			return 4
		},

		steps2: (sprites: Sprite[], beat: number) =>{
			sprites.push(new Platform(beat, 2, 0.1, this.gravInverted))
			sprites.push(new Platform(beat + 2, 1, 0.2, this.gravInverted))
			return 4
		},

		stepsScore4: (sprites: Sprite[], beat: number) => {
			sprites.push(new Platform(beat, 2, 0.1, this.gravInverted))
			sprites.push(new ScoreBlock(new Vector([ beat + 1, this.calcY(0.1) ]), this.gravInverted, true))
			sprites.push(new Platform(beat + 2, 1, 0.2, this.gravInverted))
			sprites.push(new ScoreBlock(new Vector([ beat + 3, this.calcY(0.2) ]), this.gravInverted, false))
			return 4
		},

		platformSpike2: (sprites: Sprite[], beat: number) => {
			sprites.push(new Platform(beat, 3, 0.1, this.gravInverted))
			sprites.push(new Spike(new Vector([ beat + 2, this.calcY(0.1) ]), this.gravInverted, '#0000ff'))
			return 4
		},

		platformSpikeContinuous2: (sprites: Sprite[], beat: number) => {
			sprites.push(new Platform(beat, 4, 0.1, this.gravInverted))
			sprites.push(new Spike(new Vector([ beat + 2, this.calcY(0.1) ]), this.gravInverted, '#0000ff'))
			sprites.push(new Spike(new Vector([ beat + 4, this.calcY(0.1) ]), this.gravInverted, '#0000ff'))
			return 4
		},

		spike4: (sprites: Sprite[], beat: number) => {
			sprites.push(new Spike(new Vector([ beat, this.calcY(0) ]), this.gravInverted, '#0000ff'))
			sprites.push(new Spike(new Vector([ beat + 1, this.calcY(0) ]), this.gravInverted, '#ff0000'))
			sprites.push(new Spike(new Vector([ beat + 2, this.calcY(0) ]), this.gravInverted, '#0000ff'))
			sprites.push(new Spike(new Vector([ beat + 3, this.calcY(0) ]), this.gravInverted, '#ff0000'))
			return 4
		},

		spikeScore4: (sprites: Sprite[], beat: number) => {
			sprites.push(new Spike(new Vector([ beat, this.calcY(0) ]), this.gravInverted, '#0000ff'))
			sprites.push(new ScoreBlock(new Vector([ beat + 1, this.calcY(0) ]), this.gravInverted, true))
			sprites.push(new Spike(new Vector([ beat + 2, this.calcY(0) ]), this.gravInverted, '#0000ff'))
			sprites.push(new ScoreBlock(new Vector([ beat + 3, this.calcY(0) ]), this.gravInverted, false))
			return 4
		},

		spikeScoreLeftScoreRightScoreLeft4: (sprites: Sprite[], beat: number) => {
			sprites.push(new Spike(new Vector([ beat, this.calcY(0) ]), this.gravInverted, '#0000ff'))
			sprites.push(new ScoreBlock(new Vector([ beat + 1, this.calcY(0) ]), this.gravInverted, true))
			sprites.push(new ScoreBlock(new Vector([ beat + 2, this.calcY(0) ]), this.gravInverted, false))
			sprites.push(new ScoreBlock(new Vector([ beat + 3, this.calcY(0) ]), this.gravInverted, true))
			return 4
		},

		spikeScoreRightScoreLefScoreRight4: (sprites: Sprite[], beat: number) => {
			sprites.push(new Spike(new Vector([ beat, this.calcY(0) ]), this.gravInverted, '#0000ff'))
			sprites.push(new ScoreBlock(new Vector([ beat + 1, this.calcY(0) ]), this.gravInverted, false))
			sprites.push(new ScoreBlock(new Vector([ beat + 2, this.calcY(0) ]), this.gravInverted, true))
			sprites.push(new ScoreBlock(new Vector([ beat + 3, this.calcY(0) ]), this.gravInverted, false))
			return 4
		},

		score4: (sprites: Sprite[], beat: number) => {
			sprites.push(new ScoreBlock(new Vector([ beat, this.calcY(0) ]), this.gravInverted, true))
			sprites.push(new ScoreBlock(new Vector([ beat + 1, this.calcY(0) ]), this.gravInverted, false))
			sprites.push(new ScoreBlock(new Vector([ beat + 2, this.calcY(0)]), this.gravInverted, true))
			sprites.push(new ScoreBlock(new Vector([ beat + 3, this.calcY(0) ]), this.gravInverted, false))
			return 4
		},

		scoreInvertor4: (sprites: Sprite[], beat: number) => {
			sprites.push(new ScoreBlock(new Vector([ beat, this.calcY(0) ]), this.gravInverted, true))
			sprites.push(new ScoreBlock(new Vector([ beat + 1, this.calcY(0) ]), this.gravInverted, false))
			sprites.push(new ScoreBlock(new Vector([ beat + 2, this.calcY(0)]), this.gravInverted, true))
			this.special.gravityInvertor(sprites, beat + 3)
			return 4
		}
	}

	twoBar = {
		break: (sprites: Sprite[], beat: number) => {
			sprites.push(new Break(beat, 8))
			return 8
		}
	}

	fourBar = {
		break: (sprites: Sprite[], beat: number) => {
			sprites.push(new Break(beat, 16))
			return 16
		},

		alternatingSpikeScore2: (sprites: Sprite[], beat: number) => {
			this.oneBar.spikeLeftScore2(sprites, beat)
			this.oneBar.spikeRightScore2(sprites, beat + 4)
			this.oneBar.spikeLeftScore2(sprites, beat + 8)
			this.oneBar.spikeRightScore2(sprites, beat + 12)
			return 16
		},

		alternatingSpikeScoreInvertor2: (sprites: Sprite[], beat: number) => {
			this.oneBar.spikeLeftScore2(sprites, beat)
			this.oneBar.spikeRightScore2(sprites, beat + 4)
			this.oneBar.spikeLeftScore2(sprites, beat + 8)
			this.oneBar.spikeGravityInvertor2(sprites, beat + 12)
			return 16
		},

		spikeScoreStepLeft2: (sprites: Sprite[], beat: number) => {
			this.oneBar.spikeLeftScore2(sprites, beat)
			this.oneBar.spikeRightScore2(sprites, beat + 4)
			this.oneBar.steps2(sprites, beat + 8)
			this.oneBar.spikeLeftScore2(sprites, beat + 12)
			return 16
		},

		spikeScoreStepRight2: (sprites: Sprite[], beat: number) => {
			this.oneBar.spikeLeftScore2(sprites, beat)
			this.oneBar.spikeRightScore2(sprites, beat + 4)
			this.oneBar.steps2(sprites, beat + 8)
			this.oneBar.spikeRightScore2(sprites, beat + 12)
			return 16
		},

		spikeScoreStepInvertor2: (sprites: Sprite[], beat: number) => {
			this.oneBar.spikeLeftScore2(sprites, beat)
			this.oneBar.spikeRightScore2(sprites, beat + 4)
			this.oneBar.steps2(sprites, beat + 8)
			this.oneBar.spikeGravityInvertor2(sprites, beat + 12)
			return 16
		},

		cooldownSpikeLeftScore2: (sprites: Sprite[], beat: number) => {
			this.oneBar.spike1(sprites, beat)
			this.oneBar.leftScore1(sprites, beat + 4)
			this.oneBar.rightScore1(sprites, beat + 8)
			this.oneBar.leftScore1(sprites, beat + 12)
			return 16
		},

		cooldownSpikeRightScore2: (sprites: Sprite[], beat: number) => {
			this.oneBar.spike1(sprites, beat)
			this.oneBar.rightScore1(sprites, beat + 4)
			this.oneBar.leftScore1(sprites, beat + 8)
			this.oneBar.rightScore1(sprites, beat + 12)
			return 16
		},

		fakeBuildUpSpikeScore4: (sprites: Sprite[], beat: number) => {
			this.oneBar.spike4(sprites, beat)
			this.oneBar.spikeScore4(sprites, beat + 4)
			this.oneBar.spikeScore4(sprites, beat + 8)
			this.oneBar.spikeScore4(sprites, beat + 12)
			return 16
		},

		alternatingSpikeScore4: (sprites: Sprite[], beat: number) => {
			this.oneBar.spikeScore4(sprites, beat)
			this.oneBar.spikeScore4(sprites, beat + 4)
			this.oneBar.spikeScore4(sprites, beat + 8)
			this.oneBar.spikeScore4(sprites, beat + 12)
			return 16
		},

		alternatingSpikeScoreMania4: (sprites: Sprite[], beat: number) => {
			this.oneBar.spike4(sprites, beat)
			this.oneBar.score4(sprites, beat + 4)
			this.oneBar.spike4(sprites, beat + 8)
			this.oneBar.score4(sprites, beat + 12)
			return 16
		},

		alternatingStepScoreMania4: (sprites: Sprite[], beat: number) => {
			this.oneBar.stepsScore4(sprites, beat)
			this.oneBar.score4(sprites, beat + 4)
			this.oneBar.stepsScore4(sprites, beat + 8)
			this.oneBar.score4(sprites, beat + 12)
			return 16
		},

		alternatingStepScoreManiaInvertor4: (sprites: Sprite[], beat: number) => {
			this.oneBar.stepsScore4(sprites, beat)
			this.oneBar.score4(sprites, beat + 4)
			this.oneBar.stepsScore4(sprites, beat + 8)
			this.oneBar.scoreInvertor4(sprites, beat + 12)
			return 16
		},

		alternatingSpikeScoreScoreScore4: (sprites: Sprite[], beat: number) => {
			this.oneBar.spikeScoreLeftScoreRightScoreLeft4(sprites, beat)
			this.oneBar.spikeScoreRightScoreLefScoreRight4(sprites, beat + 4)
			this.oneBar.spikeScoreLeftScoreRightScoreLeft4(sprites, beat + 8)
			this.oneBar.spikeScoreRightScoreLefScoreRight4(sprites, beat + 12)
		}
	}

	eightBar = {
		break: (sprites: Sprite[], beat: number) => {
			sprites.push(new Break(beat, 32))
			return 32
		},

		intro1: (sprites: Sprite[], beat: number) => {
			this.fourBar.alternatingSpikeScore2(sprites, beat)
			this.fourBar.alternatingSpikeScore2(sprites, beat + 16)
			return 32
		},

		intro1Invertor: (sprites: Sprite[], beat: number) => {
			this.fourBar.alternatingSpikeScore2(sprites, beat)
			this.fourBar.alternatingSpikeScoreInvertor2(sprites, beat + 16)
			return 32
		},

		warmup1: (sprites: Sprite[], beat: number) => {
			this.fourBar.spikeScoreStepLeft2(sprites, beat)
			this.fourBar.spikeScoreStepRight2(sprites, beat + 16)
			return 32
		},

		warmup1Invertor: (sprites: Sprite[], beat: number) => {
			this.fourBar.spikeScoreStepLeft2(sprites, beat)
			this.fourBar.spikeScoreStepInvertor2(sprites, beat + 16)
			return 32
		},

		fakeBuildup1: (sprites: Sprite[], beat: number) => {
			this.fourBar.fakeBuildUpSpikeScore4(sprites, beat)
			this.fourBar.fakeBuildUpSpikeScore4(sprites, beat + 16)
			return 32
		},

		buildup1: (sprites: Sprite[], beat: number) => {
			this.fourBar.alternatingSpikeScore4(sprites, beat)
			this.fourBar.alternatingSpikeScore4(sprites, beat + 16)
			return 32
		},

		drop1: (sprites: Sprite[], beat: number) => {
			this.fourBar.alternatingSpikeScoreMania4(sprites, beat)
			this.fourBar.alternatingSpikeScoreMania4(sprites, beat + 16)
			return 32
		},

		drop2: (sprites: Sprite[], beat: number) => {
			this.fourBar.alternatingStepScoreMania4(sprites, beat)
			this.fourBar.alternatingStepScoreMania4(sprites, beat + 16)
			return 32
		},

		drop2Invertor: (sprites: Sprite[], beat: number) => {
			this.fourBar.alternatingStepScoreMania4(sprites, beat)
			this.fourBar.alternatingStepScoreManiaInvertor4(sprites, beat + 16)
			return 32
		},

		drop3: (sprites: Sprite[], beat: number) => {
			this.fourBar.alternatingSpikeScoreScoreScore4(sprites, beat)
			this.fourBar.alternatingSpikeScoreScoreScore4(sprites, beat + 16)
			return 32
		},

		cooldown1: (sprites: Sprite[], beat: number) => {
			this.fourBar.cooldownSpikeLeftScore2(sprites, beat)
			this.fourBar.cooldownSpikeRightScore2(sprites, beat + 16)
			return 32
		}
	}
}