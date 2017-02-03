import { SummaryByHourData, BY_DAY, BY_HOUR } from '../../utils/dataHolders';


const SET_DETAILED_SUMMARY = 'SET_SUMMARY_BY_HOUR';

function setDetailedSummary(date) {
    return function(dispatch) {
        SummaryByHourData
            .get(date)
            .then((data) => {
                let timeLineUnit = (date.from === date.to ) ? BY_HOUR : BY_DAY;
                let summaryByHour = SummaryByHourData.format(data, timeLineUnit);
                dispatch({
                    type: SET_DETAILED_SUMMARY,
                    actsTimeSeries: summaryByHour
                });
            });
    }
}

export {
    SET_DETAILED_SUMMARY,
    setDetailedSummary
}


