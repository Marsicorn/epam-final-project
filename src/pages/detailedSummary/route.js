import React from 'react';
import { Route } from 'react-router';
import DetailedSummaryPage from './detailedSummary';
import { DETAILED_SUMMARY } from '../../pages/paths';

export default (
    <Route>
        <Route component={ DetailedSummaryPage } path={ DETAILED_SUMMARY } />
    </Route>
);
