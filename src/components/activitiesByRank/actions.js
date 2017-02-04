import { ActivitiesByRankData } from '../../utils/dataHolders';

const SET_ACTS_BY_RANK = 'SET_ACTIVITIES_BY_RANK';

function setActivitiesByRank(date) {
    return function(dispatch) {
        //https://www.rescuetime.com/browse/productivity/by/rank
        ActivitiesByRankData
            .get(date)
            .then((data) => {
                let activities = ActivitiesByRankData.format(data);
                dispatch({
                    type: SET_ACTS_BY_RANK,
                    activities
                })
            });
    }
}

export {
    SET_ACTS_BY_RANK,
    setActivitiesByRank
}