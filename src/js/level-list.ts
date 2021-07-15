interface LevelEntry {
	title: string
	artist: string
	bpm: number
	createLevel: () => Level
}

const levelList: LevelEntry[] = [
	{
		title: 'Nostalgia',
		artist: 'Tobu',
		bpm: 128,
		createLevel: () => new LevelNostalgia()
	},
	{
		title: 'Love at Heart',
		artist: 'Blackmill',
		bpm: 140,
		createLevel: () => new LevelLoveAtHeart()
	},
	{
		title: 'Sun Models',
		artist: 'Odesza',
		bpm: 60,
		createLevel: () => new LevelSunModels()
	},
	{
		title: 'Shark',
		artist: 'Oh Wonder',
		bpm: 150,
		createLevel: () => new LevelShark()
	},
	{
		title: 'Crave You (remix)',
		artist: 'Flight Facilities',
		bpm: 140,
		createLevel: () => new LevelCraveYou()
	},
	{
		title: 'Fire',
		artist: 'Brook Xiao',
		bpm: 148,
		createLevel: () => new LevelFire()
	},
	{
		title: 'Away',
		artist: 'Phantom Sage',
		bpm: 140,
		createLevel: () => new LevelAway
	}
]