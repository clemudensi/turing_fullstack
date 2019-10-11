import React, {useState} from 'react';
import {
  CardElement,
  injectStripe,
  StripeProvider,
  Elements,
} from 'react-stripe-elements';
import {Button, Card, Grid, GridColumn, Header, Segment} from 'semantic-ui-react';
import {connect} from 'react-redux';
import map from 'lodash/map'
import axios from 'axios';
import {createOrder, deleteOrder} from '../../actions/order';
import {emailConfirmation, errorReport} from '../../util/emailNotification';
import { PAYMENT} from '../../constants';

// You can customize your Elements to give it the look and feel of your site.
const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: 'Open Sans, sans-serif',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#c23d4b',
      },
    }
  }
};

const errMsg = 'There was an error processing order, check payment details';

const _CardForm = (props) => {

  const {cart, shippingId, taxId, valueTotal,
    handleBack, handleReset, totalShipping, itemTotal,
    stripe, deleteOrder, orderSuccess, username
  } = props;

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = ({error}) => {
    if (error) {
      setErrorMessage(error.message);
    }
  };

  //stripe payment
  const chargeCustomer = async (id, valueTotal, orderSuccess) =>
    orderSuccess ? (
    await axios.post(`${PAYMENT}/stripe/charge`, {
        amount: parseInt(valueTotal) * 100,
        token: id
      }
    )).data.status : null;

  // create an order
  const createOrderItem = async (cart, shippingId, taxId) =>
    ( await props.createOrder(
      cart,
      shippingId,
      taxId
  ));

  //delete created order if payment fails
  const deleteOrderItem = async (orders) => {
    await props.deleteOrder(orders);
    setErrorMessage(errMsg);
  };

  //return created order Ids
  const getOrderIds = (createOrder) => (map(createOrder, ids => (ids.order_id)));

  //if transaction is successful route to confirmation page
  const confirmationPage = (cart, valueTotal, totalShipping, itemTotal) => {
    localStorage.setItem('orderItems', JSON.stringify({
      cart, valueTotal,
      totalShipping, itemTotal
    }));
    window.location.replace('/confirmation')
  };

  //send email confirmation or delete created order based or payment response
  const sendEmailConfirmation = async (chargeSuccess, createOrder) =>
    chargeSuccess === 'succeeded' ?
    (await emailConfirmation(props)) :
    await deleteOrderItem(getOrderIds(createOrder));

  // trigger confirmation page method
  const completeTransaction = () =>
    sendEmailConfirmation ? confirmationPage(cart, valueTotal, totalShipping, itemTotal) :
      setErrorMessage('There was an error processing order');

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const {
      orderSuccess: {  data: { createOrder } }
    } = props;

    //Create Stripe payment token
    const createToken = await stripe.createToken({email: username});

    if (createToken.token) {
      try {
        setLoading(true);
        const {token: { id }} = createToken;
        console.log(id);

        await createOrderItem(cart, shippingId, taxId);
        await sendEmailConfirmation(
          await chargeCustomer(id, valueTotal, orderSuccess),
          createOrder
        );
        await completeTransaction();

      } catch (err) {
        errorReport(JSON.stringify(err));
        console.log(err);
        setErrorMessage(errMsg);
        setLoading(false)
      }

    } else {
      setErrorMessage(createToken.error.message);
    }
  };

  return (
    <React.Fragment>
      <div className="full-page stripe-pay">
        <Segment basic>
          <Header as="h3">
            Pay Securely
          </Header>
        </Segment>
        <Card fluid>
          <br/>
          <Grid textAlign="center">
            <GridColumn width={14}>
              <div className="error" role="alert">
                <p className="error-msg"><strong>{errorMessage}</strong></p>
              </div>
              <div className="card-payment">
                <form onSubmit={handleSubmit}>
                  <label>
                    Card details
                    <CardElement
                      onChange={handleChange}
                      {...createOptions()}
                    />
                  </label>
                  <Button
                    style={{ marginLeft: '0.5em' }}
                    color="teal"
                    fluid
                    size="large"
                    type="submit"
                    loading={loading}
                  >Pay</Button>
                </form>
              </div>
            </GridColumn>
            <br/>

          </Grid>

        </Card>
      </div>
      <Grid>
        <Grid.Column textAlign="right">
          <span>Step 3 of 3</span>
          <Button
            onClick={handleBack}
            style={{ marginLeft: '1em', padding: '1em 3.7em' }}
          >
            Back
          </Button>
          <Button
            onClick={handleReset}
            secondary
            style={{ padding: '1em 3.7em' }}
          >
            Cancel
          </Button>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
};

const CardForm = injectStripe(_CardForm);

const StripePayment = (props) => {
  const {
    itemTotal,
    cart,
    shipping_cost,
    totalShipping,
    cartId,
    shippingId,
    taxId,
    values,
    valueTotal,
    handleBack,
    handleReset,
    createOrder,
    create_order,
    history,
    deleteOrder
  } = props;

  return (
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PK}>
      <Elements>
        <CardForm
          username={localStorage.getItem('username')}
          totalShipping={totalShipping}
          shipping_cost={shipping_cost}
          valueTotal={valueTotal}
          handleBack={handleBack}
          handleReset={handleReset}
          createOrder={createOrder}
          cartId={cartId}
          shippingId={shippingId}
          itemTotal={itemTotal}
          history={history}
          cart={cart}
          taxId={taxId}
          orderSuccess={create_order}
          deleteOrder={deleteOrder}
          values={values}
        />
      </Elements>
    </StripeProvider>
  );
};

export default connect(
  ({ create_order }) => ({ create_order }),
  { createOrder, deleteOrder },
)(StripePayment)