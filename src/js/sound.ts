interface HTMLAudioElement {
	captureStream(): MediaStream
	mozCaptureStream(): MediaStream
}

if (HTMLAudioElement.prototype.captureStream == null) {
	HTMLAudioElement.prototype.captureStream = HTMLAudioElement.prototype.mozCaptureStream
}

class Sound {
	audio: HTMLAudioElement
	audioContext: AudioContext
	audioStream: MediaStream
	audioSource: MediaStreamAudioSourceNode
	analyser: AnalyserNode

	constructor() {
		this.audio = document.createElement('audio')
		this.audio.pause()
	}

	async load(fileURL: string) {
		this.audio.src = fileURL
		await this.waitUntilLoaded()
	}

	waitUntilLoaded() {
		return new Promise<void>(resolve => {
			if (this.audio.duration > 0) {
				resolve()
				return
			}

			this.audio.addEventListener('canplay', () => resolve())
		})
	}

	play()  {
		this.audio.play()
		if (this.analyser == null) this.setupAnalyser()
	}

	pause() {
		this.audio.pause()
	}

	stop() {
		this.pause()
		this.seek(0)
	}

	duration() {
		return this.audio.duration
	}

	time() {
		return this.audio.currentTime
	}

	seek(seconds: number) {
		this.audio.currentTime = seconds
	}

	getVolume() {
		return this.audio.volume
	}

	setVolume(newVolume: number) {
		this.audio.volume = newVolume
	}

	isPlaying() {
		return !this.audio.paused
	}

	ended() {
		return this.audio.ended
	}

	setupAnalyser() {
		this.audioStream = this.audio.captureStream()
		this.audioContext = new AudioContext()
		this.audioSource = this.audioContext.createMediaStreamSource(this.audioStream)
		this.analyser = this.audioContext.createAnalyser()
		this.analyser.fftSize = AudioVisualiser.fftSize
		this.analyser.maxDecibels = AudioVisualiser.maxDecibels
		this.analyser.minDecibels = AudioVisualiser.minDecibels
		this.audioSource.connect(this.analyser)
	}

	getFrequencyArray(lowerFreq = 20, upperFreq = 2000) {
		const maxFreq = this.audioContext.sampleRate / 2
		const frequencyBinCount = this.analyser.frequencyBinCount
		const minFreqBinCount = Math.floor(lowerFreq / maxFreq * frequencyBinCount)
		const maxFreqBinCount = Math.floor(upperFreq / maxFreq * frequencyBinCount)
		const array = new Uint8Array(maxFreqBinCount)
		this.analyser.getByteFrequencyData(array)
		return array.subarray(minFreqBinCount, maxFreqBinCount)
	}

	static getFile(fileName: string, progressCallback: (ratio: number) => void) {
		return new Promise<string>((resolve, reject) => {
			const req = new XMLHttpRequest()
			req.responseType = 'blob'
			req.open('GET', fileName)

			req.addEventListener('load', () => {
				resolve(URL.createObjectURL(req.response))
			})

			req.addEventListener('progress', e => {
				const loaded = e.loaded
				const total = parseInt(req.getResponseHeader('File-Size'), 10)
				progressCallback(loaded / total)
			})
			req.addEventListener('error', reject)

			req.send()
		})
	}
}