import React from 'react';
import { Tooltip } from 'recharts';

export default function ChartTooltip() {
    return (
        <Tooltip
            itemStyle={{
                backgroundColor: 'transparent',
                color: 'gray',
                fontWeight: 'normal'
            }}
            wrapperStyle={{
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: '#e5e5e5',
                border: 'none'
            }}
            labelStyle={{
                paddingBottom: '10px',
                color: 'gray',
                fontWeight: 'bold'
            }}
            formatter={(val) => {
                return Math.abs(val) + 'm';
            }}
        />
    )
}