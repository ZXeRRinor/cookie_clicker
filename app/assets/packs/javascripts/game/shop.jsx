import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SHOP_ELEMENTS, PRODUCER_LIST} from "./game.design";

class Shop extends Component {

    constructor(props) {
        super(props);
        this.state = SHOP_ELEMENTS;
        this.buy = this.buy.bind(this);

        // let shop_container = document.querySelector('.shop');
        // for (let i = 0; i < PRODUCER_LIST.length; i++) {
        //     let product = document.createElement('div');
        //     product.classname = PRODUCER_LIST[i];
        //     product.textContent = PRODUCER_LIST[i];
        //     shop_container.appendChild(product);
        //     shop_container.addEventListener('click', this.buy);
        // }
    }

    buy(action) {
        let producer = PRODUCER_LIST[action.target.id];
        if (this.props.store.userCookies >= SHOP_ELEMENTS[producer]['price']) {
            this.props.dispatch('buyProducer', producer);
        } else {
            console.log('You don\'t have enough money to buy this!');
        }
    }

    render() {
        return (
            <div className="shop">
                {PRODUCER_LIST.map((producer, index) =>
                    <div className="shop_element" key={index} id={index} onClick={this.buy}>{producer}</div>
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