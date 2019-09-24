import React, {useState } from 'react';
import {Card, CardContent, Container, Grid, Header, Menu, Segment} from 'semantic-ui-react';
import AddProduct from '../product/AddProduct';

const DashBoard = () => {
  const [activeItem, setActiveItem] = useState('new');

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <div className="full-page">
      <Segment basic>
        <Header as="h3">
          Add Product
        </Header>
      </Segment>
      <Segment>
        <Grid>
          <Grid.Column width={4}>
            <Menu fluid vertical tabular>
              <Menu.Item name='new' active={activeItem === 'new'} onClick={handleItemClick} />
              <Menu.Item name='purchases' active={activeItem === 'purchases'} onClick={handleItemClick} />
              <Menu.Item
                name='shipped-items'
                active={activeItem === 'shipped-items'}
                onClick={handleItemClick}
              />
              <Menu.Item
                name='inventory'
                active={activeItem === 'inventory'}
                onClick={handleItemClick}
              />
            </Menu>
          </Grid.Column>

          <Grid.Column stretched width={12}>
            <Container>
              <AddProduct/>
            </Container>
          </Grid.Column>
        </Grid>
      </Segment>
    </div>
  );
}

export default DashBoard;
