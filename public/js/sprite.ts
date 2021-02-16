abstract class Sprite {
	abstract render(game: Game): void
	abstract collision(player: Player): void
}