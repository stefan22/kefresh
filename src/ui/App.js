import React, { Component } from 'react';
import List from '../domain/List';
import Item from './components/Item';
import Cart from './components/Cart';
import data from '../domain/data';
import loadingBall from '../images/ball.gif';
import '../styles/main.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      // items array
      keitems: [],
      total: 0,
    };
  }

  componentDidMount() {
    // can be removed at anytime
    this.timeout = setTimeout(() => {
      return this.setState({
        loading: data ? false : true,
      });
    }, 850);
  }

  handleItemUpdate = (obj) => {
    let objArr = [];
    // existing items
    objArr = this.state.keitems.filter((itm) => itm.itemCode !== obj.itemCode);
    obj.qty = obj.qty + 1;
    return this.setState({
      keitems: objArr.concat(obj),
      total: ((this.state.total * 100 + obj.price * 100) / 100).toFixed(2),
    });
  };

  handleKeTotal = (total, cv) => {
    total = this.state.total;
    return total + cv.price;
  };

  handleKeitems = (e, obj) => {
    e.preventDefault();
    let newObj = Object.assign({},
      obj);
    let id = newObj.itemCode;
    let exist = undefined;

    exist = this.state.keitems.find((itm) => itm.itemCode === id);
    if (exist) {
      // update if it exists
      return this.handleItemUpdate(exist);
    }
    newObj.qty = 1;
    return this.setState({
      keitems: [...this.state.keitems, newObj],
      total: ((this.state.total * 100 + newObj.price * 100) / 100).toFixed(2),
    });
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { loading, keitems, total } = this.state;

    return (
      <div className={ `${loading ? 'app is-loading' : 'app'}` }>
        <h1 className="keroboto2">Kelisto</h1>
        <div className="wrapper">

          {loading ? (
            <div className='keloading'>
              <img src={ loadingBall } alt="loading" width="256" height="256" />
            </div>
          ) : (
            <div className="row">
              <div className="column">
                <div className="kefresh-column keroboto">
                  <h2>List of Products</h2>
                  <div className="products-list">
                    <ul>
                      <List
                        handleKeitems={ this.handleKeitems }
                        item={ Item }
                        items={ data }
                      />
                    </ul>
                  </div>
                </div>
              </div>

              <div className="column">
                <div
                  className={ `${keitems.length > 0
                    ? 'kecheckout-column'
                    : 'kecheckout-column keroboto'
                  }` }
                >
                  <div className="product-checkout mb-3">
                    <ul className={ `${keitems.length > 0 ? 'brdr-btm' : ''}` }>
                      <List item={ Cart } items={ keitems } />
                    </ul>
                  </div>

                  <div
                    className={ `${keitems.length > 0
                      ? 'product-checkout-total mb-3'
                      : 'product-checkout-total kenoshow'
                    }` }
                  >
                    <h4>Total </h4>
                    <span className="product-checkout-sum">£{total}</span>
                  </div>

                  <div
                    className={ `${keitems.length > 0
                      ? 'product-checkout-total mb-3'
                      : 'product-checkout-total kenoshow'
                    }` }
                  >
                    <button
                      type="button"
                      className="product-checkout-button keroboto3"
                    >
                      Checkout now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
