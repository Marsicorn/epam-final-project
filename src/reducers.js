import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { ActivitiesByRankReducer } from './components/activitiesByRank';
import { SummaryCircleChartReducer } from './components/summaryCircleChart';
import { ActivitiesReducer } from './components/activitiesTimeGraph';
import { TimeSummaryReducer } from './components/timeSummary';
import { ActivityReducer } from './components/activityTimeGraph';
import DateReducer from './components/datePickers/reducer';

export default combineReducers({
    routing: routerReducer,
    ...TimeSummaryReducer,
    ...SummaryCircleChartReducer,
    ...ActivitiesReducer,
    ...ActivitiesByRankReducer,
    ...ActivityReducer,
    ...DateReducer
});