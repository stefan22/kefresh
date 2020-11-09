import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Item = (props) => {
  const { itemCode, name, price, handleKeitems } = props;

  return (
    <li key={ itemCode }>
      {name}
      <span className="product-price">£{price}</span>
      <Link
        onClick={ (e) => handleKeitems(e, props) }
        className="add-product"
        to={ `/item/${itemCode}` }
      >
        Add to the cart
      </Link>
    </li>
  );
};

export default withRouter(Item);
