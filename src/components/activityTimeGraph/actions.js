import {ActivityByHourData} from "../../utils/dataHolders";
import {BY_DAY, BY_HOUR} from "../../utils/config";
import {Loader} from "../../components/loader";

const SET_ACTIVITY_TIMES = 'SET_ACTIVITY_TIMES';
const SET_ACTIVITY_NAME = 'SET_ACTIVITY_NAME';


function setActivityTimes(activityName, activityType, date) {
	return function (dispatch) {
		Loader.showLoader();
		// https://www.rescuetime.com/browse/activities/314/by/hour/for/the/day/of/2017-01-11
		ActivityByHourData
			.get(date, activityName)
			.then((data) => {
				let timeLineUnit = (date.from === date.to) ? BY_HOUR : BY_DAY;
				let activityByHour = ActivityByHourData.format(data, timeLineUnit);
				dispatch({
					type: SET_ACTIVITY_NAME,
					data: {
						activityName,
						activityType,
						times: activityByHour
					}
				});
				Loader.hideLoader();
			});
	}
}

function setActivityName(name, type) {
	return {
		type: SET_ACTIVITY_NAME,
		data: {
			activityName: name,
			activityType: type,
			times: undefined
		}
	}
}


export {
	SET_ACTIVITY_TIMES,
	SET_ACTIVITY_NAME,
	setActivityTimes,
	setActivityName
}
