import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import { bindAll } from 'lodash';
import moment from 'moment';
import { updateDate } from './actions';
import './index.css';


const OPTIONS = {
    dateFormat: 'd MM yy',
    showOtherMonths: true,
    selectOtherMonths: true,
    showAnim: 'slideDown',
    firstDay: 1,
    changeMonth: true,
    changeYear: true,
    gotoCurrent: true,
    hideIfNoPrevNext: true,
    defaultDate: 0,
    maxDate: '+0D',
    minDate: '-86D' //free RescueTime account limit
};

class DatePickers extends React.Component {
    constructor(props) {
        super(props);

        this.date = {
            from: '',
            to: ''
        };

        bindAll(this, ['applyNewDate', 'validateDate']);
    }

    componentDidMount() {
        this.$dpFrom = $('#datepickerFrom');
        this.$dpTo = $('#datepickerTo');

        this.$dpFrom.datepicker(OPTIONS)
            .on('change', () => {
                let newFromValue = this.$dpFrom.datepicker('getDate');
                this.$dpTo.datepicker('option', 'minDate', newFromValue);
            });
        this.$dpTo.datepicker(OPTIONS)
            .on('change', () => {
                let newToValue = this.$dpTo.datepicker('getDate');
                this.$dpFrom.datepicker('option', 'maxDate', newToValue);
            });
    }

    componentWillUnmount() {
        this.$dpFrom.datepicker('destroy');
        this.$dpTo.datepicker('destroy');
    }


    validateDate() {
        let from = this.$dpFrom.datepicker('getDate');
        let to = this.$dpTo.datepicker('getDate');

        let today = new Date();

        if (!from) {
            if (!to) {
                to = today;
                this.$dpTo.datepicker('setDate', to);
            }
            from = to;
            this.$dpFrom
                .datepicker('setDate', from)
                .datepicker('show');
        } else {
            if (!to) {
                to = from;
                this.$dpTo
                    .datepicker('setDate', to)
                    .datepicker('show');
            }
        }

        return {
            from: moment(from).format('DD-MM-YYYY'),
            to: moment(to).format('DD-MM-YYYY')
        }
    }

    applyNewDate() {
        let date = this.validateDate();

        if (this.date.from === date.from &&
            this.date.to === date.to)
            return;
        else this.date = date;

        this.props.dispatch( updateDate(date) );
    }

    render() {
        return (
            <div id='date'>
                <div className='date__input'>
                    From <input
                        type='text'
                        id='datepickerFrom'
                        ref='datepickerFrom'
                        className='datepicker' />
                </div>
                <div className='date__input'>
                    To <input
                        type='text'
                        id='datepickerTo'
                        ref='datepickerTo'
                        className='datepicker' />
                </div>
                <div className='date__button'>
                    <button onClick={ this.applyNewDate } id='ok'>OK</button>
                </div>
            </div>
        );
    }

}

function mapStateToProps() {
    return {};
}


export default connect(mapStateToProps)(DatePickers);
