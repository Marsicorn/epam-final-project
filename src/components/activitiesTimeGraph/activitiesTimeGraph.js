import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {bindAll} from 'lodash';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid} from 'recharts';
import {setDetailedSummary} from './actions';
import {ChartTooltip} from '../chartTooltip';
import ProductivityLevels from '../../utils/productivityLevels';
import {PRODUCTIVE_SUM, DISTRACTING_SUM} from '../../pages/paths';
import {PRODUCTIVE, DISTRACTING} from '../constants';


class ActivitiesTimeGraph extends React.Component {
	static PropTypes = {
		activityType: PropTypes.string,
		dispatch: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);

		bindAll(this, [
			'renderArea',
			'renderAreaChart',
			'isDateDefined',
			'updateIfMounted'
		]);
	}

	componentDidMount() {
		if (this.isDateDefined()) {
			this.props.dispatch(setDetailedSummary(this.props.date));
		}

		this._mounted = true;
		window.addEventListener('resize', this.updateIfMounted);
	}

	updateIfMounted() {
		if (this._mounted) this.forceUpdate();
	}

	isDateDefined() {
		return this.props.date.from;
	}

	componentWillUnmount() {
		this._mounted = false;
		window.removeEventListener('resize', this.updateIfMounted);
	}

	shouldComponentUpdate(nextProps) {
		if (nextProps.date !== this.props.date) {
			this.props.dispatch(setDetailedSummary(nextProps.date));
			return false;
		} else {
			return this.isActsTimeSeriesDefined(nextProps);
		}
	}

	isActsTimeSeriesDefined(props) {
		return !!props.actsTimeSeries;
	}


	renderArea(level) {
		let levelName = ProductivityLevels.getLevelName(level);
		return (
			<Area key={ level }
				  fillOpacity={ 0.8 }
				  activeDot={{
					  stroke: ProductivityLevels.getLevelColor({key: level}),
					  strokeWidth: 5,
					  r: 2
				  }}
				  type='monotone'
				  onClick={() => {
					  browserHistory.push(level < 0 ? DISTRACTING_SUM : PRODUCTIVE_SUM)
				  }}
				  stackId={ level > 0 ? 1 : 2 }
				  dataKey={ levelName }
				  stroke='#8884d8'
				  fill={ ProductivityLevels.getLevelColor({key: level}) }
				  isAnimationActive={ false }/>
		)
	}

	renderAreaChart() {
		let type = this.isActivityTypeDefined() ?
			this.props.activityType :
			PRODUCTIVE + ' ' + DISTRACTING;

		let areas = [];
		if (type.indexOf(PRODUCTIVE) !== -1) {
			areas.push(this.renderArea(0));
			areas.push(this.renderArea(1));
			areas.push(this.renderArea(2));
		}
		if (type.indexOf(DISTRACTING) !== -1) {
			areas.push(this.renderArea(-1));
			areas.push(this.renderArea(-2));
		}

		const CHART_WIDTH = document.body.clientWidth * 0.9;
		const CHART_HEIGHT = CHART_WIDTH * 0.3;

		return (
			<AreaChart
				width={ CHART_WIDTH }
				height={ CHART_HEIGHT }
				data={ this.props.actsTimeSeries }>
				<XAxis dataKey='name'/>
				<YAxis />
				<CartesianGrid
					strokeDasharray='2 5'
					stroke='rgba(255,255,255,0.3)'/>
				{ ChartTooltip() }
				{ areas }
			</AreaChart>
		)
	}

	isActivityTypeDefined() {
		return !!this.props.activityType;
	}

	render() {
		return (
			this.isActsTimeSeriesDefined(this.props) ?
				<div className='chart'>
					{ this.renderAreaChart() }
				</div> :
				<div className='message'>
					No data registered
				</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		actsTimeSeries: state.actsTimeSeries,
		date: state.date
	};
}


export default connect(mapStateToProps)(ActivitiesTimeGraph);
