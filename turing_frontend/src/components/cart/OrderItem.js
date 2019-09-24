import React from 'react';
import {Container, Icon, Item} from 'semantic-ui-react';
import PropType from 'prop-types';

const propTypes = {
  id: PropType.number,
  name: PropType.string,
  salePrice: PropType.number,
  image: PropType.string,
  color: PropType.string,
  size: PropType.string,
  quantity: PropType.number,
  handleRemoveFromCart: PropType.func
};

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

OrderItem.propTypes = propTypes;

export default OrderItem;