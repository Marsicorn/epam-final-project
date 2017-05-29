import {SET_ACTIVITY_TIMES, SET_ACTIVITY_NAME} from "./actions";


const initialState = {
	times: undefined,
	activityName: undefined,
	activityType: undefined
};

function activityReducer(state = initialState, action) {
	switch (action.type) {
		case SET_ACTIVITY_TIMES:
			return action.data;

		case SET_ACTIVITY_NAME:
			return action.data;

		default:
			return state;
	}
}

const ActivityReducer = {
	actTimes: activityReducer
};


export default ActivityReducer;

