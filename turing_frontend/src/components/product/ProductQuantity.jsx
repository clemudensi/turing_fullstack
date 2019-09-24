import React from 'react';
import {Form, Header} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const ProductQuantity = ({ handleChange, quantity }) => (
  <React.Fragment>
    <Header as="h4">
      Quantity:
      {' '}
      <span>Select Quantity</span>
    </Header>

    <Form.Input
      placeholder="Quantity"
      type="number"
      min={1}
      name="quantity"
      onChange={handleChange}
      value={parseInt(quantity)}
    />
  </React.Fragment>
);

ProductQuantity.propTypes = {
  handleChange: PropTypes.func,
  quantity: PropTypes.string
};

export default ProductQuantity;