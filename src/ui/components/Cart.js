import React from 'react';

const Cart = (props) => {
  const { itemCode, name, qty } = props;
  return (
    <li key={ itemCode }>
      {name} <span
        className='product-count'>{qty}</span>
    </li>
  );
};

export default Cart;
