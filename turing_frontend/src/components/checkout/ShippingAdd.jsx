import React from 'react';
import {Button, Card, Form, Grid, Dropdown, CardContent, Header, Segment} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { ShippingRegion } from '../../constants';

const ShippingAddress = ( props ) => {
  const {
    handleChange,
    shippingOption,
    values,
    handleShippingOption,
    shippingValues,
    handleShippingCostValues
  } = props;

  const { firstName, lastName, address, phone, city, country } = values;
  const isInvalid =
    firstName === '' ||
    lastName === '' ||
    address === '' ||
    phone === '' ||
    city === '' ||
    country === '' ||
    shippingOption.length === 0 ||
    shippingValues.shipping_cost === 0;

  return (
    <React.Fragment>
      <div className="full-page">
        <Segment basic>
          <Header as="h3">
            Shipping Details.
          </Header>
        </Segment>
        <Card fluid>
          <CardContent>
            <Form >
              <Form.Group unstackable widths={2}>
                <Form.Input
                  label="First name"
                  placeholder="First name"
                  name="firstName"
                  onChange={handleChange}
                  value={firstName}
                  required
                />
                <Form.Input
                  label="Last name"
                  placeholder="Last name"
                  name="lastName"
                  onChange={handleChange}
                  value={lastName}
                  required
                />
              </Form.Group>
              <Form.Group widths={2}>
                <Form.Input
                  label="Address"
                  placeholder="Address"
                  name="address"
                  onChange={handleChange}
                  value={address}
                  required
                />
                <Form.Input
                  label="Phone"
                  placeholder="Phone"
                  name="phone"
                  onChange={handleChange}
                  value={phone}
                  required
                />
              </Form.Group>
              <Form.Group widths={2}>
                <Form.Input
                  label="Country"
                  placeholder="Country"
                  name="country"
                  onChange={handleChange}
                  value={country}
                  required
                />
                <Form.Input
                  label="City"
                  placeholder="City"
                  name="city"
                  onChange={handleChange}
                  city={city}
                  required
                />
              </Form.Group>
              <Form.Group widths={2}>
                <Form.Field>
                  <label>Shipping Region</label>
                  <Dropdown
                    name="shipping"
                    placeholder='Shipping Option'
                    fluid
                    selection
                    options={ShippingRegion}
                    onChange={handleShippingOption}
                    required
                  />
                </Form.Field>
                <Form.Field>
                  <label>Shipping Option</label>
                  <Dropdown
                    name="shipping-option"
                    placeholder='Shipping Option'
                    fluid
                    selection
                    options={shippingOption}
                    onChange={handleShippingCostValues}
                    required
                  />
                </Form.Field>

              </Form.Group>
            </Form>
          </CardContent>
        </Card>
      </div>
      <Grid>
        <Grid.Column textAlign="right">
          <span>Step 1 of 3</span>
          <Button
            style={{
              marginLeft: '1em',
              padding: '1em 3.7em',
            }}
            secondary
            onClick={props.handleNext}
            disabled={isInvalid}
          >
            Next
          </Button>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );

};
ShippingAddress.propTypes = {
  handleChange: PropTypes.func,
  handleNext: PropTypes.func,
  values: PropTypes.object,
  shippingOption: PropTypes.array,
  shippingValues: PropTypes.object,
  handleShippingOption: PropTypes.func,
  handleShippingCostValues: PropTypes.func
};

export default ShippingAddress;
