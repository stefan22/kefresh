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
    return this.setState({
      loading: data ? false : true,
    });
  }

  handleItemUpdate = (obj) => {
    let objArr = [];
    // existing items
    objArr = this.state.keitems.filter((itm) => itm.itemCode !== obj.itemCode);

    return this.setState({
      keitems: [
        ...objArr,
        {...obj, qty: obj.qty + 1}
      ],
      total: ((this.state.total * 100 + obj.price * 100) / 100).toFixed(2),
    });
  };


  handleKeitems = (e, obj) => {
    e.preventDefault();

    let exist = undefined;
    exist = this.state.keitems.find(itm => itm.itemCode === obj.itemCode);

    if (exist) {
      // update if it exists
      return this.handleItemUpdate(exist);
    }

    const newObj = Object.assign({qty: 1},obj);
    return this.setState({
      keitems: [...this.state.keitems, newObj],
      total: ((this.state.total * 100 + newObj.price * 100) / 100).toFixed(2),
    });
  };


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
