import React, {Component} from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import Clicker from "./clicker";
import Shop from "./shop";
import {SHOP_ELEMENTS, PRODUCER_LIST} from "./game.design";
import LeaderBoard from "./leaderboard";

const initialState = {
    userCookies: 0,
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
            userCookies += userCookies <= 100 ? 1 : Math.floor(userCookies / 100);
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
        case 'setData': {
            let new_state = state;
            new_state = {
                ...state,
                userCookies: action.payload['userCookies'],
                userProducers: action.payload['userProducers'],
                currentPricesOfProducers: action.payload['currentPricesOfProducers']
            };
            return (new_state);
        }
    }
}

const game_store = createStore(gameReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

class Game extends Component {

    constructor(props) {
        super(props);
        game_store.dispatch({type: 'addUserCookie'});
        this.state = {
            incrementTimer: setInterval(this.cookieIncrement, 1000),
            saveTimer: setInterval(this.saveResults, 6000)
        };
        this.getResults();
        this.saveResults = this.saveResults.bind(this);
    }

    saveResults() {
        console.log('saving');
        let userProducers = game_store.getState().userProducers;
        let currentPricesOfProducers = game_store.getState().currentPricesOfProducers;
        let userCookies = game_store.getState().userCookies;
        let authenticity_token = document.querySelector('.data').childNodes[3].content;
        $.post('/game/save_results', {
            data: {
                user_cookies: userCookies,
                user_producers: userProducers,
                current_prices_of_producers: currentPricesOfProducers
            }, authenticity_token: authenticity_token
        });
    }

    getResults() {
        $.get('/game/get_results', {}, (data, status, y) => {
            console.log(data);
            game_store.dispatch({type: 'setData', payload: data});
        });
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
        clearInterval(this.state.incrementTimer);
        clearInterval(this.state.saveTimer);
    }

    render() {
        return (
            <div className='container-fluid'>
                <div className='main_container row'>
                    <Provider store={game_store}>
                        <Clicker/>
                    </Provider>
                    <Provider store={game_store}>
                        <Shop/>
                    </Provider>
                    <Provider store={game_store}>
                        <LeaderBoard/>
                    </Provider>
                    <button onClick={this.saveResults} className='btn btn-outline-success' type="button"
                            data-container="body" data-toggle="popover" data-placement="top"
                            data-content="Save your game results on server">
                        Save Results
                    </button>
                </div>
            </div>
        );
    }
}

export default Game;