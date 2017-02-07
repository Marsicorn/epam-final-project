import {SET_SUMMARY} from './actions';


const initialState = {};

function summaryCircleChartReducer(state = initialState, action) {
	switch (action.type) {
		case SET_SUMMARY:
			return action.summary;

		default:
			return state;
	}
}

const SummaryCircleChartReducer = {
	summary: summaryCircleChartReducer
};


export default SummaryCircleChartReducer;

