import React from 'react';
import { TimeSummary, DatePickers } from '../../components';
import './index.css';

export default class Header extends React.Component {
    render() {
        return (
            <header className='row'>
                <TimeSummary />
                <DatePickers />
            </header>
        );
    }
}
