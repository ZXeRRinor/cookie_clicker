import React, {Component} from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import Clicker from "./clicker";
import Shop from "./shop";
import {SHOP_ELEMENTS, MACHINE_LIST} from "./game.design";

const initialState = {
    userCookies: 0,
    machines: {
        'Auto Clicker': 0,
        'Auto Oven': 0,
        'Cookie Farm': 0,
        'Cookie Factory': 0,
        'Cookie Reactor': 0,
        'Cookie Materialiser': 0,
        'Quantum Cookie Singularity': 0,
        'Admin Cookie Creator': 0
    }
};

function gameReducer(state = initialState, action) {
    switch (action.type) {
        case 'addUserCookie': {
            let userCookies = state.userCookies;
            userCookies++;
            return ({
                ...state, userCookies: userCookies
            });
        }

        case 'addUserCookies': {
            let userCookies = state.userCookies;
            userCookies += action.payload;
            return ({
                ...state, userCookies: userCookies
            });
        }
    }
}

const game_store = createStore(gameReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

class Game extends Component {

    constructor(props) {
        super(props);
        game_store.dispatch({type: 'addUserCookie'});
        this.state = {timer: setInterval(this.cookieIncrement, 1000)};
    }

    cookieIncrement() {
        let machines = game_store.getState().machines;
        let cookies = 0;
        for (let i = 0; i < MACHINE_LIST.length; i++) {
            cookies += machines[MACHINE_LIST[i]] * SHOP_ELEMENTS[MACHINE_LIST[i]].performance;
        }
        game_store.dispatch({type: 'addUserCookies', payload: cookies});
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    render() {
        return (
            <div>
                <Provider store={game_store}>
                    <Clicker/>
                </Provider>
                <Provider store={game_store}>
                    <Shop/>
                </Provider>
            </div>
        );
    }
}

export default Game;