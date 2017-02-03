import React from 'react';
import { browserHistory } from 'react-router';
import { bindAll } from 'lodash';
import ProductivityLevels from '../../utils/productivityLevels';
import { OUTER_CHART_RADIUS, INNER_CHART_RADIUS, SCALE_PARAM } from './constants';
import { PRODUCTIVE_SUM, DISTRACTING_SUM } from '../../pages/paths';


class Slice extends React.Component {
    constructor(props) {
        super(props);

        this._sliceLabel = document.getElementById(props.sliceLabel);
        this._centerX = 0;
        this._centerY = 0;

        bindAll(this, [
            'enlargeSlice',
            'recoverNormalSize',
            'getSliceDefinition',
            'onHover',
            'setTooltipText'
        ]);
    }

    onHover() {
        this.setTooltipText();
        this.enlargeSlice();
    }

    enlargeSlice() {
        this.setState({scale: SCALE_PARAM});
    }

    setTooltipText() {
        if (!this._sliceLabel) this._sliceLabel = document.getElementById(this.props.sliceLabel);
        this._sliceLabel.textContent
            =  `${this.props.time} ${this.props.type.replace('_', ' ')} (${this.props.percentage}%)`;
    }

    recoverNormalSize() {
        this._sliceLabel.textContent = '';
        this.setState({scale: 1});
    }

    getSliceDefinition() {
        let startAngle = this.props.startAngle || 0,
            endAngle = this.props.endAngle || 0;

        let largeArcFlag;
        if ((endAngle - startAngle) === 360) {
            endAngle -= 0.01;
            largeArcFlag = "1";
        } else largeArcFlag = (endAngle - startAngle) <= 180 ? "0" : "1";

        let scale;
        try {
            scale = this.state.scale;
        } catch (error) {
            scale = 1;
        }

        let outerLine = {
            start: polarToCartesian(this._centerX, this._centerY, OUTER_CHART_RADIUS*scale, startAngle),
            end: polarToCartesian(this._centerX, this._centerY, OUTER_CHART_RADIUS*scale, endAngle)
        };

        let innerLine = {
            start: polarToCartesian(this._centerX, this._centerY, INNER_CHART_RADIUS, endAngle),
            end: polarToCartesian(this._centerX, this._centerY, INNER_CHART_RADIUS, startAngle)
        };


        return [
            "M", outerLine.start.x, outerLine.start.y,
            "A", OUTER_CHART_RADIUS*scale, OUTER_CHART_RADIUS*scale, 0,
                    largeArcFlag, 1, outerLine.end.x, outerLine.end.y,
            "L", innerLine.start.x, innerLine.start.y,
            "A", INNER_CHART_RADIUS, INNER_CHART_RADIUS, 0, largeArcFlag, 0, innerLine.end.x, innerLine.end.y
        ].join(" ");
    }

    render() {
        return <path
            onMouseEnter={this.onHover}
            onMouseLeave={this.recoverNormalSize}
            onClick={() => {
                browserHistory.push(
                    ProductivityLevels.getLevelKey(this.props.type) < 0 ?
                        DISTRACTING_SUM : PRODUCTIVE_SUM )
            }}
            className={"slice_" + this.props.type}
            fill={ProductivityLevels.getLevelColor({name: this.props.type})}
            d={ this.getSliceDefinition()}/>;
    }
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    let angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: Number.parseInt(centerX, 10) + (radius * Math.cos(angleInRadians)),
        y: Number.parseInt(centerY, 10) + (radius * Math.sin(angleInRadians))
    };
}


export default Slice;

