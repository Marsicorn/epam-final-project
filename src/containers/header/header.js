import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {TimeSummary, DatePickers, Loader} from '../../components';
import {updateDate} from './actions';
import './index.css';

class Header extends React.Component {
	static PropTypes = {
		dispatch: PropTypes.func.isRequired
	};

	render() {
		return (
			<header className='row'>
				<TimeSummary />
				<DatePickers onDateChanged={(newDate) => {
					this.props.dispatch(updateDate(newDate));
				}}/>
				<Loader />
			</header>
		)
	}
}

function mapStateToProps() {
	return {};
}


export default connect(mapStateToProps)(Header);

