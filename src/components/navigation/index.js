import React from 'react';

export default function Navigation() {
    return (
        <svg width="50px" height="50px">
            <line
                strokeLinecap="round"
                x1="5" y1="5" x2="45" y2="25"
                stroke="lightgray"
                strokeWidth="10"
            />
            <line
                strokeLinecap="round"
                x1="45" y1="25" x2="5" y2="45"
                stroke="lightgray"
                strokeWidth="10"
            />
        </svg>
    );
}