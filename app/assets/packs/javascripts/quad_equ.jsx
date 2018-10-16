import React, {Component} from 'react';
import {connect} from 'react-redux'

class QuadEqu extends Component {
    constructor(props) {
        super(props);
        this.state = {a: "", b: "", c: ""};
        this.getResult = this.getResult.bind(this);
        this.change = this.change.bind(this);
    }

    //kek() {
    //    console.log("kek!");
    //}

    //componentDidMount() {
    //    let timer = setInterval(this.kek, 1000);
    //}

    getResult(event) {
        event.preventDefault();
        let a = parseInt(this.state.a);
        let b = parseInt(this.state.b);
        let c = parseInt(this.state.c);
        if (a !== 0) {
            let discriminant = b * b - 4 * a * c;
            if (discriminant >= 0) {
                let x1 = ((-b + Math.sqrt(discriminant)) / (2 * a)).toString();
                let x2 = ((-b - Math.sqrt(discriminant)) / (2 * a)).toString();
                if (discriminant === 0) {
                    alert("Results is " + x1 + " " + x2);
                } else {
                    alert("Result is " + x1);
                }
            } else {
                console.log("Нет корней!")
            }
        } else {
            let x = -c / b;
            console.log("Notice! It's not a quadratic equation!");
            alert("Result is " + x);
        }
    }

    change(event) {
        if (event.target.id === "a_in") {
            this.setState({a: event.target.value});
        }
        if (event.target.id === "b_in") {
            this.setState({b: event.target.value});
        }
        if (event.target.id === "c_in") {
            this.setState({c: event.target.value});
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.getResult}>
                    <input
                        id="a_in"
                        type="text"
                        placeholder="a is"
                        value={this.state.a}
                        onChange={this.change}
                    /><br/>
                    <input
                        id="b_in"
                        type="text"
                        placeholder="b is"
                        value={this.state.b}
                        onChange={this.change}
                    /><br/>
                    <input
                        id="c_in"
                        type="text"
                        placeholder="c is"
                        value={this.state.c}
                        onChange={this.change}
                    /><br/>
                    <button>Get Result!</button>
                </form>
            </div>
        )
    }
}

export default connect(
    state => ({store: state}),
    dispatch => ({
        dispatch: (type, payload) => dispatch({type: type, payload: payload})
    })
)(QuadEqu);