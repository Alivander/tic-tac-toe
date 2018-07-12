import React, { Component } from 'react';
import b_ from 'b_';
import Board from '../board';
import getWinner from '../../util/getWinner';

const b = b_.with('game');

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
        const winner = getWinner(current.squares);
        let status;

        if (winner) {
            status = `Winner: ${winner}`;
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        return (
            <div className={b()}>
                <Board
                    squares={current.squares}
                    onClick={i => this.handleClick(i)}
                    />
                <div>{status}</div>
                <ol>{this.renderMoves()}</ol>
            </div>
        );
    }
}

export default Game;
