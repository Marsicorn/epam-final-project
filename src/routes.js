import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app';
import { HomePage, HomeRoute } from './pages/home';
import { DetailedSummaryRoute} from './pages/detailedSummary';
import { ProductiveSummaryRoute } from './pages/productiveSummary';
import { DistractingSummaryRoute } from './pages/distractingSummary';
import { ActivitySummaryRoutes } from './pages/activitySummary';
import { ErrorPage } from './pages/error';

export default (
    <Route component={ App } path={ App.getPath() } >
        <IndexRoute component={ HomePage } />
        
        { HomeRoute }
        { DetailedSummaryRoute }
        { ProductiveSummaryRoute }
        { DistractingSummaryRoute }
        { ActivitySummaryRoutes }
        
        <Route path='*' component={ ErrorPage } />
    </Route>
);
