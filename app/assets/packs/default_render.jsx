// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import QuadEqu from "./javascripts/quad_equ";
import {createStore} from 'redux';
import {Provider} from 'react-redux'

function red(state = [], action) {
    if (action.type == 'kek') {
        return ([
            ...state,
            action.payload
        ]);
    }
}

const store = createStore(red, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
    <Provider store={store}>
        <QuadEqu/>
    </Provider>,
    document.body.appendChild(document.createElement('div')),
);
