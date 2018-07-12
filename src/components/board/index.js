import React, { Component } from 'react';
import b_ from 'b_';
import Square from '../square';
import './index.css';

const b = b_.with('board');

class Board extends Component {
    renderSquares() {
        const squares = this.props.squares.reduce((arr, value, i) => {
            const square = (
                <Square
                    key={i}
                    value={value}
                    win={this.props.win && this.props.win.some(n => n === i)}
                    onClick={() => this.props.onClick(i)}
                />
            );
            arr.push(square);

            return arr;
        }, []);

        return squares;
    }

    render() {
        return (
            <div className={b()}>
                {this.renderSquares()}
            </div>
        );
    }
}

export default Board;
