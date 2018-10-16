import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SHOP_ELEMENTS, MACHINE_LIST} from "./game.design";

class Shop extends Component {

    constructor(props) {
        super(props);
        this.state = SHOP_ELEMENTS;
        this.buy = this.buy.bind(this);

        // let shop_container = document.querySelector('.shop');
        // for (let i = 0; i < MACHINE_LIST.length; i++) {
        //     let product = document.createElement('div');
        //     product.classname = MACHINE_LIST[i];
        //     product.textContent = MACHINE_LIST[i];
        //     shop_container.appendChild(product);
        //     shop_container.addEventListener('click', this.buy);
        // }
    }

    buy(action) {
        console.log('buy_func');
        console.log(action.target.id);
        console.log(SHOP_ELEMENTS[MACHINE_LIST[action.target.id]])
    }

    render() {
        return (
            <div className="shop">
                {MACHINE_LIST.map((machine, index) =>
                    <div className="shop_element" key={index} id={index} onClick={this.buy}>{machine}</div>
                )}
            </div>
        );
    }
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        dispatch: (type, payload) => dispatch({type: type, payload: payload})
    })
)(Shop);