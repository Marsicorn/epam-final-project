import {ActivitiesByRankData} from "../../utils/dataHolders";
import {Loader} from "../../components/loader";

const SET_ACTS_BY_RANK = 'SET_ACTIVITIES_BY_RANK';

function setActivitiesByRank(date) {
	return function (dispatch) {
		Loader.showLoader();
		//https://www.rescuetime.com/browse/productivity/by/rank
		ActivitiesByRankData
			.get(date)
			.then((data) => {
				let activities = ActivitiesByRankData.format(data);
				dispatch({
					type: SET_ACTS_BY_RANK,
					activities
				});
				Loader.hideLoader();
			});
	}
}

export {
	SET_ACTS_BY_RANK,
	setActivitiesByRank
}
