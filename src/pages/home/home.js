import React from 'react';
import {Link} from 'react-router';
import {SummaryCircleChart, Navigation} from '../../components';
import {HOME_PATH, DETAILED_SUMMARY} from '../paths';


export default class HomePage extends React.Component {
	static getPath() {
		return HOME_PATH;
	};

	render() {
		return (
			<div>
				<SummaryCircleChart />

				<div className='navigation'>
					<Link to={ DETAILED_SUMMARY }>
						<Navigation />
					</Link>
				</div>
			</div>
		);
	}
}
