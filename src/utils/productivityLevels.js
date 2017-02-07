export default class ProductivityLevels {
	static levels = [
		{
			key: -2,
			name: 'very_distracting',
			color: '#F54F53'
		},
		{
			key: -1,
			name: 'distracting',
			color: '#B05155'
		},
		{
			key: 0,
			name: 'neutral',
			color: '#30474D'
		},
		{
			key: 1,
			name: 'productive',
			color: '#535D52'
		},
		{
			key: 2,
			name: 'very_productive',
			color: '#7A9A75'
		}
	];

	static getLevelKey(levelName) {
		let level = ProductivityLevels.levels.filter((level) => level.name === levelName)[0];
		return level ? level.key : undefined;
	}

	static getLevelName(levelKey) {
		let level = ProductivityLevels.levels.filter((level) => level.key === levelKey)[0];
		return level ? level.name : undefined;
	}

	static getLevelColor({key: levelKey, name: levelName}) {
		let level;
		if (levelKey) {
			level = ProductivityLevels.levels.filter((level) => level.key === levelKey)[0];
		} else if (levelName) {
			level = ProductivityLevels.levels.filter((level) => level.name === levelName)[0];
		}

		return level ? level.color : undefined;
	}
}
