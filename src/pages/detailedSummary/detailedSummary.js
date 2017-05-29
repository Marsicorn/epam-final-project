import React from "react";
import {browserHistory} from "react-router";
import {ActivitiesTimeGraph, ActivitiesByRankLists, Navigation} from "../../components";
import {DISTRACTING, PRODUCTIVE} from "../../components/constants";
import {DETAILED_SUMMARY} from "../../pages/paths";
import "./index.css";

export default class DetailedSummaryPage extends React.Component {
	static getPath() {
		return DETAILED_SUMMARY + '(/:type)'
	}

	constructor(props) {
		super(props);

		this.shouldDraw = this.shouldDraw.bind(this);
	}

	shouldDraw() {
		let shouldDrawProductive = false;
		let shouldDrawDistracting = false;

		let {type} = this.props.params;

		if (typeof type !== 'undefined') {
			switch (type) {
				case PRODUCTIVE:
					shouldDrawProductive = true;
					break;

				case DISTRACTING:
					shouldDrawDistracting = true;
					break;

				default:
					shouldDrawProductive = shouldDrawDistracting = true;
			}
		} else {
			shouldDrawProductive = shouldDrawDistracting = true;
		}

		return {
			shouldDrawProductive,
			shouldDrawDistracting
		}
	}

	render() {
		let {shouldDrawProductive, shouldDrawDistracting} = this.shouldDraw();

		return (
			<div>
				<ActivitiesTimeGraph activityType={ `${shouldDrawProductive ? PRODUCTIVE : ' '}
                    ${shouldDrawDistracting ? DISTRACTING : ' '}`}/>

				<div
					className='navigation'
					style={{transform: 'rotate(180deg)'}}
					onClick={ browserHistory.goBack }>
					<Navigation />
				</div>

				<div id='actsByRank'>
					{ shouldDrawProductive ? <ActivitiesByRankLists activityType={ PRODUCTIVE }/> : '' }
					{ shouldDrawDistracting ? <ActivitiesByRankLists activityType={ DISTRACTING }/> : '' }
				</div>
			</div>
		);
	}
}
