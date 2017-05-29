import Data from "./dataHolder";
import {SummaryRequest} from "../fetchData";
import {timeToString} from "./functions";

export default class SummaryTimeData extends Data {
	static get(date) {
		return super.get(new SummaryRequest(date));
	}

	static format(jsonData) {
		const data = super.format(jsonData);
		if (typeof data === 'undefined') {
			return [];
		}

		const INITIAL_VALUE = 0;

		let fullTime = data.rows
			.map((productivityItem) => productivityItem[1])
			.reduce((acc, secondsSpent) => acc + secondsSpent, INITIAL_VALUE);

		return (
			(fullTime > 60) ?
				timeToString(fullTime) :
				'no time logged yet'
		);
	}
}
