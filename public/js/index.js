var game = new Game('#game');
game.addPlayer(new Player());
game.sprites.push(new Ground());
game.sprites.push(new Platform(1000, 600, 80));
game.start();
