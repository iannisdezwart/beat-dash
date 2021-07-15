class Sound {
	audioContext: AudioContext
	bufferSource: AudioBufferSourceNode
	gainNode: GainNode
	analyser: AnalyserNode

	constructAudioContext() {
		this.audioContext = new AudioContext()
		this.audioContext.suspend()
		this.gainNode = this.audioContext.createGain()
		this.gainNode.connect(this.audioContext.destination)
	}

	async load(fileURL: string, progressCallback: (ratio: number) => void) {
		return new Promise<void>((resolve, reject) => {
			const req = new XMLHttpRequest()
			req.responseType = 'arraybuffer'
			req.open('GET', fileURL)

			req.addEventListener('load', () => {
				this.constructAudioContext()

				this.audioContext.decodeAudioData(req.response)
					.then(buf => {
						this.bufferSource = this.audioContext.createBufferSource()
						this.bufferSource.buffer = buf
						this.bufferSource.connect(this.gainNode)
						resolve()
					})
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

	start() {
		this.bufferSource.start(0)
		this.setupAnalyser()
	}

	play()  {
		this.audioContext.resume()
	}

	pause() {
		this.audioContext.suspend()
	}

	stop() {
		if (this.bufferSource) {
			this.bufferSource.disconnect()
			this.bufferSource.stop(0)
		}
	}

	duration() {
		return this.bufferSource.buffer.duration
	}

	time() {
		return this.audioContext.currentTime
	}

	seek(seconds: number) {
		this.bufferSource.start(0, seconds)
	}

	getVolume() {
		return this.gainNode.gain.value
	}

	setVolume(newVolume: number) {
		this.gainNode.gain.value = newVolume
	}

	isPlaying() {
		return this.audioContext.state == 'running'
	}

	ended() {
		return this.audioContext.state == 'closed'
	}

	setupAnalyser() {
		this.analyser = this.audioContext.createAnalyser()
		this.analyser.fftSize = AudioVisualiser.fftSize
		this.analyser.maxDecibels = AudioVisualiser.maxDecibels
		this.analyser.minDecibels = AudioVisualiser.minDecibels
		this.bufferSource.connect(this.analyser)
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

	getFile(fileName: string, progressCallback: (ratio: number) => void) {
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