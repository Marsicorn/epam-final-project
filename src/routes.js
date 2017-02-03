import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app';
import { HomePage, HomeRoutes } from './pages/home';
import { DetailedSummaryRoute} from './pages/detailedSummary';
import { ProductiveSummaryRoute } from './pages/productiveSummary';
import { DistractingSummaryRoute } from './pages/distractingSummary';
import { ActivitySummaryRoutes } from './pages/activitySummary';
import ErrorPage from './pages/error/index';

export default (
    <Route component={ App } path={ App.getPath() } >
        <IndexRoute component={ HomePage } />
        
        { HomeRoutes }
        { DetailedSummaryRoute }
        { ProductiveSummaryRoute }
        { DistractingSummaryRoute }
        { ActivitySummaryRoutes }
        
        <Route path='*' component={ ErrorPage } />
    </Route>
);
