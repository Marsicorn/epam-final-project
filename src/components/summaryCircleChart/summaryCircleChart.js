import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindAll} from 'lodash';
import Slice from './summaryChartSlice';
import {setSummary} from './actions';
import {CHART_SIZE, TEXT_SIZE} from './constants';
import './index.css';


class SummaryCircleChart extends React.Component {
	static PropTypes = {
		dispatch: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);

		bindAll(this, ['renderSlices', 'isDateDefined', 'isDataDefined']);
	}

	componentDidMount() {
		if (this.isDateDefined()) {
			this.props.dispatch(setSummary(this.props.date));
		}
	}

	isDateDefined() {
		return this.props.date.from;
	}

	shouldComponentUpdate(nextProps) {
		if (nextProps.date !== this.props.date) {
			this.props.dispatch(setSummary(nextProps.date));
			return false;
		} else {
			return typeof nextProps.summary.productivity !== 'undefined';
		}
	}

	renderSlices() {
		return this.props.summary.productivity.map((item, key) => {
			return (
				<Slice
					sliceLabel='sliceInfo'
					time={ item.time }
					percentage={ item.percentage }
					key={ key }
					startAngle={ item.angles.startAngle }
					endAngle={ item.angles.endAngle }
					type={ item.level }/>
			);
		});
	}

	isDataDefined() {
		return !!this.props.summary.productivity;
	}

	render() {
		if (this.isDataDefined())
			return (
				<div id='summaryCircleChart'>
					<svg width={ CHART_SIZE } height={ CHART_SIZE }>
						<g transform={ `translate( ${ CHART_SIZE / 2 },${ CHART_SIZE / 2 })` }>
							{ this.renderSlices() }
							<text
								x={ 0 }
								y={ 0 }
								fontFamily='sans-serif'
								fontSize={ TEXT_SIZE }
								fill='ivory'
								textAnchor='middle'
								alignmentBaseline='middle'>
								{ this.props.summary.pulse }
							</text>
						</g>
					</svg>
					<div id='sliceInfo'></div>
				</div>
			);
		else {
			return (
				<div className='message'>
					No data registered
				</div>
			);
		}
	}
}

function mapStateToProps(state) {
	return {
		summary: state.summary,
		date: state.date
	};
}


export default connect(mapStateToProps)(SummaryCircleChart);

