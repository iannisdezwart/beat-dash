const database = {
	get storedVolume() {
		return parseFloat(localStorage.getItem('volume'))
	},

	set storedVolume(newVolume: number) {
		localStorage.setItem('volume', newVolume.toString())
		volumeInput.value = (newVolume * 100).toString()
		volumeInputLabel.innerText = volumeInput.value + '%'
		level.song.setVolume(newVolume)
	},

	get audioVisualiserEnabled() {
		const enabled = localStorage.getItem('audio-visualiser')
		if (enabled == null) return null
		return enabled == 'true'
	},

	set audioVisualiserEnabled(enabled: boolean) {
		localStorage.setItem('audio-visualiser', enabled ? 'true' : 'false')
		audioVisualiserInput.checked = enabled
	},

	get beatVisualiserEnabled() {
		const enabled = localStorage.getItem('beat-visualiser')
		if (enabled == null) return null
		return enabled == 'true'
	},

	set beatVisualiserEnabled(enabled: boolean) {
		localStorage.setItem('beat-visualiser', enabled ? 'true' : 'false')
		beatVisualiserInput.checked = enabled
	}
}