import React from 'react';
import { Route } from 'react-router';
import DetailedSummaryPage from './detailedSummary';

export default (
    <Route>
        <Route component={ DetailedSummaryPage } path={ DetailedSummaryPage.getPath() } />
    </Route>
);
