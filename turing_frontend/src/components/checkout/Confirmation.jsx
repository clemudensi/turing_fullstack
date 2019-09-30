import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { Card, Container, Icon, Table } from 'semantic-ui-react';

const Confirmation = () => {
  const props = JSON.parse(localStorage.getItem('orderItems'));
  if(props){
    const { cart, valueTotal, totalShipping, itemTotal } = props;
    return(
      <Container className="full-page">
        <Card.Group>
          <Card fluid className="card" >
            <br/>
            <span>
              <Icon
                name="check"
                color="pink"
                textAlign="left"
                bordered
                circular
                size="big"
              />
              <p className="confirmation-page">All set! Your purchase was successful</p>
              <div className="card">
                <Table basic='very'>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>#</Table.HeaderCell>
                      <Table.HeaderCell>Product</Table.HeaderCell>
                      <Table.HeaderCell>Quantity</Table.HeaderCell>
                      <Table.HeaderCell>Unit Price</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {
                      map(cart, (item, key) => (
                        <Table.Row key={item.reference} >
                          <Table.Cell width={2}>{key + 1}</Table.Cell>
                          <Table.Cell width={6}>{item.name}</Table.Cell>
                          <Table.Cell width={2}>{item.quantity}</Table.Cell>
                          <Table.Cell width={2}>{item.salePrice}</Table.Cell>
                        </Table.Row>
                      ))
                    }
                    <Table.Row>
                      <Table.Cell><h3>Cost Summary</h3></Table.Cell>
                      <Table.Cell/>
                      <Table.Cell/>
                      <Table.Cell/>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell/>
                      <Table.Cell/>
                      <Table.Cell><strong>Item Cost</strong></Table.Cell>
                      <Table.Cell><strong>{itemTotal}</strong></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell/>
                      <Table.Cell/>
                      <Table.Cell><strong>Shipping Cost</strong></Table.Cell>
                      <Table.Cell><strong>{totalShipping}</strong></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell/>
                      <Table.Cell/>
                      <Table.Cell><strong>Total Cost</strong></Table.Cell>
                      <Table.Cell><strong>{valueTotal}</strong></Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>

              <br/>
              <div className="align-left">
                <h3 >Payment Method: Stripe </h3>
              </div>
            </span>
            <br/>
          </Card>
        </Card.Group>
      </Container>
    );
  }
  else {
    return (
      <div className="full-page">
        <Card>
          <Card.Content>
            <h2>No order found</h2>
          </Card.Content>
        </Card>
      </div>
    );
  }
};

Confirmation.defaulProps = {
  cart: []
};

Confirmation.propTypes = {
  cart: PropTypes.array,
  valueTotal: PropTypes.number,
  totalShipping: PropTypes.number,
  itemTotal: PropTypes.number
};

export default Confirmation;