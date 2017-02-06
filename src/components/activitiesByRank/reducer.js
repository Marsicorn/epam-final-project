import { SET_ACTS_BY_RANK } from './actions';
import { PRODUCTIVE, DISTRACTING } from '../constants';

const initialState = {};
initialState[PRODUCTIVE] = [];
initialState[DISTRACTING] = [];

function activitiesByRankReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ACTS_BY_RANK:
            return action.activities;

        default:
            return state;
    }
}

const ActivitiesByRankReducer = {
    activitiesByRank: activitiesByRankReducer
};


export default ActivitiesByRankReducer;

