import React from 'react';
import { Link } from 'react-router-dom';
import {Popup, Item, Icon, Label} from 'semantic-ui-react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import OrderItem from '../cart/OrderItem';
import OrderBill from '../cart/OrderBill';
import 'assets/style/cart.scss';

const PopupCart = (props) => {
  let {
    cart,
    handleRemoveFromCart
  } = props;

  let valueTotal = 0;

  const itemsOrder = _.map(cart, (item,index) => {

    valueTotal += item.salePrice * item.quantity;

    return(
      <OrderItem key={item.id} {...item} handleRemoveFromCart={handleRemoveFromCart} />
    );
  });

  const conHasPro = (
    <div className='popup-cart'>

      <Item.Group id='cart-window' divided>
        {itemsOrder}
      </Item.Group>

      <OrderBill orderValue={valueTotal}/>

      <Link
        className='checkout-btn'
        to='/checkout'
      >
          CHECKOUT
      </Link>
    </div>
  );

  const conNoPro = (
    <div className={`${'up-cart' + ' ' + 'no-pro'}`}>Your shopping bag is empty!</div>
  );

  const displayPopupCart = !cart.length ? conNoPro:conHasPro;

  return(
    <Popup
      trigger={
        <Icon name="shopping cart" className="padding-right">
          { cart.length > 0
            ? <Label color='red' floating>
              {cart.length}
            </Label>
            : null
          }
        </Icon>
      }
      position='bottom center' hoverable>
      <Popup.Content>
        {displayPopupCart}
      </Popup.Content>
    </Popup>
  );
};

PopupCart.propTypes = {
  btnTool: PropTypes.element,
  cart: PropTypes.array,
  handleRemoveFromCart: PropTypes.func
};

export default PopupCart;