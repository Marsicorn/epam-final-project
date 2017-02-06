import React, { PropTypes }  from 'react';
import { connect } from 'react-redux';
import { setTime } from './actions';


class TimeSummary extends React.Component {
    static PropTypes = {
        dispatch: PropTypes.func.isRequired
    };

    shouldComponentUpdate(nextProps) {
        if (nextProps.date !== this.props.date) {
            this.props.dispatch( setTime(nextProps.date) );
            return false;
        } else return true;
    }

    render() {
        return (
            <div id='timeSummary'>
                { `Logged so far: ${ this.props.time.timeSummary }` }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        time: state.time,
        date: state.date
    };
}


export default connect(mapStateToProps)(TimeSummary);
