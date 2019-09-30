import React from 'react';
import {Header, Table, Button, Grid, Image, Icon, Segment} from 'semantic-ui-react';
import PropType from 'prop-types';
import map from 'lodash/map';

const propTypes = {
  cart: PropType.array,
  handleChange: PropType.func,
  handleBack: PropType.func,
  handleNext: PropType.func,
  shipping: PropType.string,
  id: PropType.string,
  handleRemoveFromCart: PropType.func,
  quantity: PropType.number,
  valueTotal: PropType.number
};

const ProductSummary = ({
  cart,
  handleBack,
  handleNext,
  valueTotal,
  shipping,
  handleRemoveFromCart,
  id 
}) => {
  console.log(cart, 'Cart')
  return (
    <React.Fragment>
      <div className="full-page">
        <Segment basic>
          <Header as="h3">
            Product Summary
          </Header>
        </Segment>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">Image</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Description</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Size</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Quantity</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Price</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Remove</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          { /** Product Items*/ }
          <Table.Body>
            { map(cart, (item, key) => (
              <Table.Row key={key}>
                <Table.Cell width={3}>
                  <Header as="h2" textAlign="center">
                    <Image className="pro-images" src={`${item.image}`} />
                  </Header>
                </Table.Cell>
                <Table.Cell width={6}>{item.des}</Table.Cell>
                <Table.Cell textAlign="center">
                  {item.size}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {item.quantity}
                </Table.Cell>
                <Table.Cell textAlign="center" width={2}>
                  <strong>${item.salePrice}</strong>
                </Table.Cell>
                <Table.Cell textAlign="center" width={1}>
                  <Icon onClick={()=> handleRemoveFromCart(item.id)} name="trash alternate" />
                </Table.Cell>
              </Table.Row>
            )
            )}

            {/*Shipping Cost*/}
            <Table.Row>
              <Table.Cell width={2}/>
              <Table.Cell singleLine width={5}/>
              <Table.Cell/>
              <Table.Cell/>
              <Table.Cell textAlign="right">
                <strong>Shipping</strong>
              </Table.Cell>
              <Table.Cell textAlign="center" width={2}>
                <strong>${shipping}</strong>
              </Table.Cell>
            </Table.Row>

            {/*Total cost*/}
            <Table.Row>
              <Table.Cell width={2}/>
              <Table.Cell singleLine width={5}/>
              <Table.Cell/>
              <Table.Cell/>
              <Table.Cell textAlign="right">
                <strong>Total</strong>
              </Table.Cell>
              <Table.Cell textAlign="center" width={2}>
                <strong>${valueTotal}</strong>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
      <Grid>
        <Grid.Column textAlign="right">
          <span>Step 2 of 3</span>
          <Button
            onClick={handleBack}
            style={{ marginLeft: '1em', padding: '1em 3.7em' }}
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            secondary
            style={{ padding: '1em 3.7em' }}
          >
            Next
          </Button>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
};

ProductSummary.propTypes = propTypes;

export default ProductSummary;
