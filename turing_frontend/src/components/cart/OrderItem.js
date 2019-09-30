import React from 'react';
import {Container, Icon, Item} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const OrderItem = (props) => {
  const {
    id,
    name,
    salePrice,
    image,
    color,
    size,
    quantity,
    handleRemoveFromCart
  } = props;

  return(
    <Item>
      <Item.Image src={image} />
      <Item.Content className='item-content'>
        <Item.Header as='h3'>{name}</Item.Header>
        <Container textAlign='right'><Icon onClick={()=> handleRemoveFromCart(id)} name="close" /></Container>
        <Item.Header as='h4'>${salePrice}</Item.Header>
        <Item.Meta>
          <span>Quantity: {quantity}</span>
          <span>Color: {color}</span>
          <span>Size: {size}</span>
          <span>Total: ${(quantity*salePrice).toFixed(2)}</span>
        </Item.Meta>
      </Item.Content>
    </Item>
  );
};

OrderItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  salePrice: PropTypes.number,
  image: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  quantity: PropTypes.string,
  handleRemoveFromCart: PropTypes.func
};

export default OrderItem;