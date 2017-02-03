import { SET_DETAILED_SUMMARY } from './actions';


const initialState = [];

function activitiesReducer(state = initialState, action) {
    switch (action.type) {
        case SET_DETAILED_SUMMARY:
            return state = action.actsTimeSeries;

        default:
            return state;
    }
}

const ActivitiesReducer = {
    actsTimeSeries: activitiesReducer
};


export default ActivitiesReducer;

