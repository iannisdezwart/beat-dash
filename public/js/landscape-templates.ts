const landscapeTemplates = {
	spike2(game: Game, start: number) {
		game.sprites.push(new Spike(new Vector([ start, Floor.y ]), false, '#0000ff'))
		game.sprites.push(new Spike(new Vector([ start + 2, Floor.y ]), false, '#0000ff'))
	},

	spikeLeftScore2(game: Game, start: number) {
		game.sprites.push(new Spike(new Vector([ start, Floor.y ]), false, '#0000ff'))
		game.sprites.push(new ScoreBlock(new Vector([ start + 2, Floor.y ]), true))
	},

	score2(game: Game, start: number) {
		game.sprites.push(new ScoreBlock(new Vector([ start, Floor.y ]), true))
		game.sprites.push(new ScoreBlock(new Vector([ start + 2, Floor.y ]), false))
	},

	spikeRightScore2(game: Game, start: number) {
		game.sprites.push(new Spike(new Vector([ start, Floor.y ]), false, '#0000ff'))
		game.sprites.push(new ScoreBlock(new Vector([ start + 2, Floor.y ]), false))
	},

	steps2(game: Game, start: number) {
		game.sprites.push(new Platform(start, 2, 0.1, false))
		game.sprites.push(new Platform(start + 2, 2, 0.2, false))
	},

	stepsScore4(game: Game, start: number) {
		game.sprites.push(new Platform(start, 2, 0.1, false))
		game.sprites.push(new ScoreBlock(new Vector([ start + 1, Floor.y - 0.1 ]), true))
		game.sprites.push(new Platform(start + 2, 2, 0.2, false))
		game.sprites.push(new ScoreBlock(new Vector([ start + 3, Floor.y - 0.2 ]), false))
	},

	platformSpike2(game: Game, start: number) {
		game.sprites.push(new Platform(start, 4, 0.1, false))
		game.sprites.push(new Spike(new Vector([ start + 2, Floor.y - 0.1 ]), false, '#0000ff'))
	},

	platformSpikeContinuous2(game: Game, start: number) {
		game.sprites.push(new Platform(start, 4, 0.1, false))
		game.sprites.push(new Spike(new Vector([ start + 2, Floor.y - 0.1 ]), false, '#0000ff'))
		game.sprites.push(new Spike(new Vector([ start + 4, Floor.y - 0.1 ]), false, '#0000ff'))
	},

	spike4(game: Game, start: number) {
		game.sprites.push(new Spike(new Vector([ start, Floor.y ]), false, '#0000ff'))
		game.sprites.push(new Spike(new Vector([ start + 1, Floor.y ]), false, '#ff0000'))
		game.sprites.push(new Spike(new Vector([ start + 2, Floor.y ]), false, '#0000ff'))
		game.sprites.push(new Spike(new Vector([ start + 3, Floor.y ]), false, '#ff0000'))
	},

	spikeScore4(game: Game, start: number) {
		game.sprites.push(new Spike(new Vector([ start, Floor.y ]), false, '#0000ff'))
		game.sprites.push(new ScoreBlock(new Vector([ start + 1, Floor.y ]), true))
		game.sprites.push(new Spike(new Vector([ start + 2, Floor.y ]), false, '#0000ff'))
		game.sprites.push(new ScoreBlock(new Vector([ start + 3, Floor.y ]), false))
	},

	score4(game: Game, start: number) {
		game.sprites.push(new ScoreBlock(new Vector([ start, Floor.y ]), true))
		game.sprites.push(new ScoreBlock(new Vector([ start + 1, Floor.y ]), false))
		game.sprites.push(new ScoreBlock(new Vector([ start + 2, Floor.y ]), true))
		game.sprites.push(new ScoreBlock(new Vector([ start + 3, Floor.y ]), false))
	}
}