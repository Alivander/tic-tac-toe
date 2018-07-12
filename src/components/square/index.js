import React from 'react';
import b_ from 'b_';
import './index.css';

const b = b_.with('square');

function Square(props) {
    return (
        <button
            className={props.win ? b({ winner: true }) : b()}
            onClick={props.onClick}
            >
            {props.value}
        </button>
    );
}

export default Square;
