import React from 'react'
import {createStore} from 'redux'
import ReactDOM from 'react-dom'
import Game from './game'


ReactDOM.render(
    <Game/>,
    document.querySelector('.game_field'),
);