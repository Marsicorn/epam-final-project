import Data from "./dataHolder";
import {SummaryByHourRequest} from "../fetchData";
import ProductivityLevels from "../productivityLevels";
import {createNewChartItem} from "./functions";
import moment from "moment";
import {BY_HOUR, DATE_FORMAT} from "../config";

export default class SummaryByHourData extends Data {
	static get(date) {
		return super.get(new SummaryByHourRequest(date));
	}

	static format(jsonData, timelineUnit) {
		const data = super.format(jsonData);
		if (typeof data === 'undefined') return [];

		let timeFormat = (timelineUnit === BY_HOUR) ? DATE_FORMAT.HOUR : DATE_FORMAT.DAY_MONTH;

		let chartData = [];
		let chartItem = createNewChartItem();

		data.rows.forEach(function (item) {
			let itemDate = moment(item[0]).format(timeFormat);
			if (itemDate !== chartItem.name) {
				if (chartItem.name) {
					chartData.push(chartItem);
				}
				chartItem = createNewChartItem(itemDate);
			}
			let level = ProductivityLevels.getLevelName(item[3]);
			chartItem[level] += Math.sign(item[3]) * Math.round(item[1] / 60);
		});
		chartData.push(chartItem);

		return chartData;
	}
}
