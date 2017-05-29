import {SummaryByHourData} from "../../utils/dataHolders";
import {BY_DAY, BY_HOUR} from "../../utils/config";
import {Loader} from "../../components/loader";


const SET_DETAILED_SUMMARY = 'SET_SUMMARY_BY_HOUR';

function setDetailedSummary(date) {
	return function (dispatch) {
		Loader.showLoader();
		SummaryByHourData
			.get(date)
			.then((data) => {
				let timeLineUnit = (date.from === date.to) ? BY_HOUR : BY_DAY;
				let summaryByHour = SummaryByHourData.format(data, timeLineUnit);
				dispatch({
					type: SET_DETAILED_SUMMARY,
					actsTimeSeries: summaryByHour
				});
				Loader.hideLoader();
			});
	}
}

export {
	SET_DETAILED_SUMMARY,
	setDetailedSummary
}


