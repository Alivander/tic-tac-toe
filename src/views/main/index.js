import React from 'react';
import b_ from 'b_';
import Game from '../../components/game';
import './index.css';

const b = b_.with('main');

function Main() {
    return (
        <div className={b()}>
            <header className={b('header')}>
                <h1 className={b('title')}>Tic-Tac-Toe</h1>
            </header>
            <p className={b('welcom')}>
                Welcom to Game! :)
            </p>
            <Game />
        </div>
    );
}

export default Main;
