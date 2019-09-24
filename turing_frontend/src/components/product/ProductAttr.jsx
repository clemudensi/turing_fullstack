// eslint-disable-next-line snakeCase
import React from 'react';
import {Form, Input} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {showInvalidInputError} from '../../util/formValidation';

const ProductAttr = ({
  price,
  discount,
  handleChange, 
  errors,
  state,
  handleBlur
}) => (
  <Form>
    <Form.Field
      name="price"
      id='form-input-control-price'
      control={Input}
      label='Price'
      placeholder='Price'
      value={price}
      onChange={handleChange}
      error={showInvalidInputError(
        'price',
        errors,
        state
      )}
      onBlur={handleBlur('price')}
      required
    />
    <Form.Field
      name="discount"
      id='form-input-control-discount'
      control={Input}
      label='Discount'
      placeholder='Discount'
      value={discount}
      onChange={handleChange}
      error={showInvalidInputError(
        'discount',
        errors,
        state
      )}
      onBlur={handleBlur('discount')}
      required
    />
  </Form>
);

ProductAttr.propTypes = {
  price: PropTypes.string,
  discount: PropTypes.string,
  handleChange: PropTypes.func,
  errors: PropTypes.object,
  state: PropTypes.object,
  handleBlur: PropTypes.func,
};

export default ProductAttr;
