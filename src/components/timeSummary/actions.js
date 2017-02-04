import { SummaryTimeData } from '../../utils/dataHolders';


const SET_TIME = 'SET_TIME';

function setTime(date) {
    return function(dispatch) {
        SummaryTimeData
            .get(date)
            .then((data) => {
                let timeLogged = SummaryTimeData.format(data);
                dispatch({
                    type: SET_TIME,
                    timeSummary: timeLogged
                })
            });
    }
}

export {
    SET_TIME,
    setTime
}