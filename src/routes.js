import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app';
import { HomePage, HomeRoute } from './pages/home';
import { DetailedSummaryRoute} from './pages/detailedSummary';
import { ActivitySummaryRoutes } from './pages/activitySummary';
import { ErrorPage } from './pages/error';

export default (
    <Route component={ App } path={ App.getPath() } >
        <IndexRoute component={ HomePage } />
        
        { HomeRoute }
        { DetailedSummaryRoute }
        { ActivitySummaryRoutes }
        
        <Route path='*' component={ ErrorPage } />
    </Route>
);
