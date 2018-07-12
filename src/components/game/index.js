import React, { Component } from 'react';
import b_ from 'b_';
import Board from '../board';
import getWinner from '../../util/getWinner';
import './index.css';

const b = b_.with('game');
const btn = b_.with('button');

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (getWinner(squares) || squares[i]) return;
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{ squares }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    renderMoves() {
        return this.state.history
            .slice(0, this.state.stepNumber + 1)
            .map((step, move) => {
                const desc = move ? `Go to move #${move}` : 'Go to game start';

                return (
                    <li key={move}>
                        <button
                            className={btn()}
                            type='button'
                            onClick={() => this.jumpTo(move)}
                            >
                            {desc}
                        </button>
                    </li>
                );
            });
    }

    render() {
        const current = this.state.history[this.state.stepNumber];
        const win = getWinner(current.squares);
        let status;

        if (win) {
            status = `Winner: ${win.winner}`;
        } else if (current.squares.some(squres => !squres)) {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        } else {
            status = 'The game ended in a draw';
        }

        return (
            <div className={b()}>
                <Board
                    squares={current.squares}
                    win={win && win.combination}
                    onClick={i => this.handleClick(i)}
                    />
                <div className={b('info')}>
                    <p className={b('status')}>{status}</p>
                    <ul className={b('moves')}>{this.renderMoves()}</ul>
                </div>
            </div>
        );
    }
}

export default Game;
