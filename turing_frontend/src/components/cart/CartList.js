import React from 'react';
import { Header, Table, Rating } from 'semantic-ui-react';

const CartList = () => (
  <Table celled padded>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell singleLine>Item</Table.HeaderCell>
        <Table.HeaderCell>Description</Table.HeaderCell>
        <Table.HeaderCell>Size</Table.HeaderCell>
        <Table.HeaderCell>Quantity</Table.HeaderCell>
        <Table.HeaderCell>Price</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell width={3}>
          <Header as='h2' textAlign='center'>
            A
          </Header>
        </Table.Cell>
        <Table.Cell singleLine width={4}>Power Output</Table.Cell>
        <Table.Cell>
          <Rating icon='star' defaultRating={3} maxRating={3} />
        </Table.Cell>
        <Table.Cell textAlign='right' >
          80% <br />
          <a href='#'>18 studies</a>
        </Table.Cell>
        <Table.Cell width={2}>
          Creatine supplementation .
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell width={2}>
          <Header as='h2' textAlign='center'>
            A
          </Header>
        </Table.Cell>
        <Table.Cell singleLine width={5}>Weight</Table.Cell>
        <Table.Cell>
          <Rating icon='star' defaultRating={4} maxRating={4} />
        </Table.Cell>
        <Table.Cell textAlign='right'>
          100% <br />
          <a href='#'>65 studies</a>
        </Table.Cell>
        <Table.Cell width={2}>
          Creatine is the reference
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export default CartList;
