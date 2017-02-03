import React from 'react';
import { browserHistory } from 'react-router';
import { ActivitiesTimeGraph, ActivitiesByRankLists, Navigation } from '../../components';
import { DISTRACTING, PRODUCTIVE } from '../../components/constants';
import './index.css'

export default function DetailedSummaryPage(props) {
        let shouldDrawProductive = false;
        let shouldDrawDistracting = false;

        if (typeof props.activityType !== 'undefined') {
            switch (props.activityType) {
                case PRODUCTIVE:
                    shouldDrawProductive = true;
                    break;

                case DISTRACTING:
                    shouldDrawDistracting = true;
                    break;

                default:
                    shouldDrawProductive = shouldDrawDistracting = true;
            }
        } else {
            shouldDrawProductive = shouldDrawDistracting = true;
        }

        return (
            <div>
                <ActivitiesTimeGraph activityType={ `${shouldDrawProductive ? PRODUCTIVE : ' '}
                    ${shouldDrawDistracting ? DISTRACTING : ' '}`}/>

                <div className="navigation" style={{transform: 'rotate(180deg)'}} onClick={browserHistory.goBack}>
                    <Navigation />
                </div>

                <div id="actsByRank">
                    { shouldDrawProductive ? <ActivitiesByRankLists activityType={ PRODUCTIVE } /> : '' }
                    { shouldDrawDistracting ? <ActivitiesByRankLists activityType={ DISTRACTING } /> : '' }
                </div>
            </div>
        );
}