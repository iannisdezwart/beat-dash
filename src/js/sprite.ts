abstract class Sprite {
	abstract render(game: Game, dt: number): void
	abstract collision(player: Player): void
}