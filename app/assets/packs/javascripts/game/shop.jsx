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
        let producer = PRODUCER_LIST[parseInt(action.target.id)];
        if (this.props.store.userCookies >= this.props.store['currentPricesOfProducers'][producer]) {
            this.props.dispatch('buyProducer', producer);
        } else {
            console.log('You don\'t have enough money to buy this!');
        }
    }

    render() {
        return (
            <div className="shop">
                <div className="user_balance">
                    Your balance: {this.props.store.userCookies}
                </div>
                <div className="producer_list">
                    {PRODUCER_LIST.map((producer, index) =>
                        <div className="shop_element" key={index} id={index + '_producer'} onClick={this.buy}>
                            {producer} - Production: {SHOP_ELEMENTS[producer]['performance']} -
                            Price: {this.props.store.currentPricesOfProducers[producer]} -
                            Current Amount: {this.props.store.userProducers[producer]}
                        </div>
                    )}
                </div>
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