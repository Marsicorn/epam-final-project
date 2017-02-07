import {SET_TIME} from './actions';


const initialState = {
	timeSummary: 'no activity registered'
};

function timeSummaryReducer(state = initialState, action) {
	switch (action.type) {
		case SET_TIME:
			return Object.assign({}, state, {
				timeSummary: action.timeSummary
			});
		default:
			return state;
	}
}

const TimeSummaryReducer = {
	time: timeSummaryReducer
};


export default TimeSummaryReducer;

