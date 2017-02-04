import React, { PropTypes } from 'react';
import { bindAll } from 'lodash';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { setActivityName } from '../activityTimeGraph/actions';
import { setActivitiesByRank } from './actions';
import { ACTIVITY_SUM } from '../../pages/paths';
import './index.css';


class ActivitiesByRankLists extends React.Component {
    static PropTypes = {
        activityType: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        bindAll(this, ['renderActivity', 'isDateDefined']);
    }

    componentDidMount() {
        if (this.isDateDefined()) {
            this.props.dispatch( setActivitiesByRank(this.props.date) );
        }
        this._mounted = true;
        window.addEventListener('resize', () => {
            if (this._mounted) this.forceUpdate();
        });
    }

    isDateDefined() {
        return this.props.date.from;
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.date !== this.props.date) {
            this.props.dispatch( setActivitiesByRank(nextProps.date) );
            return false;
        } else {
            return true;
        }
    }

    renderActivity(activity, idx) {
        return (
            <li key={ idx }
                className='activity'
                onClick={() => {
                    this.props.dispatch( setActivityName(activity.name, this.props.activityType) );
                    browserHistory.push(ACTIVITY_SUM);
                }}>
                <span className='actName'>
                    { activity.name }
                </span>
                <span className='actTimeSpend'>
                    { activity.time }
                </span>
            </li>
        )
    }

    render() {
        let list = this.props.activitiesByRank[this.props.activityType]
            .map((activity, idx) => this.renderActivity(activity, idx));

        return (
            list.length > 0 ?
            <ul id={ this.props.activityType }>
                { list }
            </ul> : null
        );
    }
}

function mapStateToProps(state) {
    return {
        activitiesByRank: state.activitiesByRank,
        date: state.date
    };
}


export default connect(mapStateToProps)(ActivitiesByRankLists);