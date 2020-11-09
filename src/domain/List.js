import React, { Component } from 'react';

/**
  Reusable List Component
  It takes a component as its first argument and a list as the second arg.
*/

class List extends Component {
  render() {
    const { items, item: Item, handleKeitems } = this.props;

    return (
      <>
        {items.map((itm, idx) => (
          <Item key={ idx } { ...itm } handleKeitems={ handleKeitems } />
        ))}
      </>
    );
  }
}

export default List;
