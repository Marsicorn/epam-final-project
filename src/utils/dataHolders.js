import moment from 'moment';
import ProductivityLevels from './productivityLevels';
import {
    SummaryRequest,
    SummaryByHourRequest,
    ActsByRankRequest,
    ActivityByHourRequest
} from './fetchData';
import { PRODUCTIVE, DISTRACTING } from '../components/constants';

const BY_DAY = 'BY_DAY';
const BY_HOUR = 'BY_HOUR';


class Data {
    static get(request) {
        return request
            .send()
            .then((data) => data
            )
            .catch((error) => {
                console.error(error);
            });
    }

    static format(data) {
        try {
            let formattedData = JSON.parse(data);
            if (!formattedData.hasOwnProperty('rows'))
                throw new Error();
            else return formattedData;
        } catch (error) {
            return undefined;
        }
    }
}


class SummaryTimeData extends Data{
    static get(date) {
        return super.get(new SummaryRequest(date));
    }

    static format(jsonData) {
        const data = super.format(jsonData);
        if (typeof data === 'undefined') {
            return [];
        }

        const INITIAL_VALUE = 0;

        let fullTime = data.rows
            .map((productivityItem) => productivityItem[1])
            .reduce((acc, secondsSpent) => acc + secondsSpent, INITIAL_VALUE);

        return (
            (fullTime > 60) ?
                timeToString(fullTime) :
                'no time logged yet'
        );
    }
}


class SummaryData extends Data{
    static get(date) {
        return super.get(new SummaryRequest(date));
    }

    static format(jsonData) {
        const data = super.format(jsonData);
        if (typeof data === 'undefined') {
            return [];
        }

        let percents = {},
            time = {},
            angles = [];
        let fullTime = 0;

        ProductivityLevels.levels.forEach((level) => {
            percents[level.name] = 0;
            time[level.name] = 0;
            angles[level.name] = 0;
        });

        const INITIAL_VALUE = 0;

        fullTime = data.rows
            .map((productivityItem) => productivityItem[1])
            .reduce((acc, secondsSpent) => acc + secondsSpent, INITIAL_VALUE);

        if (fullTime < 60) {
            return [];
        }

        let levelName = '';
        let summary = {
            productivity: [],
            pulse: 0
        };

        data.rows
            .filter(isSpentEnough)
            .forEach((item) => {
                levelName = ProductivityLevels.getLevelName(item[3]);
                percents[levelName] = Math.floor((item[1] / fullTime) * 100);
                time[levelName] = timeToString(item[1]);

                if (item[3] > 0) {
                    summary.pulse += percents[levelName];
                }
                else if (item[3] === 0) {
                    summary.pulse += Math.floor(percents[levelName]/2);
                }
            });

        angles = getAngles(percents);

        summary.productivity = ProductivityLevels.levels.map((level) => {
            return({
                level: level.name,
                percentage: percents[level.name],
                angles: {
                    startAngle: angles[ProductivityLevels.getLevelName(+level.key + 1)] || 0,
                    endAngle: angles[level.name]
                },
                time: time[level.name]
            });
        });
        return summary;
    }
}

function isSpentEnough(productivityData) {
    const secondsSpent = productivityData[1];
    return (secondsSpent > 60);
}

function getAngles(percents) {
    let _percents = Object.assign({}, percents);

    return {
        very_productive: _percents.very_productive * 3.60,
        productive: (_percents.productive += _percents.very_productive) * 3.60,
        neutral:( _percents.neutral += _percents.productive ) * 3.60,
        distracting: (_percents.distracting += _percents.neutral) * 3.60,
        very_distracting: 360,
    }
}

function timeToString(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor(seconds / 60) % 60;
    return (hours ? hours + 'h ' : '') + minutes + 'm';
}


class SummaryByHourData extends Data{
    static get(date) {
        return super.get(new SummaryByHourRequest(date));
    }

    static format(jsonData, timelineUnit) {
        const data = super.format(jsonData);
        if (typeof data === 'undefined') return [];

        let timeFormat = (timelineUnit === BY_HOUR) ? 'H[h]' : 'DD MMMM';

        let chartData = [];
        let chartItem = createNewChartItem();

        data.rows.forEach(function(item) {
            let itemDate = moment(item[0]).format(timeFormat);
            if (itemDate !== chartItem.name) {
                if (chartItem.name) {
                    chartData.push(chartItem);
                }
                chartItem = createNewChartItem(itemDate);
            }
            let level = ProductivityLevels.getLevelName(item[3]);
            chartItem[level] += Math.sign(item[3]) * Math.round(item[1] / 60);
        });
        chartData.push(chartItem);

        return chartData;
    }
}

function createNewChartItem(date = '') {
    let chartItem = {};
    ProductivityLevels.levels.forEach((level) => {
        chartItem[level.name] = 0;
    });
    chartItem.name = date;
    return chartItem;
}


class ActivitiesByRankData extends Data{
    static get(date) {
        return super.get(new ActsByRankRequest(date));
    }

    static format(jsonData) {
        const data = super.format(jsonData);
        if (typeof data === 'undefined') return [];

        let lists = {};
        lists[PRODUCTIVE] = [];
        lists[DISTRACTING] = [];

        let i = 0;
        let item;
        while ((lists[PRODUCTIVE].length < 5 || lists[DISTRACTING].length < 5) && data.rows.length > i) {
            item = data.rows[i++];

            let activity = {
                name: item[3],
                level: +item[5],
                time: timeToString(item[1])
            };

            if (activity.time.length > 1) {
                if (activity.level > 0) {
                    if (lists[PRODUCTIVE].length < 5)
                        lists[PRODUCTIVE].push(activity);

                } else if (lists[DISTRACTING].length < 5)
                    lists[DISTRACTING].push(activity);
            }
        }
        return lists;
    }
}


class ActivityByHourData extends Data{
    static get(date, activity) {
        return super.get(new ActivityByHourRequest(date, activity));
    }

    static format(jsonData, timelineUnit) {
        const data = super.format(jsonData);
        if (typeof data === 'undefined') {
            return [];
        }

        let timeFormat = (timelineUnit === BY_HOUR) ? 'H[h]' : 'DD MMMM';

        let chartData = [];
        let chartItem = {
            name: '',
            time: 0
        };

        data.rows.forEach(function (item) {
            let itemDate = moment(item[0]).format(timeFormat);
            if (itemDate !== chartItem.name) {
                if (chartItem.time !== 0) {
                    chartData.push(chartItem);
                    chartItem = {
                        name: '',
                        time: 0
                    };
                }
                chartItem.name = itemDate;
            }
            chartItem.time += Math.round(item[1] / 60);
        });
        return chartData;
    }
}


export {
    SummaryData,
    SummaryTimeData,
    SummaryByHourData,
    ActivitiesByRankData,
    ActivityByHourData,
    BY_DAY,
    BY_HOUR
};
