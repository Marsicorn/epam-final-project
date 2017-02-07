import {SummaryTimeData} from '../../utils/dataHolders';
import {Loader} from '../../components/loader';


const SET_TIME = 'SET_TIME';

function setTime(date) {
	return function (dispatch) {
		Loader.showLoader();
		SummaryTimeData
			.get(date)
			.then((data) => {
				let timeLogged = SummaryTimeData.format(data);
				dispatch({
					type: SET_TIME,
					timeSummary: timeLogged
				});
				Loader.hideLoader();
			});
	}
}

export {
	SET_TIME,
	setTime
}
