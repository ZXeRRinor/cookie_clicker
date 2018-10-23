import React, {Component} from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import Clicker from "./clicker";
import Shop from "./shop";
import {SHOP_ELEMENTS, PRODUCER_LIST} from "./game.design";

const initialState = {
    userCookies: 5000,
    userProducers: {
        'Auto Clicker': 0,
        'Auto Oven': 0,
        'Cookie Farm': 0,
        'Cookie Factory': 0,
        'Cookie Reactor': 0,
        'Cookie Materialiser': 0,
        'Quantum Cookie Singularity': 0,
        'Admin Cookie Creator': 0
    },
    currentPricesOfProducers: {
        'Auto Clicker': SHOP_ELEMENTS['Auto Clicker']['price'],
        'Auto Oven': SHOP_ELEMENTS['Auto Oven']['price'],
        'Cookie Farm': SHOP_ELEMENTS['Cookie Farm']['price'],
        'Cookie Factory': SHOP_ELEMENTS['Cookie Factory']['price'],
        'Cookie Reactor': SHOP_ELEMENTS['Cookie Reactor']['price'],
        'Cookie Materialiser': SHOP_ELEMENTS['Cookie Materialiser']['price'],
        'Quantum Cookie Singularity': SHOP_ELEMENTS['Quantum Cookie Singularity']['price'],
        'Admin Cookie Creator': SHOP_ELEMENTS['Admin Cookie Creator']['price']
    }
};

function gameReducer(state = initialState, action) {
    switch (action.type) {
        case 'addUserCookie': {
            let userCookies = state.userCookies;
            userCookies += Math.floor(userCookies / 100);
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

        case 'buyProducer': {
            let new_state = state;
            let producer = action.payload;
            new_state['userCookies'] -= state['currentPricesOfProducers'][producer];
            new_state['userProducers'][producer] += 1;
            new_state['currentPricesOfProducers'][producer] *= 2;
            return (new_state);
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
        let userProducers = game_store.getState().userProducers;
        let cookies = 0;
        for (let i = 0; i < PRODUCER_LIST.length; i++) {
            cookies += userProducers[PRODUCER_LIST[i]] * SHOP_ELEMENTS[PRODUCER_LIST[i]].performance;
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