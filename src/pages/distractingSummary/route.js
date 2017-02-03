import React from 'react';
import { Route } from 'react-router';
import { DetailedSummaryPage } from '../detailedSummary';
import { DISTRACTING } from '../../components/constants';
import { DISTRACTING_SUM } from '../paths';


function DistractingSummaryPage(){
    return (
        <DetailedSummaryPage activityType={DISTRACTING} />
    );
}


export default (
    <Route>
        <Route component={ DistractingSummaryPage } path={ DISTRACTING_SUM } />
    </Route>
);
