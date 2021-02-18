type MapTemplateGenerator = (sprites: Sprite[], beat: number) => number

class MapGenerator {
	game: Game
	beat = 0

	constructor(game: Game) {
		this.game = game
	}

	add(...templates: MapTemplateGenerator[]) {
		for (const template of templates) {
			this.beat += template(this.game.sprites, this.beat)
		}
	}

	static oneBar = {
		break() {
			return 4
		},

		spike2(sprites: Sprite[], beat: number) {
			sprites.push(new Spike(new Vector([ beat, Floor.y ]), false, '#0000ff'))
			sprites.push(new Spike(new Vector([ beat + 2, Floor.y ]), false, '#0000ff'))
			return 4
		},

		spikeLeftScore2(sprites: Sprite[], beat: number) {
			sprites.push(new Spike(new Vector([ beat, Floor.y ]), false, '#0000ff'))
			sprites.push(new ScoreBlock(new Vector([ beat + 2, Floor.y ]), true))
			return 4
		},

		score2(sprites: Sprite[], beat: number) {
			sprites.push(new ScoreBlock(new Vector([ beat, Floor.y ]), true))
			sprites.push(new ScoreBlock(new Vector([ beat + 2, Floor.y ]), false))
			return 4
		},

		spikeRightScore2(sprites: Sprite[], beat: number) {
			sprites.push(new Spike(new Vector([ beat, Floor.y ]), false, '#0000ff'))
			sprites.push(new ScoreBlock(new Vector([ beat + 2, Floor.y ]), false))
			return 4
		},

		steps2(sprites: Sprite[], beat: number) {
			sprites.push(new Platform(beat, 2, 0.1, false))
			sprites.push(new Platform(beat + 2, 1, 0.2, false))
			return 4
		},

		stepsScore4(sprites: Sprite[], beat: number) {
			sprites.push(new Platform(beat, 2, 0.1, false))
			sprites.push(new ScoreBlock(new Vector([ beat + 1, Floor.y - 0.1 ]), true))
			sprites.push(new Platform(beat + 2, 1, 0.2, false))
			sprites.push(new ScoreBlock(new Vector([ beat + 3, Floor.y - 0.2 ]), false))
			return 4
		},

		platformSpike2(sprites: Sprite[], beat: number) {
			sprites.push(new Platform(beat, 3, 0.1, false))
			sprites.push(new Spike(new Vector([ beat + 2, Floor.y - 0.1 ]), false, '#0000ff'))
			return 4
		},

		platformSpikeContinuous2(sprites: Sprite[], beat: number) {
			sprites.push(new Platform(beat, 4, 0.1, false))
			sprites.push(new Spike(new Vector([ beat + 2, Floor.y - 0.1 ]), false, '#0000ff'))
			sprites.push(new Spike(new Vector([ beat + 4, Floor.y - 0.1 ]), false, '#0000ff'))
			return 4
		},

		spike4(sprites: Sprite[], beat: number) {
			sprites.push(new Spike(new Vector([ beat, Floor.y ]), false, '#0000ff'))
			sprites.push(new Spike(new Vector([ beat + 1, Floor.y ]), false, '#ff0000'))
			sprites.push(new Spike(new Vector([ beat + 2, Floor.y ]), false, '#0000ff'))
			sprites.push(new Spike(new Vector([ beat + 3, Floor.y ]), false, '#ff0000'))
			return 4
		},

		spikeScore4(sprites: Sprite[], beat: number) {
			sprites.push(new Spike(new Vector([ beat, Floor.y ]), false, '#0000ff'))
			sprites.push(new ScoreBlock(new Vector([ beat + 1, Floor.y ]), true))
			sprites.push(new Spike(new Vector([ beat + 2, Floor.y ]), false, '#0000ff'))
			sprites.push(new ScoreBlock(new Vector([ beat + 3, Floor.y ]), false))
			return 4
		},

		score4(sprites: Sprite[], beat: number) {
			sprites.push(new ScoreBlock(new Vector([ beat, Floor.y ]), true))
			sprites.push(new ScoreBlock(new Vector([ beat + 1, Floor.y ]), false))
			sprites.push(new ScoreBlock(new Vector([ beat + 2, Floor.y ]), true))
			sprites.push(new ScoreBlock(new Vector([ beat + 3, Floor.y ]), false))
			return 4
		}
	}

	static fourBar = {
		break() {
			return 16
		},

		alternatingSpikeScore2(sprites: Sprite[], beat: number) {
			MapGenerator.oneBar.spikeLeftScore2(sprites, beat)
			MapGenerator.oneBar.spikeRightScore2(sprites, beat + 4)
			MapGenerator.oneBar.spikeLeftScore2(sprites, beat + 8)
			MapGenerator.oneBar.spikeRightScore2(sprites, beat + 12)
			return 16
		},

		spikeScoreStepLeft2(sprites: Sprite[], beat: number) {
			MapGenerator.oneBar.spikeLeftScore2(sprites, beat)
			MapGenerator.oneBar.spikeRightScore2(sprites, beat + 4)
			MapGenerator.oneBar.steps2(sprites, beat + 8)
			MapGenerator.oneBar.spikeLeftScore2(sprites, beat + 12)
			return 16
		},

		spikeScoreStepRight2(sprites: Sprite[], beat: number) {
			MapGenerator.oneBar.spikeLeftScore2(sprites, beat)
			MapGenerator.oneBar.spikeRightScore2(sprites, beat + 4)
			MapGenerator.oneBar.steps2(sprites, beat + 8)
			MapGenerator.oneBar.spikeRightScore2(sprites, beat + 12)
			return 16
		},

		fakeBuildUpSpikeScore4(sprites: Sprite[], beat: number) {
			MapGenerator.oneBar.spike4(sprites, beat)
			MapGenerator.oneBar.spikeScore4(sprites, beat + 4)
			MapGenerator.oneBar.spikeScore4(sprites, beat + 8)
			MapGenerator.oneBar.spikeScore4(sprites, beat + 12)
			return 16
		},

		alternatingSpikeScore4(sprites: Sprite[], beat: number) {
			MapGenerator.oneBar.spikeScore4(sprites, beat)
			MapGenerator.oneBar.spikeScore4(sprites, beat + 4)
			MapGenerator.oneBar.spikeScore4(sprites, beat + 8)
			MapGenerator.oneBar.spikeScore4(sprites, beat + 12)
			return 16
		},

		alternatingSpikeScoreMania4(sprites: Sprite[], beat: number) {
			MapGenerator.oneBar.spike4(sprites, beat)
			MapGenerator.oneBar.score4(sprites, beat + 4)
			MapGenerator.oneBar.spike4(sprites, beat + 8)
			MapGenerator.oneBar.score4(sprites, beat + 12)
			return 16
		},

		alternatingStepScoreMania4(sprites: Sprite[], beat: number) {
			MapGenerator.oneBar.stepsScore4(sprites, beat)
			MapGenerator.oneBar.score4(sprites, beat + 4)
			MapGenerator.oneBar.stepsScore4(sprites, beat + 8)
			MapGenerator.oneBar.score4(sprites, beat + 12)
			return 16
		}
	}

	static eightBar = {
		break() {
			return 32
		},

		intro1(sprites: Sprite[], beat: number) {
			MapGenerator.fourBar.alternatingSpikeScore2(sprites, beat)
			MapGenerator.fourBar.alternatingSpikeScore2(sprites, beat + 16)
			return 32
		},

		warmup1(sprites: Sprite[], beat: number) {
			MapGenerator.fourBar.spikeScoreStepLeft2(sprites, beat)
			MapGenerator.fourBar.spikeScoreStepRight2(sprites, beat + 16)
			return 32
		},

		fakeBuildup1(sprites: Sprite[], beat: number) {
			MapGenerator.fourBar.fakeBuildUpSpikeScore4(sprites, beat)
			MapGenerator.fourBar.fakeBuildUpSpikeScore4(sprites, beat + 16)
			return 32
		},

		buildup1(sprites: Sprite[], beat: number) {
			MapGenerator.fourBar.alternatingSpikeScore4(sprites, beat)
			MapGenerator.fourBar.alternatingSpikeScore4(sprites, beat + 16)
			return 32
		},

		drop1(sprites: Sprite[], beat: number) {
			MapGenerator.fourBar.alternatingSpikeScoreMania4(sprites, beat)
			MapGenerator.fourBar.alternatingSpikeScoreMania4(sprites, beat + 16)
			return 32
		},

		drop2(sprites: Sprite[], beat: number) {
			MapGenerator.fourBar.alternatingStepScoreMania4(sprites, beat)
			MapGenerator.fourBar.alternatingStepScoreMania4(sprites, beat + 16)
			return 32
		},
	}
}