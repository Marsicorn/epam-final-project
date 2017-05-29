import {SummaryData} from "../../utils/dataHolders";
import {Loader} from "../../components/loader";


const SET_SUMMARY = 'SET_SUMMARY';

function setSummary(date) {
	return function (dispatch) {
		Loader.showLoader();
		//https://www.rescuetime.com/browse/productivity/by/rank
		SummaryData
			.get(date)
			.then((data) => {
				let summary = SummaryData.format(data);
				dispatch({
					type: SET_SUMMARY,
					summary
				});
				Loader.hideLoader();
			});
	}
}


export {
	SET_SUMMARY,
	setSummary
}
