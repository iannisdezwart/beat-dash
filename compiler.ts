import { compilePages, importGoogleFont, includeResource, inlineCSS, inlineJS } from 'page-compiler'

export const compile = async () => {
	includeResource('src/songs')

	compilePages([
		{
			html: /* html */ `
			<!DOCTYPE html>
			<html lang="en" dir="ltr">
				<head>
					<meta charset="utf-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>BeatDash</title>

					${ await importGoogleFont('Poppins', [
						{ weight: 200, italic: false },
						{ weight: 400, italic: false },
						{ weight: 600, italic: false },
					]) }

					${ await importGoogleFont('Source Code Pro', [
						{ weight: 600, italic: false }
					]) }

					${ inlineCSS('src/css/index.css') }
				</head>
				<body>
					<canvas id="beat-visualiser"></canvas>
					<canvas id="audio-visualiser"></canvas>
					<canvas id="game"></canvas>

					<div id="fps-counter"></div>
					<div id="score-counter"></div>

					<div id="song-details">
						<h1 id="song-title"></h1>
						<div id="song-time"></div>
					</div>

					<div id="break" class="invisible">
						<div id="break-seconds"></div>

						<div id="break-progress-container">
							<div id="break-progress"></div>
						</div>
					</div>

					<div id="song-progress-container">
						<div id="song-progress"></div>
					</div>

					<div id="menu-container">
						<div id="menu">
							<h1>BeatDash</h1>

							<div id="level-selection"></div>

							<div id="pause-menu" class="hidden">
								<button id="play-button" tabindex="0" onclick="level.start()">Play</button>

								<div class="settings">
									<h2>Settings</h2>

									<div class="slider">
										<div class="label">Volume</div>
										<input type="range" id="volume-slider" tabindex="0" min="0" max="100" value="100">
										<div class="label" id="volume-slider-value">100%</div>
									</div>

									<div class="toggle">
										<div class="label">Beat visualiser</div>
										<input type="checkbox" id="beat-visualiser-toggle" tabindex="0">
									</div>

									<div class="toggle">
										<div class="label">Audio visualiser</div>
										<input type="checkbox" id="audio-visualiser-toggle" tabindex="0">
									</div>

									<div class="toggle">
										<div class="label">Debug</div>
										<input type="checkbox" id="debug-toggle" tabindex="0">
									</div>
								</div>

								<div class="buttons">
									<button class="small inline" onclick="level.reload()">Retry</button>
									<button class="small inline" onclick="showMainMenu()">Main Menu</button>
								</div>

								<h2>How to play</h2>

								<div class="centered">
									Press space to jump to avoid obstacles
									<br>
									Press F and J to pop left and right score blocks
								</div>

								<div class="centered touch">
									On touch screens, press the middle of the screen to jump.
									<br>
									Hold the left and right of the screen to pop score blocks.
								</div>
							</div>
						</div>
					</div>

					<div id="ending-screen" class="invisible">
						<h1 id="song-name"></h1>

						<div class="stats">
							<table>
								<tbody>
									<tr>
										<td>Final score</td>
										<td class="right" id="final-score"></td>
									</tr>
									<tr>
										<td>Score blocks gathered</td>
										<td class="right" id="score-blocks-gathered"></td>
									</tr>
									<tr>
										<td>Jump pads popped</td>
										<td class="right" id="jump-pads-popped"></td>
									</tr>
									<tr>
										<td>Score trail distance slided</td>
										<td class="right" id="score-trail-distance-slided"></td>
									</tr>
									<tr>
										<td>Spikes hit</td>
										<td class="right" id="spikes-hit"></td>
									</tr>
									<tr>
										<td>Platforms missed</td>
										<td class="right" id="platforms-missed"></td>
									</tr>
								</tbody>
							</table>
						</div>

						<div class="buttons">
							<button class="small inline" onclick="level.reload()">Retry</button>
							<button class="small inline" onclick="showMainMenu()">Main Menu</button>
						</div>
					</div>

					<div id="loading-screen" class="invisible">
						<h1>Loading</h1>
						<div id="loading-screen-percentage">0.0%</div>
					</div>

					<div id="left-touch-indicator" class="touch"></div>
					<div id="right-touch-indicator" class="touch"></div>
					<div id="left-touch-divider" class="touch"></div>
					<div id="right-touch-divider" class="touch"></div>

					<button class="small hidden" id="pause-button" onclick="level.game.togglePause()">Pause</button>

					${ inlineJS('src/js/database.js') }
					${ inlineJS('src/js/vector.js') }
					${ inlineJS('src/js/sprite.js') }
					${ inlineJS('src/js/keyboard.js') }
					${ inlineJS('src/js/touch-screen.js') }
					${ inlineJS('src/js/keys.js') }
					${ inlineJS('src/js/game.js') }
					${ inlineJS('src/js/sound.js') }
					${ inlineJS('src/js/beat-visualiser.js') }
					${ inlineJS('src/js/audio-visualiser.js') }
					${ inlineJS('src/js/sprites/player.js') }
					${ inlineJS('src/js/sprites/platform.js') }
					${ inlineJS('src/js/sprites/spike.js') }
					${ inlineJS('src/js/sprites/floor.js') }
					${ inlineJS('src/js/sprites/ceiling.js') }
					${ inlineJS('src/js/sprites/score-block.js') }
					${ inlineJS('src/js/sprites/score-trail.js') }
					${ inlineJS('src/js/sprites/gravity-invertor.js') }
					${ inlineJS('src/js/sprites/break.js') }
					${ inlineJS('src/js/sprites/jump-pad.js') }
					${ inlineJS('src/js/map-generator.js') }
					${ inlineJS('src/js/level.js') }
					${ inlineJS('src/js/level-list.js') }
					${ inlineJS('src/js/levels/nostalgia.js') }
					${ inlineJS('src/js/levels/love-at-heart.js') }
					${ inlineJS('src/js/levels/sun-models.js') }
					${ inlineJS('src/js/levels/shark.js') }
					${ inlineJS('src/js/levels/crave-you.js') }
					${ inlineJS('src/js/levels/fire.js') }
					${ inlineJS('src/js/index.js') }
				</body>
			</html>
			`,
			path: '/index.html'
		}
	])
}