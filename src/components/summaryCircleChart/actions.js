import { SummaryData } from '../../utils/dataHolders';


const SET_SUMMARY = 'SET_SUMMARY';

function setSummary(date) {
    return function(dispatch) {
        //https://www.rescuetime.com/browse/productivity/by/rank
        SummaryData
            .get(date)
            .then((data) => {
                let summary = SummaryData.format(data);
                dispatch({
                    type: SET_SUMMARY,
                    summary: summary
                });
            });
    }
}


export {
    SET_SUMMARY,
    setSummary
}
