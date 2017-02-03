import $ from 'jquery';
import { LOCAL_SERVER } from './constants';


const API_KEY = 'B63kvXB8gGg6S4wYFCH3k0Zs04HsOyBj6A8L649L';

const RESTRICT_KIND = {
    OVERVIEW: 'overview',
    CATEGORY: 'category',
    ACTIVITY: 'activity',
    PRODUCTIVITY: 'productivity',
    EFFICIENCY: 'efficiency',
    DOCUMENT: 'document'
};

const PERSPECTIVE = {
    RANK: 'rank',
    INTERVAL: 'interval',
    MEMBER: 'member'
};


class Request {
    constructor(date) {
        this._params = {
            restrict_begin: date.from,
            restrict_end: date.to
        };
    }

    static getUrl(path = '/data', params = {}) {
        params.key = API_KEY;
        params.format = 'json';

        params = '?' + $.param(params);

        return 'http://' + LOCAL_SERVER.HOST + ':' + LOCAL_SERVER.PORT + path + params;
    }

    send() {
        return new Promise((resolve, reject) => {
            $.ajax( Request.getUrl('/data', this._params) )
                .done((response) => {
                    !!response ? resolve(response) : reject({ error: 'server response is empty' });
                })
                .fail((jqXHR) => {
                    reject({ error: `code ${jqXHR.status}` });
                });
        });

    }
}

class SummaryRequest extends Request {
    constructor(date) {
        super(date);
        this._params = Object.assign(this._params, {
            restrict_kind: RESTRICT_KIND.PRODUCTIVITY,
            perspective: PERSPECTIVE.RANK
        });
    }
}

class SummaryByHourRequest extends Request {
    constructor(date) {
        super(date);
        this._params = Object.assign(this._params, {
            restrict_kind: RESTRICT_KIND.PRODUCTIVITY,
            perspective: PERSPECTIVE.INTERVAL
        });
    }
}

class ActsByRankRequest extends Request {
    constructor(date) {
        super(date);
        this._params = Object.assign(this._params, {
            restrict_kind: RESTRICT_KIND.ACTIVITY,
            perspective: PERSPECTIVE.RANK
        });
    }
}

class ActivityByHourRequest extends Request {
    constructor(date, activity) {
        super(date);
        this._params = Object.assign(this._params, {
            restrict_kind: RESTRICT_KIND.ACTIVITY,
            perspective: PERSPECTIVE.INTERVAL,
            restrict_thing: activity
        });
    }
}

export {
    SummaryRequest,
    SummaryByHourRequest,
    ActivityByHourRequest,
    ActsByRankRequest
};
