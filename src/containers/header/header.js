import React from 'react';
import { TimeSummary, DatePickers } from '../../components';
import './index.css';

export default function Header() {
    return (
        <header className='row'>
            <TimeSummary />
            <DatePickers />
        </header>
    );
}
