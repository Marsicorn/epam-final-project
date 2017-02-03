import React from 'react';
import { Route } from 'react-router';
import { DetailedSummaryPage } from '../detailedSummary';
import { PRODUCTIVE } from '../../components/constants';
import { PRODUCTIVE_SUM } from '../paths';


function ProductiveSummaryPage() {
    return (
        <DetailedSummaryPage activityType={PRODUCTIVE}/>
    );
}


export default (
    <Route>
        <Route component={ ProductiveSummaryPage } path={ PRODUCTIVE_SUM } />
    </Route>
);
