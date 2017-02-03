import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindAll } from 'lodash';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { setActivityTimes } from './actions';
import ChartTooltip from '../chartTooltip';
import ProductivityLevels from '../../utils/productivityLevels';
import { PRODUCTIVE } from '../constants';


class ActivityTimeGraph extends React.Component {
    static PropTypes = {
        activityName: PropTypes.string.isRequired,
        activityType: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

        bindAll(this, ['renderBarChart', 'isDataDefined', 'shouldGetNewData']);
    }

    componentDidMount() {
        if (this.isActivityDefined(this.props)) {
            this.props.dispatch(setActivityTimes(
                this.props.actTimes.activityName,
                this.props.actTimes.activityType,
                this.props.date));
        }
        this._mounted = true;
        window.addEventListener("resize", () => {
            if (this._mounted)
                this.forceUpdate();
        });
    }

    isActivityDefined(props) {
        return (props.actTimes.activityName.length > 0);
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    shouldComponentUpdate(nextProps) {
        if (this.shouldGetNewData(nextProps)) {
            this.props.dispatch(setActivityTimes(
                nextProps.actTimes.activityName,
                nextProps.actTimes.activityType,
                nextProps.date));
            return false;
        }
        return true;
    }

    shouldGetNewData(nextProps) {
        return ((nextProps.date !== this.props.date) && this.isActivityDefined(nextProps))
            || ((typeof nextProps.date !== 'undefined')
            && (nextProps.actTimes.activityName !== this.props.actTimes.activityName));
    }

    renderBarChart() {
        const CHART_WIDTH = document.body.clientWidth*0.9;
        const CHART_HEIGHT = CHART_WIDTH*0.3;

        return (
            <BarChart
                width={CHART_WIDTH}
                height={CHART_HEIGHT}
                stackOffset="sign"
                data={this.props.actTimes.times}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="2 5" stroke="rgba(255,255,255,0.3)"/>
                { ChartTooltip() }
                <Bar
                    stackId="stack"
                    dataKey='time'
                    stroke='#8884d8'
                    fill={this.props.actTimes.activityType === PRODUCTIVE ?
                        ProductivityLevels.getLevelColor({key: 2}) :
                        ProductivityLevels.getLevelColor({key: -2})}
                    isAnimationActive={false}
                />
            </BarChart>
        );
    }

    isDataDefined() {
        return (typeof this.props.actTimes.times !== 'undefined'
            && this.props.actTimes.times.length > 0);
    }

    render() {
        return (
            <div>
                <div className="activityName"> {this.props.actTimes.activityName } </div>
                { this.isDataDefined() ?
                    <div className="chart">
                        {this.renderBarChart()}
                    </div>
                    :
                    <div className="message">No data registered</div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        actTimes: state.actTimes,
        date: state.date
    };
}


export default connect(mapStateToProps)(ActivityTimeGraph);