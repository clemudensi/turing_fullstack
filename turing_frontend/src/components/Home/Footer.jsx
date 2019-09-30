import React, { Fragment } from 'react';
import {
  Container, Grid, Header, List, Segment,
} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';

const Footer = () => (
  <Fragment>
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="About" />
              <List link inverted>
                <List.Item as="ul">Sitemap</List.Item>
                <List.Item as="ul"><NavLink to="/contact">Contact</NavLink></List.Item>
                <List.Item as="ul"><NavLink to="/about">About</NavLink></List.Item>
                <List.Item as="ul">FAQ</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Products" />
              <List link inverted>
                <List.Item as="ul"><NavLink to={'/regional/italian?page=1'}>Italian</NavLink></List.Item>
                <List.Item as="ul"><NavLink to={'/regional/french?page=1'}>French</NavLink></List.Item>
                <List.Item as="ul"><NavLink to={'/regional/irish?page=1'}>Irish</NavLink></List.Item>
                <List.Item as="ul"><NavLink to={'/natural/animal?page=1'}>Animal</NavLink></List.Item>
                <List.Item as="ul"><NavLink to={'/natural/flower?page=1'}>Flower</NavLink></List.Item>
                <List.Item as="ul"><NavLink to={'/seasonal/christmas?page=1'}>Christmas</NavLink></List.Item>
                <List.Item as="ul"><NavLink to={'/seasonal/valentine?page=1'}>Valentine</NavLink></List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as="h4" inverted>
                  Footer Header
              </Header>
              <p>
                Extra space for a call to action inside the footer that could help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </Fragment>
);

export default Footer;
