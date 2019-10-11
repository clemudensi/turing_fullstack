import React, {useState } from 'react';
import {Grid, Header, Menu, Segment} from 'semantic-ui-react';
import AddProduct from '../../containers/AddProduct';

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
      <Grid stackable>
        <Grid.Column width={4} className="dashboard">
          <Segment>
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
          </Segment>
        </Grid.Column>

        <Grid.Column width={10} className="dashboard">
          <Segment>
            <AddProduct/>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default DashBoard;
