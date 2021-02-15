class Sound {
	audio: HTMLAudioElement

	load(fileURL: string) {
		this.audio = document.createElement('audio')
		this.audio.pause()
		this.audio.src = fileURL
	}

	destruct() {
		this.audio.remove()
	}

	waitUntilLoaded() {
		return new Promise<void>(resolve => {
			if (this.audio.duration > 0) {
				resolve()
				return
			}

			this.audio.oncanplay = () => resolve()
		})
	}

	play()  { this.audio.play() }
	pause() { this.audio.pause() }
	stop()  { this.pause(), this.seek(0) }

	duration()            { return this.audio.duration }
	time()                { return this.audio.currentTime }
	seek(seconds: number) { this.audio.currentTime = seconds }

	getVolume()                  { return this.audio.volume }
	setVolume(newVolume: number) { this.audio.volume = newVolume }

	isPlaying() { return !this.audio.paused }

	static getFile(fileName: string, progressCallback: (e: ProgressEvent) => void) {
		return new Promise<string>((resolve, reject) => {
			const req = new XMLHttpRequest()
			req.responseType = 'blob'
			req.open('GET', fileName)

			req.addEventListener('load', () => {
				resolve(URL.createObjectURL(req.response))
			})

			req.addEventListener('progress', progressCallback)
			req.addEventListener('error', reject)

			req.send()
		})
	}
}