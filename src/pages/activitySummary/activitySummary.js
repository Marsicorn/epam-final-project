import React from "react";
import {browserHistory} from "react-router";
import {ActivityTimeGraph, Navigation} from "../../components";
import {ACTIVITY_SUM} from "../paths";
import "./index.css";

export default class ActivitySummaryPage extends React.Component {
	static getPath() {
		return ACTIVITY_SUM;
	};

	render() {
		return (
			<div>
				<ActivityTimeGraph />

				<div className='navigation'
					 style={{transform: 'rotate(180deg)'}}
					 onClick={ browserHistory.goBack }>
					<Navigation />
				</div>
			</div>
		);
	}

}
