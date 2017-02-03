import React  from 'react';
import { connect } from 'react-redux';
import { setTime } from './actions';


class TimeSummary extends React.Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.date !== this.props.date) {
            this.props.dispatch( setTime(nextProps.date) );
            return false;
        } else return true;
    }

    render() {
        return (
            <div id="timeSummary" className="">
                {`Logged so far: ${ this.props.time.timeSummary }`}
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
