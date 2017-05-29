import Data from "./dataHolder";
import {ActivityByHourRequest} from "../fetchData";
import moment from "moment";
import {BY_HOUR, DATE_FORMAT} from "../config";


export default class ActivityByHourData extends Data {
	static get(date, activity) {
		return super.get(new ActivityByHourRequest(date, activity));
	}

	static format(jsonData, timelineUnit) {
		const data = super.format(jsonData);
		if (typeof data === 'undefined') {
			return [];
		}

		let timeFormat = (timelineUnit === BY_HOUR) ? DATE_FORMAT.HOUR : DATE_FORMAT.DAY_MONTH;

		let chartData = [];
		let chartItem = {
			name: '',
			time: 0
		};

		data.rows.forEach(function (item) {
			let itemDate = moment(item[0]).format(timeFormat);
			if (itemDate !== chartItem.name) {
				if (chartItem.time !== 0) {
					chartData.push(chartItem);
					chartItem = {
						name: '',
						time: 0
					};
				}
				chartItem.name = itemDate;
			}
			chartItem.time += Math.round(item[1] / 60);
		});
		return chartData;
	}
}
