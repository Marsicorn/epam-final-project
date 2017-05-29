import Data from "./dataHolder";
import {SummaryRequest} from "../fetchData";
import ProductivityLevels from "../productivityLevels";
import {isSpentEnough, getAngles, timeToString} from "./functions";

export default class SummaryData extends Data {
	static get(date) {
		return super.get(new SummaryRequest(date));
	}

	static format(jsonData) {
		const data = super.format(jsonData);
		if (typeof data === 'undefined') {
			return [];
		}

		let percents = {},
			time = {},
			angles = [];
		let fullTime = 0;

		ProductivityLevels.levels.forEach((level) => {
			percents[level.name] = 0;
			time[level.name] = 0;
			angles[level.name] = 0;
		});

		const INITIAL_VALUE = 0;

		fullTime = data.rows
			.map((productivityItem) => productivityItem[1])
			.reduce((acc, secondsSpent) => acc + secondsSpent, INITIAL_VALUE);

		if (fullTime < 60) {
			return [];
		}

		let levelName = '';
		let summary = {
			productivity: [],
			pulse: 0
		};

		data.rows
			.filter(isSpentEnough)
			.forEach((item) => {
				levelName = ProductivityLevels.getLevelName(item[3]);
				percents[levelName] = Math.floor((item[1] / fullTime) * 100);
				time[levelName] = timeToString(item[1]);

				if (item[3] > 0) {
					summary.pulse += percents[levelName];
				}
				else if (item[3] === 0) {
					summary.pulse += Math.floor(percents[levelName] / 2);
				}
			});

		angles = getAngles(percents);

		summary.productivity = ProductivityLevels.levels.map((level) => {
			return ({
				level: level.name,
				percentage: percents[level.name],
				angles: {
					startAngle: angles[ProductivityLevels.getLevelName(+level.key + 1)] || 0,
					endAngle: angles[level.name]
				},
				time: time[level.name]
			});
		});
		return summary;
	}
}
