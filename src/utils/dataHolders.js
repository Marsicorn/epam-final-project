import ProductivityLevels from './productivityLevels';
import {
    SummaryRequest,
    SummaryByHourRequest,
    ActsByRankRequest,
    ActivityByHourRequest
} from './fetchData';

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
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
        let formattedData;
        try {
            formattedData = JSON.parse(data);
            if (!formattedData.hasOwnProperty('rows'))
                throw new Error();
        } catch (error) {
            // formattedData = undefined;
        }
        return formattedData;
    }
}


class SummaryTimeData extends Data{
    static get(date) {
        return super.get(new SummaryRequest(date));
    }

    static format(jsonData) {
        const data = super.format(jsonData);
        if (typeof data === 'undefined') return [];

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
        if (typeof data === 'undefined') return [];

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

        if (fullTime < 60) return [];

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
    let hours = Math.floor(seconds/3600);
    let minutes = Math.floor(seconds/60) % 60;
    return (hours ? hours + 'h ' : '') + minutes + 'm';
}


class SummaryByHourData extends Data{
    static get(date) {
        return super.get(new SummaryByHourRequest(date));
    }

    static format(jsonData, timelineUnit) {
        const data = super.format(jsonData);
        if (typeof data === 'undefined') return [];

        let getDate = (timelineUnit === BY_HOUR) ? getItemHour : getItemDay;

        let chartData = [];
        let chartItem = createNewChartItem();

        data.rows.forEach(function(item) {
            let itemDate = getDate(item[0]);
            if (itemDate !== chartItem.name) {
                if (chartItem.name) {
                    chartData.push(chartItem);
                }
                chartItem = createNewChartItem(itemDate);
            }
            let level = ProductivityLevels.getLevelName(item[3]);
            chartItem[level] += Math.sign(item[3]) * Math.round((item[1]/60));
        });
        chartData.push(chartItem);

        return chartData;
    }
}

function getItemHour(date) {
    return +date.substring(11, 13);
}

function getItemDay(date) {
    return +date.substring(8, 10) + ' ' + months[+date.substring(5, 7) - 1];
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

        let productiveList = [];
        let distractingList = [];

        let i = 0;
        let item;
        while ((productiveList.length < 5 || distractingList.length < 5) && data.rows.length > i) {
            item = data.rows[i++];

            let minutes = Math.floor(item[1]/60);
            let hours = Math.floor(minutes / 60);
            let activity = {
                name: item[3],
                level: +item[5],
                time:`${hours ? hours + 'h' : ''} ${minutes ? minutes % 60 +'m' : ''}`
            };

            if (activity.time.length > 1) {
                if (activity.level > 0) {
                    if (productiveList.length < 5)
                        productiveList.push(activity);

                } else if (distractingList.length < 5)
                    distractingList.push(activity);
            }
        }

        return {
            productiveList,
            distractingList
        };
    }
}


class ActivityByHourData extends Data{
    static get(date, activity) {
        return super.get(new ActivityByHourRequest(date, activity));
    }

    static format(jsonData, timelineUnit) {
        const data = super.format(jsonData);
        if (typeof data === 'undefined') return [];

        let getDate = (timelineUnit === BY_HOUR) ? getItemHour : getItemDay;

        let chartData = [];
        let chartItem = {
            name: '',
            time: 0
        };

        data.rows.forEach(function (item) {
            let itemDate = getDate(item[0]);
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
            chartItem.time += Math.round((item[1]/60));
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
    BY_HOUR};
