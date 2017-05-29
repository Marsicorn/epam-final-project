import React from "react";
import {Route} from "react-router";
import ActivitySummaryPage from "./activitySummary";


export default (
	<Route>
		<Route component={ ActivitySummaryPage } path={ ActivitySummaryPage.getPath() }/>
	</Route>
);
