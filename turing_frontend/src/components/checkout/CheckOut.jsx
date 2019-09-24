import React, { useState, useMemo } from 'react';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import ShippingAddress from './ShippingAdd';
import StripePayment from './StripePayment';
import ProductSummary from './ProductSumarry';
import { ShippingOption, ShippingValues } from '../../constants';

const CheckOut = (props) => {
  const { cart, handleChange, handleRemoveFromCart,
    values, cartId, history } = props;

  const [ state, ] = useState({
    formStep: 0,
    quantity: 1,
    shippingOption: [],
    shippingValues: {
      shipping_cost: 0,
      tax_cost: 0
    }
  });

  const { quantity } = state;

  const [formStep, setFormStep] = useState(0);
  const [shippingOption, setShippingOption] = useState([]);
  const [shippingValues, setShippingValues] = useState({
    shipping_cost: 0,
    tax_cost: 0
  });

  // method for the next form page
  const handleNext = (event) => {
    event.preventDefault();
    setFormStep(formStep + 1);
  };

  // method to go back to the previous form page
  const handleBack = (event) => {
    event.preventDefault();
    setFormStep(formStep - 1);
  };

  // method to go to the first page of the form
  const handleReset = () => {
    setFormStep(0);
  };

  //Selects shipping options
  const handleShippingOption = (e, { value}) => {
    // this.setState({ [name]: value });
    const shippingOption = ShippingOption.filter(options => options.code === value);
    setShippingOption(shippingOption );
  };

  const handleShippingCostValues = (e, {value}) => {
    setShippingValues(ShippingValues[value]);
  };

  const { shipping_cost, tax_cost, shipping_id, tax_id } = shippingValues;

  //calculation for total-cost, shipping cost with taxes
  let valueTotal = 0;
  let itemTotal  = 0;
  let totalShipping = 0;
  map(cart, (item) => {
    itemTotal += item.salePrice * item.quantity;
    valueTotal = itemTotal + shipping_cost + ((itemTotal * tax_cost)/100);
    totalShipping = shipping_cost + ((itemTotal * tax_cost)/100);
    valueTotal = valueTotal.toFixed(2);
  });

  switch (formStep) {
  case 0:
    return (
      <Container >
        <ShippingAddress
          handleNext={handleNext}
          handleChange={handleChange}
          values={values}
          handleShippingOption={handleShippingOption}
          shippingOption={shippingOption}
          shippingValues={shippingValues}
          handleShippingCostValues={handleShippingCostValues}
        />
      </Container>
    );
  case 1:
    return (
      <Container >
        <ProductSummary
          handleNext={handleNext}
          handleBack={handleBack}
          handleChange={handleChange}
          quantity={quantity}
          cart={cart}
          shipping={totalShipping.toFixed(2)}
          valueTotal={valueTotal}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      </Container>
    );
  case 2:
    return (
      <Container>
        <StripePayment
          handleBack={handleBack}
          handleReset={handleReset}
          handleChange={handleChange}
          valueTotal={valueTotal}
          cartId={cartId}
          cart={cart}
          values={values}
          shippingId={shipping_id}
          history={history}
          taxId={tax_id}
          itemTotal={itemTotal.toFixed(2)}
          totalShipping={totalShipping.toFixed(2)}
        />
      </Container>
    );
  }
};

CheckOut.propTypes = {
  cart: PropTypes.array,
  handleChange: PropTypes.func,
  handleRemoveFromCart: PropTypes.func,
  values: PropTypes.object,
  cartId: PropTypes.string,
  history: PropTypes.func
};

export default CheckOut;
