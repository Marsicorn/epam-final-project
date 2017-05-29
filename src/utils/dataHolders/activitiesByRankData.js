import Data from "./dataHolder";
import {ActsByRankRequest} from "../fetchData";
import {timeToString} from "./functions";
import {PRODUCTIVE, DISTRACTING} from "../../components/constants";

export default class ActivitiesByRankData extends Data {
	static get(date) {
		return super.get(new ActsByRankRequest(date));
	}

	static format(jsonData) {
		const data = super.format(jsonData);
		if (typeof data === 'undefined') return [];

		let lists = {
			[PRODUCTIVE]: [],
			[DISTRACTING]: []
		};

		let i = 0;
		let item;
		while ((lists[PRODUCTIVE].length < 5 || lists[DISTRACTING].length < 5) && data.rows.length > i) {
			item = data.rows[i++];

			let activity = {
				name: item[3],
				level: +item[5],
				time: timeToString(item[1])
			};

			if (activity.time.length > 1) {
				if (activity.level > 0) {
					if (lists[PRODUCTIVE].length < 5)
						lists[PRODUCTIVE].push(activity);

				} else if (lists[DISTRACTING].length < 5)
					lists[DISTRACTING].push(activity);
			}
		}
		return lists;
	}
}
