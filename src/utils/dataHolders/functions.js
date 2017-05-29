import ProductivityLevels from "../productivityLevels";

function isSpentEnough(productivityData) {
	const secondsSpent = productivityData[1];
	return (secondsSpent > 60);
}

function getAngles(percents) {
	let _percents = Object.assign({}, percents);

	return {
		very_productive: _percents.very_productive * 3.60,
		productive: (_percents.productive += _percents.very_productive) * 3.60,
		neutral: ( _percents.neutral += _percents.productive ) * 3.60,
		distracting: (_percents.distracting += _percents.neutral) * 3.60,
		very_distracting: 360,
	}
}

function timeToString(seconds) {
	let hours = Math.floor(seconds / 3600);
	let minutes = Math.floor(seconds / 60) % 60;
	return (hours ? hours + 'h ' : '') + minutes + 'm';
}

function createNewChartItem(date = '') {
	let chartItem = {};
	ProductivityLevels.levels.forEach((level) => {
		chartItem[level.name] = 0;
	});
	chartItem.name = date;
	return chartItem;
}

export {
	isSpentEnough,
	getAngles,
	timeToString,
	createNewChartItem
}
