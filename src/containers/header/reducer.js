import {UPDATE_DATE} from './actions';


const initialState = {
	from: undefined,
	to: undefined
};

function dateReducer(state = initialState, action) {
	switch (action.type) {
		case UPDATE_DATE:
			return action.date;

		default:
			return state;
	}
}

const DateReducer = {
	date: dateReducer
};


export default DateReducer;

