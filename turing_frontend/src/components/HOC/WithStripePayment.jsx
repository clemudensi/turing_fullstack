import React from 'react';

const withStripePayment = (StripeComponent) => {
  return class WithStripePayment extends React.Component {

    render() {
      const { user_id, total, order_id, shipping_cost, cost, handleBack, handleReset} = this.props;
      return (
        <StripeComponent
          user_id={user_id}
          total={total}
          order_id={order_id}
          shipping_cost={shipping_cost}
          cost={cost}
          handleBack={handleBack}
          handleReset={handleReset}
        />
      );
    }
  };
};

export default withStripePayment;